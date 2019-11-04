pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";
import "./strings.sol";
import "./bytesUtil.sol";
import "./intUtil.sol";
import "./compareShape.sol";

contract AviDataInterface1 is SignatureShape{
    function getSignatures() public view returns (Signature[] memory);
}

contract AviDataInterface2 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract AviDataInterface3 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract AviDataInterface4 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

contract AviDataInterface5 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}
contract AviDataInterface6 is SignatureShape{
   function getSignatures() public view returns (Signature[] memory);
}

//0x4c6609896274ea3b52f92a79d15be352a18bed65
contract AviAnalysis is SignatureShape, CompareShape {
    using Strings for *;
    using BytesUtil for *;
    using IntUtil for *;

    AviDataInterface1 aviContract1 = AviDataInterface1(0x8694f17af4a47ad5780f7cb8feb6f197398a1462);
    AviDataInterface2 aviContract2 = AviDataInterface2(0xa0367516a1f68657f6f38f91071e799f28a935f8);
    AviDataInterface3 aviContract3 = AviDataInterface3(0x3c0e7d21f1d74ba51a58f4cb1a22626464876b21);

    function getSignatures() public view returns (Signature[] memory){
        Signature[][3] memory sigsEach = [aviContract1.getSignatures(), aviContract2.getSignatures(), aviContract3.getSignatures()];

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
        string[] memory idSeqArr = new string[](bytes(s.idSeq).length / 4);
        uint count = 0;
        for(uint i = 0; i < bytes(s.idSeq).length; i += 4){
            idSeqArr[count++] = s.idSeq.substring(i, i + 4);
        }
        return idSeqArr;
    }

    function isMovi(string[] memory isSeqs) public pure returns (uint){
        for(uint i = 0; i < isSeqs.length; i++){
            if(keccak256("movi") == keccak256(bytes(isSeqs[i]))){
                return i;
            }
        }
    } 

    function compareResult(string memory header, Compare chunk) public view returns (string[] memory, uint) {
        uint cnt = 0;
        string[] memory result = new string[](100);
        
        Signature[] memory signatures = getSignatures();

        for(uint i = 0; i < signatures.length; i++){
            string[] memory devide = devideString(signatures[i]);
            uint movi = isMovi(devide) + 1;
            //구조 길이 비교
            //if(devide.length == chunk.idSeq.length){
            if(movi == chunk.idSeq.length){
            //길이가 동일할 때 하나씩 구조 비교
                uint j;
                //for(j = 0; j < devide.length; j++){
                for(j = 0; j < movi; j++){
                    if(keccak256(bytes(devide[j])) != keccak256(bytes(chunk.idSeq[j]))){
                        break;
                    }
                }
                //j == devide.length
                if(j == movi){
                    if(signatures[i].checkValue.mark != 0){
                        if(avivalueCheck(signatures[i].checkValue, header, chunk) == true){
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

    //파싱한 구조에 확인해야 하는 필드가 있는지 확인
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

    function avivalueCheck(FieldValue field, string memory header, Compare chunk) public pure returns (bool){
        //필드가 있는지 확인 필드의 값이 일치하는지 확인
        int fieldIndex = isField(field, chunk);
        string memory value;
        bytes memory valueByte;
        if(fieldIndex != -1){
            uint start = chunk.idSeqStart[uint(fieldIndex)] + 8;
            if(field.startOffset == -1){
                //필드의 크기를 구해서 value를 구함
                uint n = getAviFieldSize(header.substring(start, start + 8));
                valueByte = header.substring(start + 8, start + 8 + n).fromHex();
            }
            else{
                //필드의 시작점과 크기를 안다 value를 구함
                valueByte = header.substring(start + 8 + uint(field.startOffset * 2), start + 8 + uint(field.startOffset * 2) + uint(field.fieldSize * 2)).fromHex();
            }

            //비교 맞으면 true
            if(keccak256(bytes(field.valueType)) == keccak256("INT")){
                value = int(valueByte.bytesToUint()).int2str();
            }
            else{
                value = string(valueByte);
            }
            if(value.indexOf(field.fieldValue) != -1)
                return true;
        }
        //틀리면 false
        return false;
    }

    function getAviFieldSize(string memory size) public pure returns (uint) {
        string memory s = size.reverseValue();
        uint n = s.fromHex().bytesToUint();
        if(n % 2 != 0)
            n += 1;
        n = n * 2;
        return n;
    }
}
