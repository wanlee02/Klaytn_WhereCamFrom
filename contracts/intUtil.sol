pragma solidity ^0.4.24;

library IntUtil {
    function int2str(int self) internal pure returns (string){
        if (self == 0) return "0";
        bool negative = self < 0;
        uint j = uint(negative ? -self : self);
        uint l = j;     // Keep an unsigned copy
        uint len;
        while (j != 0){
            len++;
            j /= 10;
        }
        if (negative) ++len;  // Make room for '-' sign
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (l != 0){
            bstr[k--] = byte(48 + l % 10);
            l /= 10;
        }
        if (negative) {    // Prepend '-'
            bstr[0] = '-';
        }
        return string(bstr);
    }
}