import {http,createConfig} from "wagmi";
import {mainnet,sepolia,base,hardhat} from "wagmi/chains";
import {injected,safe,metaMask} from 'wagmi/connectors';

export const config = createConfig({
    chains : [mainnet,sepolia,hardhat],
    connectors : [
        injected(),
        metaMask(),
        safe(),
    ],
    transports : {
        [mainnet.id] : http(),
        [sepolia.id] : http(),
        [base.id] : http(),
        [hardhat.id] : http("http://127.0.0.1:8545"),
    },
})