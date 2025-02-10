import {http,createConfig} from "wagmi";
import {mainnet,sepolia,base} from "wagmi/chains";
import {injected,safe,metaMask} from 'wagmi/connectors';

export const config = createConfig({
    chains : [mainnet,sepolia,base],
    connectors : [
        injected(),
        metaMask(),
        safe(),
    ],
    transports : {
        [mainnet.id] : http(),
        [sepolia.id] : http(),
        [base.id] : http(),
    },
})