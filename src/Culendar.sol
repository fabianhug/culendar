// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.20;

contract Culendar {
    mapping(bytes32 => PublicEvent) public events;
    bytes32[] public eventIds;

    event CreatedEvent(PublicEvent publicEvent, bytes32 eventId, address organizer);
    event Invited(bytes32 eventId, bytes invitation);
    event Confirmed(bytes32 eventId, bytes confirmation);
    event Declined(bytes32 eventId, bytes confirmation);
    event JoinedWaitlist(bytes32 eventId, bytes confirmation);

    struct PublicEvent {
        string title;
        string ipfsImageLink;
        string description;
        string date;
        uint8 capacity;
        address organizer;
        uint256 waitlistCount;
    }

    function createEventAndInvite(
        bytes32 eventId,
        PublicEvent memory publicEvent,
        bytes[] memory invitations
    ) external {
        createEvent(publicEvent, eventId);

        for (uint256 i = 0; i < invitations.length; i++) {
            emit Invited(eventId, invitations[i]);
        }
    }

    function createEvent(PublicEvent memory publicEvent, bytes32 eventId) public {
        require(events[eventId].organizer == address(0), "Event already exists");
        events[eventId] = publicEvent;
        events[eventId].organizer = msg.sender;
        eventIds.push(eventId);
        emit CreatedEvent(publicEvent, eventId, msg.sender);
    }

    function confirm(bytes32 eventId, bytes memory confirmation) external {
        require(events[eventId].organizer != address(0), "No such event");
        emit Confirmed(eventId, confirmation);
    }

    function decline(bytes32 eventId, bytes memory reason) external {
        require(events[eventId].organizer != address(0), "No such event");
        emit Declined(eventId, reason);
    }

    function joinWaitlist(bytes32 eventId, bytes memory waitlistMsg) external {
        require(events[eventId].organizer != address(0), "No such event");
        events[eventId].waitlistCount += 1;
        emit JoinedWaitlist(eventId, waitlistMsg);
    }

    function getEventIds() external view returns (bytes32[] memory) {
        return eventIds;
    }
}
