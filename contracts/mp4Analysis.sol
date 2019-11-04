pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";
import "./strings.sol";
import "./bytesUtil.sol";
import "./intUtil.sol";
import "./compareShape.sol";
import "./ownable.sol";

contract Mp4DataInterface1 is SignatureShape{
    function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface2 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface3 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface4 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface5 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface6 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface7 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface8 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface9 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract Mp4DataInterface10 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

//0x03bbb1ffee2be9485743fac40191ca9856d319c1
contract Mp4Analysis is SignatureShape, CompareShape, Ownable {
    using Strings for *;
    using BytesUtil for *;
    using IntUtil for *;

    Mp4DataInterface1 mp4Contract1 = Mp4DataInterface1(0xea8ccce37ac233dcfe52e299014a401cd853ab82);
    Mp4DataInterface2 mp4Contract2 = Mp4DataInterface2(0x394af04e64b6136fc9237f05cadd32f5f52fc7f3);
    Mp4DataInterface3 mp4Contract3 = Mp4DataInterface3(0xda418a6ee5b8e8a7168bb1243944853defa92ea8);
    Mp4DataInterface4 mp4Contract4 = Mp4DataInterface4(0xe5660a59dfb0f5668317dfaafab4ccf19de6fcd4);
    Mp4DataInterface5 mp4Contract5 = Mp4DataInterface5(0x90504cadbcb99eee9c3688ae78702831f2e6e039);

    function getSignatures() public view returns (Signature[] memory){
        Signature[][5] memory sigsEach = [mp4Contract1.getSignatures(), mp4Contract2.getSignatures(), mp4Contract3.getSignatures(), mp4Contract4.getSignatures(), mp4Contract5.getSignatures()];

        uint len = 0;
        for(uint i = 0; i < sigsEach.length; i++){
            len += sigsEach[i].length;
        }
        Signature[] memory sigsAll = new Signature[](len);

        for(i = 0; i < sigsEach.length; i++){
            for(uint j = 0; j < sigsEach[i].length; j++){
                sigsAll[i * 7 + j] = sigsEach[i][j];
            }
        }

        return sigsAll;
    }

    function devideString(Signature s) public pure returns (string[] memory){
        uint len = bytes(s.idSeq).length;
        for(uint i = 0; i < len; ){
            if(keccak256(bytes(s.idSeq.substring(i, i + 3))) == keccak256("ⓒ")){
                i += 6;
                len -= 2;
            }else{
                i += 4;
            }
        }
        string[] memory idSeqArr = new string[](len / 4);
        uint count = 0;
        for(i = 0; i < bytes(s.idSeq).length;){
            if(keccak256(bytes(s.idSeq.substring(i, i + 3))) == keccak256("ⓒ")){
                idSeqArr[count++] = s.idSeq.substring(i, i + 6);
                i += 6;
            }else{
                idSeqArr[count++] = s.idSeq.substring(i, i + 4);
                i += 4;
            }
        }
        return idSeqArr;
    }

    
    function compareResult(string memory header, Compare chunk) public view returns (string[] memory, uint) {
        uint cnt = 0;
        string[] memory result = new string[](100);

        Signature[] memory signatures = getSignatures(); 

        for(uint i = 0; i < signatures.length; i++){
            string[] memory devide = devideString(signatures[i]);
            if(devide.length == chunk.idSeq.length){
                uint j;
                for(j = 0; j < devide.length; j++){
                    if(keccak256(bytes(devide[j])) != keccak256(bytes(chunk.idSeq[j]))){
                        break;
                    }
                }
                if(j == devide.length){
                    if(signatures[i].checkValue.mark == 1){
                        if(mp4valueCheck(signatures[i].checkValue, header, chunk) == true){
                            result[cnt++] = signatures[i].itemType;
                            result[cnt++] = signatures[i].itemName;
                        }
                    }else{
                        result[cnt++] = signatures[i].itemType;
                        result[cnt++] = signatures[i].itemName;
                    }
                }
            }
        }
        return (result, cnt);
    }

    function isField(FieldValue field, Compare chunk) public pure returns (int) {
        uint count = 0;
        for(uint i = 0; i < chunk.idSeq.length; i++){
            if(keccak256(bytes(field.id)) == keccak256(bytes(chunk.idSeq[i]))){
                if(field.seq != count){
                    count++;
                    continue;
                }
                else{
                    return int(i);
                }
            }
        }
        return -1;
    }

    function isSpecialChar(string memory value, uint start, uint end) public pure returns (int){
        string[1] memory special = ["a9746f6f"]; 
        for(uint i = 0; i < special.length; i++){
            int idx = value.substring(start, end).indexOf(special[i]);
            if(idx != -1){
                return idx;
            }
        }
        return -1;
    }
    
    function changeSpecialChar(string memory value) public pure returns (string memory) {
        uint start = 0;
        uint end = bytes(value).length;
        int idx = isSpecialChar(value, start, end);
        while(idx != -1){
            string memory spilt = "e29392".concat(value.substring(uint(idx + 2), end));
            value = value.substring(0, uint(idx)).concat(spilt);
            start = start + 6;
            end = bytes(value).length;
            if(start > end){
                break;
            }
            idx = isSpecialChar(value, start, end);
        }
        return value;
    }

    function mp4valueCheck(FieldValue field, string memory header, Compare chunk) public pure returns (bool){
        int fieldIndex = isField(field, chunk);
        string memory value;
        if(fieldIndex != -1){
            uint start = chunk.idSeqStart[uint(fieldIndex)];
            if(field.startOffset == -1){
                uint n = (header.substring(start - 8, start).fromHex().bytesToUint()) * 2;
                if(start + n > bytes(header).length){
                    value = changeSpecialChar(header.substring(start + 8, bytes(header).length));
                }
                else{
                    value = changeSpecialChar(header.substring(start + 8, start + n));
                }
            }
            else{
                if(keccak256(bytes(field.id)) == keccak256("mdat")){
                    value = changeSpecialChar(header.substring(start - 8 + uint(field.startOffset * 2), start - 8 + uint(field.startOffset * 2) + uint(field.fieldSize * 2)));
                }
                else{
                    value = changeSpecialChar(header.substring(start + 8 + uint(field.startOffset * 2), start + 8 + uint(field.startOffset * 2) + uint(field.fieldSize * 2)));
                }
            }
            if(keccak256(bytes(field.valueType)) == keccak256("INT")){
                value = int(value.fromHex().bytesToUint()).int2str();
            }
            else if(keccak256(bytes(field.valueType)) == keccak256("BYTE")){
                value = value;
            }
            else{
                value = string(value.fromHex());
            }
            if(value.indexOf(field.fieldValue) != -1){
                return true;
            }
        }
        return false;
    }


}