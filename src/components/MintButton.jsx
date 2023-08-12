import toast from 'react-hot-toast'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import LazyButtsAbi from '../contracts/LazyButts.js'

const BUTTS_CONTRACT_ADDRESS = import.meta.env.VITE_ENV === 'dev' ? import.meta.env.VITE_BUTTS_CONTRACT_ADDRESS_TEST : import.meta.env.VITE_BUTTS_CONTRACT_ADDRESS

const MintButton = ({ selectedLions, address }) => {
    const handleClaimButtClick = async (selectedLions, address, config) => {
        if (selectedLions.length < 1) {
            toast.error('Please select at least one Lazy Lion.')
            return
        }
        const buttIds = selectedLions.map(lion => lion.id)
        console.log('buttIds', buttIds)
        write?.()
    }
    const params = {
        address: BUTTS_CONTRACT_ADDRESS,
        abi: LazyButtsAbi,
        functionName: 'mintManyButts',
        args: [selectedLions.map(lion => lion.id)],
        value: BigInt(selectedLions.length * 0.02 * 10 ** 18),
    }
    console.log('params', params)
    const { config } = usePrepareContractWrite(params)
    const { write } = useContractWrite(config)

    return (
        <button onClick={() => handleClaimButtClick(selectedLions, address, config)}>
            {selectedLions.length > 1 ? 'Claim Butts' : selectedLions.length > 0 ? 'Claim Butt' : 'Claim Butt'}
        </button>
    )
}

export default MintButton