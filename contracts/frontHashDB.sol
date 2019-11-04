pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract frontHashDB {

    struct FrontHash {
        string  fileHash;
        string  checkTime;
    }
    
    FrontHash[] fronthashes;

    function setFrontHash(string fronthash, string time) external  {
        fronthashes.push(FrontHash(fronthash, time));
    }

    function getFrontHash() public view returns (FrontHash memory) {
        return fronthashes[fronthashes.length - 1];
    }
}