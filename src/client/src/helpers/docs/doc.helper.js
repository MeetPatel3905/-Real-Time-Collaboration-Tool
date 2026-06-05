export const createDocument = async (title, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export const getAllDocuments = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { documents: data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500, documents: [] };
  }
};

export const getDocument = async (docId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/documents/${docId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export const deleteDocument = async (docId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/documents/${docId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export const addCollaborator = async (docId, collaboratorEmail, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/documents/add-collaborator/${docId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ collaboratorEmail })
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};
