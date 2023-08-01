import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { goerli, mainnet } from 'wagmi/chains'

const chains = [goerli]
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
const alchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY

const { publicClient } = configureChains(chains, [alchemyProvider({ apiKey: alchemyKey })])
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
}