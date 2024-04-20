import { React, useEffect, useState } from "react";

import { createWeb3AuthSigner } from "../web3auth";

import {
  alchemyGasManagerMiddleware,
  createAlchemyPublicRpcClient,
} from "@alchemy/aa-alchemy";
import { createSmartAccountClient, polygonAmoy } from "@alchemy/aa-core";
import {
  createLightAccount,
  lightAccountClientActions,
} from "@alchemy/aa-accounts";
import { http } from "viem";
import "./LoginCard.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/actions/authActions";

const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const gasManagerPolicyId = import.meta.env.VITE_ALCHEMY_GAS_MANAGER_POLICY_ID;
const rpcUrl = `https://polygon-amoy.g.alchemy.com/v2/${apiKey}`;
const rpcTransport = http(rpcUrl);
const chain = polygonAmoy;

const LoginCard = () => {
  const [starting, setStarting] = useState(false);
  const [provider, setProvider] = useState();
  const [web3AuthSigner, setWeb3authsigner] = useState();
  const [address, setAddress] = useState();
  const [scaAddress, setScaAddress] = useState();
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState();
  // const [dispatchh, setDispatch] = useState();
  const dispatch = useDispatch();

  const handleClick = () => {
    startProvider();
  };

  const logout = async () => {
    try {
      setAddress(null);
      setScaAddress(null);
      setDetails(null);
      setWeb3authsigner(null);
      setUserData(null);

      if (web3AuthSigner) {
        web3AuthSigner.inner.logout();
      }
    } catch (e) {
      console.log("Could not logout");
      console.log(e);
    }
  };

  const startProvider = async () => {
    setStarting(true);
    try {
      let address;
      let web3authsigner;
      if (!web3AuthSigner) {
        web3authsigner = await createWeb3AuthSigner();
        setWeb3authsigner(web3authsigner);
        address = await web3authsigner.getAddress();
      } else {
        web3authsigner = web3AuthSigner;
      }
      const details = await web3authsigner.getAuthDetails();
      console.log("details", details);
      console.log("address", address);
      setDetails(details);

      let provider;
      let scaAddress;
      if (!provider) {
        if (!provider) {
          const alchemyClient = createAlchemyPublicRpcClient({
            chain,
            connectionConfig: {
              rpcUrl,
            },
          });
          provider = await createSmartAccountClient({
            transport: rpcTransport,
            apiKey,
            chain,
            signer: web3AuthSigner,
            ...alchemyGasManagerMiddleware(alchemyClient, {
              policyId: gasManagerPolicyId,
            }),
            account: await createLightAccount({
              transport: rpcTransport,
              chain,
              signer: web3authsigner,
            }),
          }).extend(lightAccountClientActions);
        }
        console.log("Log data that will be send to redux");
        console.log(address);
        // console.log(scaAddress);
        // console.log(details);
        dispatch(setUserData({ address }));
        // dispatch(setUserData({ address, scaAddress, details }));

        console.log("End logging data that will be send to redux");

        setProvider(provider);
        console.log("provider");
        console.log(provider);
        scaAddress = await provider.getAddress();
        console.log("scaAddress", scaAddress);
        setAddress(address);
        setScaAddress(scaAddress);
      }
    } catch (e) {
      console.log("Could not start provider");
      console.log(e);
    }
    visible && onClose();
    setStarting(false);
  };

  return (
    <>
      {address ? (
        <div className="" onClick={logout}>
          <h2>LOGOUT</h2>
          {starting && <p>Starting...</p>}
          {address && <p>Signer addres: {address}</p>}
          {scaAddress && <p>SCA addres: {scaAddress}</p>}
          {details?.name && <p>Name: {details.name}</p>}
          {details?.email && <p>Email: {details.email}</p>}
        </div>
      ) : (
        <div className="" onClick={handleClick}>
          <h2>REGISTER</h2>
          {/* {starting && <p>Starting...</p>}
          {address && <p>Signer addres: {address}</p>}
          {scaAddress && <p>SCA addres: {scaAddress}</p>}
          {details?.name && <p>Name: {details.name}</p>}
          {details?.email && <p>Email: {details.email}</p>} */}
        </div>
      )}
    </>
  );
};

export default LoginCard;
