import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { getDocument, addCollaborator } from '../../helpers/docs/doc.helper.js';
import { useSupplier } from '../../context/supplierContext';
import { toast } from 'react-toastify';
import Editor from './Editor';
import io from 'socket.io-client';

const EditDocument = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { darkMode } = useSupplier();
  const [document, setDocument] = useState(null);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [socket, setSocket] = useState(null);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    fetchDocument();
  }, [id, auth]);

  useEffect(() => {
    if (document) {
      const newSocket = io(import.meta.env.VITE_APP_SOCKET_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });

      newSocket.on('connect', () => {
        newSocket.emit('get-doc', { docId: document._id });
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [document]);

  const fetchDocument = async () => {
    if (auth?.token && id) {
      const result = await getDocument(id, auth.token);
      if (result.status === 200) {
        setDocument(result);
        setCollaborators(result.collaborators || []);
      } else {
        toast(result.message, { type: 'error' });
      }
    }
  };

  const handleAddCollaborator = async (e) => {
    e.preventDefault();
    if (!collaboratorEmail.trim()) {
      toast('Please enter an email', { type: 'error' });
      return;
    }

    const result = await addCollaborator(document._id, collaboratorEmail, auth.token);
    if (result.status === 200) {
      toast(result.message, { type: 'success' });
      setCollaboratorEmail('');
      fetchDocument();
    } else {
      toast(result.message, { type: 'error' });
    }
  };

  if (!document) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  return (
    <div className={`container-fluid py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ minHeight: '90vh' }}>
      <div className="row mb-3">
        <div className="col">
          <h1>{document.title}</h1>
          <p>Owner: {document.owner?.username}</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-8">
          <div className="form-group">
            <form onSubmit={handleAddCollaborator} className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Add collaborator email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Collaborator
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          <h5>Collaborators ({collaborators.length})</h5>
          <ul className="list-group">
            {collaborators.map((collab) => (
              <li key={collab._id} className="list-group-item">
                {collab.username} ({collab.email})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Editor document={document} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default EditDocument;
