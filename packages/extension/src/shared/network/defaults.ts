import { Network } from "./type"

const integrationNetwork: Network = {
  id: "integration",
  name: "Integration",
  chainId: "SN_GOERLI",
  baseUrl: "https://external.integration.starknet.io",
  accountClassHash: {
    argentAccount:
      "0x1a7820094feaf82d53f53f214b81292d717e7bb9a92bb2488092cd306f3993f",
  },
  multicallAddress:
    "0x02acfa68f063b35ffd9e6a6b77ba0d7ad231d1a64f9fa8c5770e0be376e17ef9",
}

export const defaultNetworks: Network[] = [
  {
    id: "mainnet-alpha",
    name: "Mainnet",
    chainId: "SN_MAIN",
    baseUrl: "https://alpha-mainnet.starknet.io",
    explorerUrl: "https://voyager.online",
    accountClassHash: {
      argentAccount:
        "0x3e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328",
    },
    multicallAddress:
      "0x0740a7a14618bb7e4688d10059bc42104d22c315bb647130630c77d3b6d3ee50",
    readonly: true,
  },
  {
    id: "goerli-alpha",
    name: "Testnet",
    chainId: "SN_GOERLI",
    baseUrl: "https://alpha4.starknet.io",
    explorerUrl: "https://goerli.voyager.online",
    accountClassHash: {
      argentAccount:
        "0x1a7820094feaf82d53f53f214b81292d717e7bb9a92bb2488092cd306f3993f",
      argentPluginAccount:
        "0xebe4b44d154bc07eacad202ee19757cdc73e7d4c672bc20d9031450c6db3ad",
    },
    multicallAddress:
      "0x042a12c5a641619a6c58e623d5735273cdfb0e13df72c4bacb4e188892034bd6",
    readonly: true,
  },
  ...(process.env.NODE_ENV === "development" ? [integrationNetwork] : []),
  {
    id: "localhost",
    chainId: "SN_GOERLI",
    baseUrl: "http://localhost:5050",
    name: "Localhost 5050",
  },
]

export const defaultNetwork = defaultNetworks[1]
