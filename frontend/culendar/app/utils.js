import { Contract, ContractEventName } from 'ethers'
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import {culendarAbi} from '../abis/Culendar.abi'



const registryContractAddress = "0x29ec685519c79a318355e2f95928bca2d993907a";
const culendarContractAddress = "0xf542959206c268d090f3fc559706917467aa9ef6";
å

async function querryCreateEvent(from, to) {
    let culandar = new Contract(culendarContractAddress, culendarAbi);
    const filter = culandar.filters.CreatedEvent()
    return await queryFilterBatched(from, to, culandar, filter)

}

async function querryConfirmEvent(from, to) {
    let culandar = new Contract(culendarContractAddress, culendarAbi);
    const filter = culandar.filters.Confirmed()
    return await queryFilterBatched(from, to, culandar, filter)

}

async function querryDeclined(from, to ) {
    let culandar = new Contract(culendarContractAddress, culendarAbi);
    const filter = culandar.filters.Declined()
    return await queryFilterBatched(from, to, culandar, filter)

}

async function querryJoinedWaitlist(from, to) {
    let culandar = new Contract(culendarContractAddress, culendarAbi);
    const filter = culandar.filters.JoinedWaitlist()
    return await queryFilterBatched(from, to, culandar, filter)

}
async function queryFilterBatched(fromBlock, toBlock, contract, filter) {
    const batchSize = 10000
    let batchedEvents =  []
    let i = fromBlock
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const events = await contract.queryFilter(filter, i, i + batchSize)
        batchedEvents = [...batchedEvents, ...events]
        i += batchSize
        if (i >= toBlock) {
            break
        }
    }
    return batchedEvents
}

//Lade alle peers aus der registry
async function loadPeers() {
// TODO
}

async function findJoinedWaitlist(
    keypair ,
    peers , // liste von peers aus der registry geladen
    events ,
) {
    const loadedPeers = peers?.map(p => p.shieldedAddress || p) ?? []
    peers = peers ? peers.concat(loadedPeers) : loadedPeers
    const cipherInstance = xchacha20poly1305(keypair.pubKey, 0);

    const encryptedEvents = await Promise.all(
        events.map(async event => {
            let encryptedEvent
            try {

                //FIXME
                //Pseudo um um event zu decrypten, fehlt noch keypair und muss mit for loop mit allen peers geopened werden
                const result = cipherInstance.decrypt( 
                    keypair,
                    peers, // 
                    event.args.encryptedOutput,
                )
                encryptedEvent = result // FIXME
            } catch (_) { } // eslint-disable-line no-empty
        })
    )
    return encryptedEvents
}


