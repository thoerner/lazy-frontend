import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig, useAccount, useSignMessage } from 'wagmi'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { mainnet, sepolia } from 'wagmi/chains'
import { ALCHEMY_API_KEY } from './constants'

const { VITE_ENV } = import.meta.env
const chains = VITE_ENV === 'dev' ? [sepolia] : [mainnet]
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

const { publicClient } = configureChains(chains, [alchemyProvider({ apiKey: ALCHEMY_API_KEY })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export {
    ethereumClient,
    WagmiConfig,
    wagmiConfig,
    projectId,
    useAccount,
    useSignMessage,
}