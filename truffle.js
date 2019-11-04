const HDWalletProvider = require('truffle-hdwallet-provider-klaytn')
const NETWORK_ID = '1001'
const GASLIMIT = '20000000'
const URL = 'https://api.baobab.klaytn.net:8651'
const PRIVATE_KEY = //omitted
module.exports = {
    networks: {
        klaytn: {
            host: 'https://api.baobab.klaytn.net',
            port: '8651',
            from: PRIVATE_KEY,
            network_id: NETWORK_ID,
            gas: GASLIMIT,
            gasPrice: null,
        },
        testnet: {
            provider: ()=> new HDWalletProvider(PRIVATE_KEY, URL),
            network_id: NETWORK_ID,
            gas: GASLIMIT,
            gasPrice: null,
        },
        mainnet: {
            provider: () => new HDWalletProvider(PRIVATE_KEY, "https://api.cypress.klaytn.net:8651"),
            network_id: '8217', //Klaytn mainnet's network id
            gas: GASLIMIT,
            gasPrice: null
        }
    },
}