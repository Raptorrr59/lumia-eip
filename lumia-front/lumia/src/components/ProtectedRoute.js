import React from 'react';
import AuthRequired from './AuthRequired';

const ProtectedRoute = ({ children, requireVerification = false, requireAdmin = false }) => {
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('accessToken');
  const emailVerified = localStorage.getItem('emailVerified');

  // Vérifier si l'utilisateur est connecté
  if (!userId || !accessToken) {
    return <AuthRequired type="login" />;
  }

  // Vérifier si l'email est vérifié (si requis)
  if (requireVerification && emailVerified !== 'true') {
    return <AuthRequired type="verification" />;
  }

  // Vérifier si l'utilisateur est administrateur (si requis)
  if (requireAdmin) {
    try {
      const roles = JSON.parse(localStorage.getItem("roles"));
      const isAdmin = roles.some(role => role.name === "ADMIN");
      
      if (!isAdmin) {
        console.log("Role de la personne disant etre admin :", localStorage.getItem("roles"));
        return <AuthRequired type="admin" />;
      }
    } catch (error) {
      console.error("Error parsing roles:", error);
      return <AuthRequired type="admin" />;
    }
  }

  // Si tout est OK, afficher le contenu
  return children;
};

export default ProtectedRoute;