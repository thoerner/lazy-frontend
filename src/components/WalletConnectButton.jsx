import { useWeb3Modal } from '@web3modal/react'
import { shortAddress } from '../utils/tools.js'

const WalletConnectButton = ({address, isConnected}) => {
    const { open, close } = useWeb3Modal()
    return (
        <button id="walletButton" onClick={() => open()}>{isConnected ? shortAddress(address) : 'Connect Wallet'}</button>
    )
}

export default WalletConnectButton