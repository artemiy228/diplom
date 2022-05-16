import { useSession } from "next-auth/react";
import React from "react";
import { __BROWSER__ } from "../../constants/env";

export const Auth: React.FC = ({ children }) => {
  const { data: session } = useSession({ required: true });

  if (session?.user) {
    return <>{children}</>;
  }
  return <div>Загрузка сессии</div>;
};
