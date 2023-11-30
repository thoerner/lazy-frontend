import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  useSignMessage,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { mainnet } from "viem/chains";

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const alchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY;

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: alchemyKey }),
    walletConnectProvider({ projectId }),
    publicProvider(),
  ]
);

const metadata = {
  name: "Lazy Butts",
  description: "Lazy Butts",
  url: "https://butts.the3dkings.io",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
});

export {
  WagmiConfig,
  wagmiConfig,
  projectId,
  useAccount,
  useSignMessage,
  chains,
};
