// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VaultXTreasuryLedger {
    address public owner;

    struct AllocationRecord {
        string category;
        uint256 amount;
        string referenceURI;
        bytes32 referenceHash;
        uint256 createdAt;
        bool active;
    }

    AllocationRecord[] public allocationRecords;

    event AllocationRecordCreated(
        uint256 indexed recordId,
        string category,
        uint256 amount,
        bytes32 referenceHash
    );
    event AllocationRecordStatusUpdated(
        uint256 indexed recordId,
        bool active
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "TreasuryLedger: caller is not owner");
        _;
    }

    modifier validCategory(string calldata _category) {
        require(bytes(_category).length > 0, "TreasuryLedger: category cannot be empty");
        _;
    }

    modifier validAmount(uint256 _amount) {
        require(_amount > 0, "TreasuryLedger: amount must be greater than 0");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "TreasuryLedger: new owner is zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function createAllocationRecord(
        string calldata _category,
        uint256 _amount,
        string calldata _referenceURI,
        bytes32 _referenceHash
    ) external onlyOwner validCategory(_category) validAmount(_amount) {
        allocationRecords.push(AllocationRecord({
            category: _category,
            amount: _amount,
            referenceURI: _referenceURI,
            referenceHash: _referenceHash,
            createdAt: block.timestamp,
            active: true
        }));
        uint256 recordId = allocationRecords.length - 1;
        emit AllocationRecordCreated(recordId, _category, _amount, _referenceHash);
    }

    function updateAllocationStatus(
        uint256 _recordId,
        bool _active
    ) external onlyOwner {
        require(_recordId < allocationRecords.length, "TreasuryLedger: record does not exist");
        allocationRecords[_recordId].active = _active;
        emit AllocationRecordStatusUpdated(_recordId, _active);
    }

    function getAllocationRecord(
        uint256 _recordId
    ) external view returns (AllocationRecord memory) {
        require(_recordId < allocationRecords.length, "TreasuryLedger: record does not exist");
        return allocationRecords[_recordId];
    }

    function getAllocationRecordCount() external view returns (uint256) {
        return allocationRecords.length;
    }
}
