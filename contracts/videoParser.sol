pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./ownable.sol";
import "./strings.sol";
import "./bytesUtil.sol";
import "./intUtil.sol";
import "./compareShape.sol";
import "./signatureShape.sol";

contract Mp4AnalysisInterface is CompareShape, SignatureShape{
  function compareResult(string memory header, Compare chunk) public view returns (string[] memory, uint);
  function getSignatures() public view returns (Signature[] memory);
}
contract AviAnalysisInterface is CompareShape, SignatureShape{
  function compareResult(string memory header, Compare chunk) public view returns (string[] memory, uint);
  function getSignatures() public view returns (Signature[] memory);
}

contract VideoParser is CompareShape, SignatureShape, Ownable{

    using Strings for *;
    using BytesUtil for *;
    using IntUtil for *;

    Mp4AnalysisInterface mp4Contract = Mp4AnalysisInterface(0x03bbb1ffee2be9485743fac40191ca9856d319c1);
    AviAnalysisInterface aviContract = AviAnalysisInterface(0x4c6609896274ea3b52f92a79d15be352a18bed65);

    function compareResult(string memory header) public view returns (string[] memory, uint){
        string memory isFormat = string(header.substring(0, 8).fromHex());
        string[] memory result;
        Compare memory chunk;
        uint cnt;
        if(keccak256(bytes(isFormat)) == keccak256("RIFF")){
            (chunk, cnt) = aviParser(header);
            chunk = arraySlice(chunk, cnt);
            (result, cnt) = aviContract.compareResult(header, chunk);
        }else{
            (chunk, cnt) = mp4Parser(header);
            chunk = arraySlice(chunk, cnt);
            (result, cnt) = mp4Contract.compareResult(header, chunk);
        }
        return (result, cnt);
    }

    function arraySlice(Compare chunk, uint cnt) public pure returns (Compare){
        Compare memory temp;
        temp.idSeq = new string[](cnt);
        temp.idSeqStart = new uint[](cnt);

        for(uint i = 0; i < cnt; i++){
            temp.idSeq[i] = chunk.idSeq[i];
            temp.idSeqStart[i] = chunk.idSeqStart[i];
        }

        return temp;
    }

    //mp4parser
    function mp4Parser(string memory header) public pure returns (Compare, uint){
        string memory str;
        bytes memory b;
        uint n;

        Compare memory chunk;
        chunk.idSeq = new string[](100);
        chunk.idSeqStart = new uint[](100);
        uint cnt = 0;
    
        for(uint i = 8; i < bytes(header).length;){
            str = header.substring(i, i + 8);
            if(keccak256(bytes(str.substring(0, 2))) == keccak256("a9")){
                str = "e29392".concat(str.substring(2, 8));
            }
            b = str.fromHex();
            chunk.idSeq[cnt] = string(b);
            chunk.idSeqStart[cnt++] = i;

            if(!isMp4Child(string(b))){
                str = header.substring(i - 8, i);
                b = str.fromHex();
                n = b.bytesToUint() * 2;
                i = i + n;
            }
            else{
                i = i + 16;
            }
        }
        return (chunk, cnt);
    }

    function isMp4Child(string memory str) public pure returns (bool){
        string[9] memory root = ["mdat", "moov", "udta", "trak", "mdia", "minf", "dinf", "stbl", "edts"];
        for(uint j = 0; j < root.length; j++){
            if(keccak256(bytes(str)) == keccak256(bytes(root[j])))
                return true;
        }
        return false;
    }

    //aviParser
    function aviParser(string memory header) public pure returns (Compare, uint){
        string memory str;
        bytes memory b;
        uint n;

        Compare memory chunk;
        uint cnt = 0;
        chunk.idSeq = new string[](100);
        chunk.idSeqStart = new uint[](100);

        for(uint i = 0; i < bytes(header).length;){
            str = header.substring(i, i + 8);
            b = str.fromHex();
            if(keccak256(bytes(string(b))) == keccak256("RIFF") || keccak256(bytes(string(b))) == keccak256("LIST")){
                i = i + (8 * 2);
                str = header.substring(i, i + 8);
                b = str.fromHex();
                chunk.idSeq[cnt] = string(b);
                chunk.idSeqStart[cnt++] = i;
                i = i + 8;
            }
            else{
                chunk.idSeq[cnt] = string(b);
                chunk.idSeqStart[cnt++] = i;
                i = i + 8;
                n = getAviFieldSize(header.substring(i, i + 8));
                i = i + 8 + n;
            }
        }
        //추후수정 (movi 이후에 나오는 필드 추가)
        //chunk.idSeq.push("idx1");
        return (chunk, cnt);
    }

    function getAviFieldSize(string memory size) public pure returns (uint) {
        string memory s = size.reverseValue();
        uint n = s.fromHex().bytesToUint();
        if(n % 2 != 0)
            n += 1;
        n = n * 2;
        return n;
    }

    function displayAllSignatures() external view  returns(Signature[] memory) {
        Signature[] memory signatures1 = aviContract.getSignatures();  
        Signature[] memory signatures2 = aviContract.getSignatures();

        Signature[] memory signatures = new Signature[](signatures1.length + signatures2.length);
        
        uint cnt = 0;
        for(uint i = 0; i < signatures1.length; i++){
            signatures[cnt++] = signatures1[i];
        }
        for(i = 0; i < signatures2.length; i++){
            signatures[cnt++] = signatures2[i];
        }

        return signatures;
    }
}