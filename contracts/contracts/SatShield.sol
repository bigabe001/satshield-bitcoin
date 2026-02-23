// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SatShield {
    mapping(address => uint256) public depositTime;
    mapping(address => uint256) public amounts;

    event Shielded(address indexed user, uint256 amount, uint256 time);

    // This function will be called by your UI
    function shieldSats() public payable {
        require(msg.value > 0, "Must send some sats");
        amounts[msg.sender] += msg.value;
        depositTime[msg.sender] = block.timestamp;
        emit Shielded(msg.sender, msg.value, block.timestamp);
    }

    // This powers the "Leaderboard" or Vibe Score
    function getVibeScore(address user) public view returns (uint256) {
        if (amounts[user] == 0) return 0;
        return (block.timestamp - depositTime[user]);
    }
}