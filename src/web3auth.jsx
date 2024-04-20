import { Web3AuthSigner } from "@alchemy/aa-signers/web3auth";

export const createWeb3AuthSigner = async () => {
  const web3AuthSigner = new Web3AuthSigner({
    clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID,
    chainConfig: {
      chainNamespace: "eip155",
    },
    web3AuthNetwork: "sapphire_devnet",
    uiConfig: {
      appName: "Staker",
      appUrl: "https://staker-three-olive.vercel.app",
      mode: "auto", // light, dark or auto
      theme: {
        primary: "#db2777",
      },
      logoLight: "",
      logoDark: "",
      defaultLanguage: "en",
      loginGridCol: 3,
      primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
    },
  });

  await web3AuthSigner.authenticate({
    init: async () => {
      await web3AuthSigner.inner.initModal();
    },
    connect: async () => {
      await web3AuthSigner.inner.connect();
    },
  });

  return web3AuthSigner;
};
