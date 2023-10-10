import React from 'react';
import {useAuth} from "../../context/AuthProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRouter = ({children}) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user === null) {
    return <Navigate to="/login" state={{from: location.pathname}} replace />
  }

  return children;
};

export default PrivateRouter;