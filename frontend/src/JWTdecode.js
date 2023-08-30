import jwt_decode from "jwt-decode";
 
export const token = localStorage.getItem('token');
export const decodedToken = token && jwt_decode(token);