// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Inbox {

    string public message;

    constructor(string memory initalMessage) {
        message = initalMessage;
    }

    function setMessage(string calldata newMessage) public {
        message = newMessage;
    }

}
