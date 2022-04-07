import { NextPage } from "next";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthPage: NextPage = () => {
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  useEffect(() => {
    getProviders().then((providers) =>
      setProviders(Object.values(providers as object))
    );
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="px-12 py-4 flex flex-col space-y-4 items-center rounded-lg">
        {providers.map((provider) => (
          <button
            onClick={() =>
              signIn(provider.id, { callbackUrl: `${window.location.origin}` })
            }
            className="flex rounded-md text-lg font-medium bg-gray-500 text-white py-3 px-20 items-center space-x-2"
          >
            Продолжить с {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuthPage;
