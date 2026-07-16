// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VaultXDocumentAnchor {
    address public owner;

    struct DocumentRecord {
        string assetId;
        string documentType;
        string metadataURI;
        bytes32 documentHash;
        uint256 createdAt;
        bool active;
    }

    mapping(bytes32 => DocumentRecord) public documents;
    mapping(bytes32 => bool) public documentExists;

    event DocumentAnchored(
        string indexed assetId,
        string documentType,
        bytes32 indexed documentHash,
        string metadataURI
    );
    event DocumentDeactivated(
        string indexed assetId,
        string documentType,
        bytes32 indexed documentHash
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "DocumentAnchor: caller is not owner");
        _;
    }

    modifier notEmpty(string calldata _value) {
        require(bytes(_value).length > 0, "DocumentAnchor: value cannot be empty");
        _;
    }

    modifier validHash(bytes32 _hash) {
        require(_hash != bytes32(0), "DocumentAnchor: hash cannot be zero");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "DocumentAnchor: new owner is zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function anchorDocument(
        string calldata _assetId,
        string calldata _documentType,
        string calldata _metadataURI,
        bytes32 _documentHash
    ) external onlyOwner notEmpty(_assetId) notEmpty(_documentType) notEmpty(_metadataURI) validHash(_documentHash) {
        bytes32 documentKey = keccak256(abi.encodePacked(_assetId, _documentType, _documentHash));
        require(!documentExists[documentKey], "DocumentAnchor: duplicate document key");

        documents[documentKey] = DocumentRecord({
            assetId: _assetId,
            documentType: _documentType,
            metadataURI: _metadataURI,
            documentHash: _documentHash,
            createdAt: block.timestamp,
            active: true
        });
        documentExists[documentKey] = true;

        emit DocumentAnchored(_assetId, _documentType, _documentHash, _metadataURI);
    }

    function deactivateDocument(
        string calldata _assetId,
        string calldata _documentType,
        bytes32 _documentHash
    ) external onlyOwner validHash(_documentHash) {
        bytes32 documentKey = keccak256(abi.encodePacked(_assetId, _documentType, _documentHash));
        require(documentExists[documentKey], "DocumentAnchor: document does not exist");
        require(documents[documentKey].active, "DocumentAnchor: already inactive");

        documents[documentKey].active = false;
        emit DocumentDeactivated(_assetId, _documentType, _documentHash);
    }

    function getDocument(
        string calldata _assetId,
        string calldata _documentType,
        bytes32 _documentHash
    ) external view returns (DocumentRecord memory) {
        bytes32 documentKey = keccak256(abi.encodePacked(_assetId, _documentType, _documentHash));
        require(documentExists[documentKey], "DocumentAnchor: document does not exist");
        return documents[documentKey];
    }
}
