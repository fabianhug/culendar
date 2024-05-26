# Culendar

**Culendar** is a decentralized and encrypted event management platform, inspired by lu.ma. With Culendar, you can create events, invite participants, and manage all event details securely.

## Key Features

- **Encrypted Event Management**: All event details are encrypted, ensuring that only authorized participants can access them.
- **Privacy-Focused**: Only the event creator can see the list of attendees. Attendees cannot see information about other participants.
- **Secure Invitations**: Invite participants securely, ensuring that only those intended can access event details.
- **Decentralized**: Built on decentralized principles, ensuring robustness and resilience.

## Getting Started

To start using Culendar, follow these steps:

1. **Create an Event**: Set up your event with all necessary details.
2. **Invite Participants**: Send secure invitations to your intended attendees via a message on-chain.
3. **Manage Your Event**: Keep track of attendees and event specifics through an easy-to-use interface.

## Utilities

Culendar provides several utility functions to interact with the smart contract and manage event-related data. Here are the key utility functions:

### `queryCreateEvent(from, to)`

Queries events that have been created within a specified block range.

### `queryConfirmEvent(from, to)`

Queries events that have been confirmed within a specified block range.

### `queryDeclined(from, to)`

Queries events that have been declined within a specified block range.

### `queryJoinedWaitlist(from, to)`

Queries events where participants have joined the waitlist within a specified block range.

### `queryFilterBatched(fromBlock, toBlock, contract, filter)`

Helper function to batch query filters to avoid hitting block limits.

### `loadPeers()`

Placeholder function to load all peers from the registry. This needs to be implemented.

### `findJoinedWaitlist(keypair, peers, events)`

Finds and decrypts events that participants have joined using the waitlist. This function uses the `xchacha20poly1305` cipher for encryption/decryption.

## Usage

### Build Frontend

```shell
cd frontend/culendar
npm install
npm run build
```

### Build Forge

```shell
forge build
```

### Test

```shell
forge test
```

### Deploy

```shell
forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
cast <subcommand>
```

### Help

```shell
forge --help
anvil --help
cast --help
```
