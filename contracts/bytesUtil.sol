pragma solidity ^0.4.24;

library BytesUtil {

    function bytesToUint(bytes memory self) public pure returns (uint256){
        uint256 number;
        for(uint i = 0; i < self.length; i++){
            number = number + uint256(self[i])*(2**(8*(self.length-(i+1))));
        }
        return number;
    }

}