// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.20;

contract Culendar {
    mapping(bytes32 => bool) public events;

    event CreatedEvent(
        PublicEvent publicEvent,
        bytes32 eventId,
        address organizer
    );
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
    }

    function createEventAndInvite(
        bytes32 eventId,
        PublicEvent memory publicEvent,
        bytes[] memory invitations
    ) external {
        createEvent(publicEvent, eventId);

        for (uint256 i = 0; i > invitations.length; i++) {
            emit Invited(eventId, invitations[i]);
        }
    }

    function createEvent(
        PublicEvent memory publicEvent,
        bytes32 eventId
    ) public {
        require(events[eventId] == false, "event already exists");
        emit CreatedEvent(publicEvent, eventId, msg.sender);
    }

    function confirm(bytes32 eventId, bytes memory confirmation) external {
        require(events[eventId] == true, "no such event");
        emit Confirmed(eventId, confirmation);
    }

    function decline(bytes32 eventId, bytes memory reason) external {
        require(events[eventId] == true, "no such event");
        emit Declined(eventId, reason);
    }

    function joinWaitlist(bytes32 eventId, bytes memory waitlistMsg) external {
        require(events[eventId] == true, "no such event");
        emit JoinedWaitlist(eventId, waitlistMsg);
    }
}
