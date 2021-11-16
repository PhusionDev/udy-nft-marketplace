// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // mapping from token id to the owner
    mapping(uint256 => address) private _tokenOwner;

    // mapping from owner to number of owned tokens
    mapping(address => uint256) private _ownedTokensCount;

    function _mint(address to, uint256 tokenId) internal {
        // requires that the address isn't zero
        require(to != address(0), 'ERC721: minting to the zero address');
        // requires that the token does not already exist
        require(!_exists(tokenId), 'ERC721: token already minted');
        // we are adding a new address with a token id for minting
        _tokenOwner[tokenId] = to;
        // keeping track of each address that is minting and adding 1 to count
        _ownedTokensCount[to]++;

        emit Transfer(address(0), to, tokenId);
    }

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    /// @param _owner An address for whom to query the balance
    /// @return The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) external view returns(uint256) {
        require(_owner != address(0), 'owner query for nonexistent token');
        return _ownedTokensCount[_owner];
    }

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address) {
        return _tokenOwner[_tokenId];
    }

    function _exists(uint256 tokenId) internal view returns(bool) {
        // setting the address of nft owner to check the mapping
        // of the address from tokenOwner at the tokenId
        address owner = _tokenOwner[tokenId];
        // returns truthiness the address is not zero
        return owner != address(0);
    }
}