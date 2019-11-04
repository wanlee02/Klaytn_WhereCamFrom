pragma solidity ^0.4.24;

library Strings {
    function substring(string memory self, uint startIndex, uint endIndex) public pure returns (string) {
        bytes memory strBytes = bytes(self);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++)
        {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }

    // Convert an hexadecimal character to their value
    function fromHexChar(uint c) public pure returns (uint) {
        if (byte(c) >= byte('0') && byte(c) <= byte('9')) {
            return c - uint(byte('0'));
        }
        if (byte(c) >= byte('a') && byte(c) <= byte('f')) {
            return 10 + c - uint(byte('a'));
        }
        if (byte(c) >= byte('A') && byte(c) <= byte('F')) {
            return 10 + c - uint(byte('A'));
        }
    }

    // Convert an hexadecimal string to raw bytes
    function fromHex(string memory self) public pure returns (bytes) {
        bytes memory ss = bytes(self);
        require(ss.length%2 == 0, "Error"); // length must be even
        bytes memory r = new bytes(ss.length/2);
        for (uint i = 0; i < ss.length/2; ++i) {
            r[i] = byte(fromHexChar(uint(ss[2*i])) * 16 +
                        fromHexChar(uint(ss[2*i+1])));
        }
        return r;
    }
    
    function stringToUint(string s) public pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint i = 0; i < b.length; i++) { // c = b[i] was not needed
            if (b[i] >= 48 && b[i] <= 57) {
                result = result * 10 + (uint(b[i]) - 48); // bytes and int are not compatible with the operator -.
            }
        }
        return result; // this was missing
    }


    function indexOf(string _haystack, string _needle) public pure returns (int) {
    	bytes memory h = bytes(_haystack);
    	bytes memory n = bytes(_needle);
    	if(h.length < 1 || n.length < 1 || (n.length > h.length))
    		return -1;
    	else if(h.length > (2**128 - 1)) // since we have to be able to return -1 (if the char isn't found or input error), this function must return an "int" type with a max length of (2^128 - 1)
    		return -1;
    	else
    	{
    		uint subindex = 0;
    		for (uint i = 0; i < h.length; i ++)
    		{
    			if (h[i] == n[0]) // found the first char of b
    			{
    				subindex = 1;
    				while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) // search until the chars don't match or until we reach the end of a or b
    				{
    					subindex++;
    				}
    				if(subindex == n.length)
    					return int(i);
    			}
    		}
    		return -1;
    	}
    }

    function reverseValue(string memory self) public pure returns(string) {
        bytes memory _baseBytes = bytes(self);
        assert(_baseBytes.length > 0);

        string memory _tempValue = new string(_baseBytes.length);
        bytes memory _newValue = bytes(_tempValue);


        for(uint i = 0; i < _baseBytes.length; i += 2){
            _newValue[_baseBytes.length - i - 2] = _baseBytes[i];
             _newValue[_baseBytes.length - i - 1] = _baseBytes[i + 1];
        }

        return string(_newValue);
    }

    function concat(string self, string _value) internal pure returns (string) {
        bytes memory _baseBytes = bytes(self);
        bytes memory _valueBytes = bytes(_value);

        string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);

        uint i;
        uint j = 0;

        for(i=0; i<_baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }

        for(i=0; i<_valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i];
        }

        return string(_newValue);
    }
    
}