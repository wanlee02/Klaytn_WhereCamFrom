pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0x3c0e7d21f1d74ba51a58f4cb1a22626464876b21
contract AviInitData3 is SignatureShape{

    Signature[] public signatures;
    Signature sig;

    constructor() public {
       init();
    }

    function getSignatures() public view returns (Signature[] memory){
        return signatures;  
    }

    function init() public {
        
        FieldValue memory check;

        //1
        delete sig;
        check = FieldValue(1, 0, 4, 4, "strh", "MP4V", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "INAVI E100"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 0, 4, 4, "strh", "AVC1", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "Lukas LK-5900"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 3, 4, 4, "strh", "XBLB", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "Mando BN500D"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 1, 4, 4, "strh", "G711", "STR");
        sig.checkValue = check;

        sig.itemType = "CCTV";
        sig.itemName = "EGPIS (NVR Series)"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ISFT", "EditShare AVI v3.0.0.0", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Lightworks"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfindxstrlstrhstrfindxodmldmlhINFOISFTISMPJUNKmoviidx1JUNK";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 0, 4, 4, "strh", "AVC1", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "INAVI G100"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);
    }
}