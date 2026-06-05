export const setLocalStorageWithExpiry = (key, value, expiryInMinutes = 60) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryInMinutes * 60 * 1000
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorageWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    
    if (response.status === 200) {
      setLocalStorageWithExpiry('auth', { user: data.user, token: data.token });
    }

    return { ...data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};
