// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is IERC721Enumerable, ERC721 {
    uint256[] private _allTokens;

    // mapping from tokenId to position in _allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;

    // mapping of owner to list of all owner token ids
    mapping(address => uint256[]) private _ownedTokens;

    // mapping from token ID index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    constructor() {
        _registerInterface(
            bytes4(
                keccak256('totalSupply(bytes4)')^
                keccak256('tokenByIndex(bytes4)')^
                keccak256('tokenOfOwnerByIndex(bytes4)')
            )
        );
    }

    // return the total supply of the _allTokens array
    function totalSupply() public override view returns (uint256) {
        return _allTokens.length;
    }

    function tokenByIndex(uint256 index) public override view returns (uint256) {
        // make sure that the index is not out of bounds of the total supply
        require(index < totalSupply(), 'global index is out of bounds');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public override view returns (uint256) {
        require(index < this.balanceOf(owner),'owner index is out of bounds');
        return _ownedTokens[owner][index];
    }

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);

        _addTokensToAllTokenEnumeration(tokenId);
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        // 1. ownedTokensIndex tokenId set to address of ownedTokens position
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        // 2. add address and tokenId to the _ownedTokens
        _ownedTokens[to].push(tokenId);
    }

    // add tokens to the _allTokens array and set the position of the tokens indexes
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }
}