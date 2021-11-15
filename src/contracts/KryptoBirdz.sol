// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract Kryptobird is ERC721Connector {
    // array to store our NFTs
    string[] public kryptoBirdz;

    function mint(string memory _kryptoBird) public {
        // this is deprecated
        // .push() no longer returns the length, but a ref
        // to the added element
        // uint _id = KryptoBirdz.push(_kryptoBird);

        kryptoBirdz.push(_kryptoBird);
        uint _id = kryptoBirdz.length - 1;

        _mint(msg.sender, _id);
    }

    constructor() ERC721Connector('KryptoBird','KBIRDZ'){
        
    }
}