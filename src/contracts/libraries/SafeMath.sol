// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SafeMath {
  // build functions to perform safe math operations that would
  // otherwise replace intuitive preventative measures

  // function add r = x + y
  function add(uint256 a, uint256 b) internal pure returns(uint256) {
    uint256 r = a + b;
    require(r >= a, 'SafeMath addition overflow');
    return r;
  }

  function sub(uint256 a, uint256 b) internal pure returns(uint256) {
    uint256 r = a - b;
    require(b <= a, 'SafeMath subtraction overflow');
    return r;
  }
}