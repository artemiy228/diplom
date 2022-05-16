import React, { useEffect } from "react";
import { __BROWSER__ } from "../../constants/env";
import { useAuth } from "../../context/AuthContext";

export const Auth: React.FC = ({ children }) => {
  const { isLoading, check } = useAuth();

  useEffect(check, []) 

  if (isLoading) {
    return <div>Загрузка сессии</div>;
  }

  return <>{children}</>
};
