import { Contract, ContractEventName } from 'ethers'
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import {culendarAbi} from '../abis/Culendar.abi'

async function querryCreateEvent() {
    let culandar = new Contract("", culendarAbi);
    const filter = culandar.filters.CreatedEvent()
    return await queryFilterBatched(0, 0, culandar, filter)

}

async function querryConfirmEvent() {
    let culandar = new Contract("", culendarAbi);
    const filter = culandar.filters.Confirmed()
    return await queryFilterBatched(0, 0, culandar, filter)

}

async function querryDeclined() {
    let culandar = new Contract("", culendarAbi);
    const filter = culandar.filters.Declined()
    return await queryFilterBatched(0, 0, culandar, filter)

}

async function querryJoinedWaitlist() {
    let culandar = new Contract("", culendarAbi);
    const filter = culandar.filters.JoinedWaitlist()
    return await queryFilterBatched(0, 0, culandar, filter)

}
async function queryFilterBatched(fromBlock: number, toBlock: number, contract: Contract, filter: ContractEventName) {
    const batchSize = 10000
    let batchedEvents: any[] = []
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
    keypair : any,
    peers : any, // liste von peers aus der registry geladen
    events : any [],
) {
    const loadedPeers = peers?.map((p: { shieldedAddress: any; }) => p.shieldedAddress || p) ?? []
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


