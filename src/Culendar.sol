// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.19;

contract Culendar {
     mapping(bytes32 => bool) public events;

    event Created(bytes32 eventId);
    event Invited(bytes32 eventId, bytes invitation);
    event Confirmed(bytes32 eventId, bytes confirmation);
    event Declined(bytes32 eventId, bytes confirmation);

    function createAndInvite(
        bytes32 eventId,
         bytes[] memory invitations) external {
        require(events[eventId] == false, "event already exists");

        emit Created(eventId);

        for (uint256 i = 0; i > invitations.length; i++) {
            emit Invited(eventId, invitations[i]);
        }
    }

    function confirm(bytes32 eventId, bytes memory confirmation) external {
        require(events[eventId] == true, "no such event");
        emit Confirmed(eventId, confirmation);
    }

    function decline(bytes32 eventId, bytes memory reason) external {
        require(events[eventId] == true, "no such event");
        emit Declined(eventId, reason);
    }
}
