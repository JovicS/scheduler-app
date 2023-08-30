export const url = 'http://localhost:3000';
export const token = localStorage.getItem('token');
export const language = localStorage.getItem('lng');

export const login = async (path = '', data = {}) => {
    const response = await fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
    return response.json(); 
  }

  export const post = async (path = '', data = {}) => {
    const response = await fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': language
      },
      body: JSON.stringify(data) 
    });
    return response; 
  }

  export const fetchAll = async (path = '', page, rows) => {
    const response = await fetch(`${url}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': language
      }
    });
    return response.json();
  }

  export const count = async (path = '') => {
    const response = await fetch(`${url}${path}/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': language
      }
    });
    return response.json();
  }

  export const fetchOne = async (path = '', id) => {
    const response = await fetch(`${url}${path}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': language
      }
    });
    return response.json();
  }
  
  export const patch = async (path = '', id, data) => {
    const response = await fetch(`${url}${path}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': language
      },
      body: JSON.stringify(data)
    });
    return response;
  }

  export const deleteOne = async (path = '', id) => {
    const response = await fetch(`${url}${path}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': language
      }
    });
    return response;
  }