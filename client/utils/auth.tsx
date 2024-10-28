// Auth utility functions

// Save the token to localStorage
export const setAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };
  
  // Retrieve the token from localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Remove the token from localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };
  
  // Check if the user is authenticated
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };