import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { getAllDocuments, createDocument, deleteDocument } from '../../helpers/docs/doc.helper.js';
import { useSupplier } from '../../context/supplierContext';
import { toast } from 'react-toastify';

const DocumentHome = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { darkMode } = useSupplier();
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, [auth]);

  const fetchDocuments = async () => {
    if (auth?.token) {
      const result = await getAllDocuments(auth.token);
      if (result.status === 200) {
        setDocuments(result.documents);
      }
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast('Please enter a document title', { type: 'error' });
      return;
    }

    setLoading(true);
    const result = await createDocument(title, auth.token).finally(() => setLoading(false));

    if (result.status === 201) {
      toast(result.message, { type: 'success' });
      setTitle('');
      fetchDocuments();
    } else {
      toast(result.message, { type: 'error' });
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const result = await deleteDocument(docId, auth.token);
      if (result.status === 200) {
        toast(result.message, { type: 'success' });
        fetchDocuments();
      } else {
        toast(result.message, { type: 'error' });
      }
    }
  };

  const handleEditDocument = (docId) => {
    navigate(`/edit/${docId}`);
  };

  return (
    <div className={`container py-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ minHeight: '90vh' }}>
      <h1 className="mb-4">My Documents</h1>

      <form onSubmit={handleCreateDocument} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Document'}
          </button>
        </div>
      </form>

      <div className="row">
        {documents && documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc._id} className="col-md-6 col-lg-4 mb-3">
              <div className={`card ${darkMode ? 'bg-secondary text-light' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">{doc.title}</h5>
                  <p className="card-text text-muted">Created by: {doc.owner?.username}</p>
                  <p className="card-text text-muted">Collaborators: {doc.collaborators?.length}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleEditDocument(doc._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteDocument(doc._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="alert alert-info">No documents found. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default DocumentHome;
