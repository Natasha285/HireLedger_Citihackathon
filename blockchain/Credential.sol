// blockchain/Credential.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CredentialLedger
 * @dev Stores and verifies the cryptographic hash of academic credentials on-chain.
 */
contract CredentialLedger {
    // Maps a unique credential ID (e.g., a DB ID converted to uint256) to its hash.
    mapping(uint256 => bytes32) private credentialHashes;
    
    // The wallet address authorized to issue credentials (e.g., your Admin backend's wallet).
    address public immutable authorizedIssuer;
    
    // Event emitted when a new credential is issued for logging/indexing
    event CredentialIssued(
        uint256 indexed credentialId, 
        bytes32 indexed dataHash, 
        address indexed issuer
    );
    
    /**
     * @dev Constructor sets the single address allowed to call the issue function.
     * @param _issuer The wallet address of the authorized issuing authority.
     */
    constructor(address _issuer) {
        authorizedIssuer = _issuer;
    }

    /**
     * @dev Issues a new credential by storing its hash. Can only be called by the authorized issuer.
     * @param _credentialId A unique identifier for the credential (e.g., the MongoDB ID converted).
     * @param _dataHash The cryptographic hash (e.g., SHA256) of the credential's metadata/document.
     */
    function issueCredential(uint256 _credentialId, bytes32 _dataHash) public {
        require(msg.sender == authorizedIssuer, "Issuer not authorized.");
        require(credentialHashes[_credentialId] == 0, "Credential ID already exists.");

        credentialHashes[_credentialId] = _dataHash;
        
        emit CredentialIssued(_credentialId, _dataHash, msg.sender);
    }

    /**
     * @dev Publicly verifies a credential by returning the stored hash.
     * @param _credentialId The unique identifier of the credential.
     * @return The bytes32 hash of the credential data stored on-chain.
     */
    function verifyCredential(uint256 _credentialId) public view returns (bytes32) {
        return credentialHashes[_credentialId];
    }
}