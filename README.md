# Staker

> An app to deploy and manage vesting and staking smart contracts without seeing the blockchain technology fuzz

## Installation

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Production deployment

Automatically done with Vercel to [https://staker-three-olive.vercel.app](https://staker-three-olive.vercel.app)

## .env file structure
VITE_ALCHEMY_API_KEY=''
VITE_RPC_URL=''
VITE_ALCHEMY_GAS_MANAGER_POLICY_ID=''
VITE_WEB3AUTH_CLIENT_ID=''

## Smooth login
We have a very smooth login using Web3Auth to generate a wallet (EOA) in the background that will serve as a signer for an smart contract account (SCA) that will allow the user to not worry about signing transactions and other blockchain interactions. 

### Web3Auth
The main code involving Web3Auth is in the script `web3auth.jsx` and in the `uiConfig` attribute can be changed the UI parameters for the modal.

The Web3Auth signer has a bunch of parameters that we can use for showing in the profile button. This is an example: 
```javascript
{
    "appState": "",
    "email": "asdf@gmail.com",
    "aggregateVerifier": "web3auth-google-sapphire-devnet",
    "name": "Peter Manni",
    "profileImage": "https://lh3.googleusercontent.com/a/asdva.....s96-c",
    "typeOfLogin": "google",
    "verifier": "web3auth",
    "verifierId": "asdf@gmail.com",
    "dappShare": "",
    "oAuthIdToken": "",
    "oAuthAccessToken": "",
    "isMfaEnabled": false,
    "idToken": "ey..."
}
```

### Alchemy AA-SDK
We are using an Alchemy Light Account smart contract to simplify thing since at least for the moment we don't need any fancy plugins or functionalities, and change in it later on is quite fast. Also it is already open source :)

The login part of Alchemy is in the component `LoginCard` which has to be added only once in the header. For now is in `App.jsx`