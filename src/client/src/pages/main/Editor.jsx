import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = ({ document, socket }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Start typing...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
          ]
        }
      });

      quillRef.current.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user' && socket) {
          socket.emit('send-changes', {
            roomId: document._id,
            delta: delta,
            username: 'current-user'
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('load-document', (data) => {
        if (quillRef.current) {
          quillRef.current.setContents(data);
        }
      });

      socket.on('receive-changes', (data) => {
        if (quillRef.current) {
          quillRef.current.updateContents(data.delta);
        }
      });

      return () => {
        socket.off('load-document');
        socket.off('receive-changes');
      };
    }
  }, [socket]);

  return (
    <div style={{ height: '500px' }}>
      <div ref={editorRef} style={{ height: '100%' }} />
    </div>
  );
};

export default Editor;
