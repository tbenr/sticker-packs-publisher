// using the infura.io node, otherwise IPFS requires you to run a
// daemon on your own computer/server.

import IPFS from 'ipfs-api'
import contentHash from 'content-hash'

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

// run with local daemon
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});



export { ipfs }