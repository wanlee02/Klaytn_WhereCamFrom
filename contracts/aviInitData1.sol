pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0x8694f17af4a47ad5780f7cb8feb6f197398a1462
contract AviInitData1 is SignatureShape{

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
        check = FieldValue(1, 0, -1, -1, "ISFT", "GOM ENCODER", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "GOMMIX"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfINFOISFTJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ISFT", "Bandicut", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Bandicut"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfJUNKstrlstrhstrfJUNKstrlstrhstrfJUNKJUNKINFOISFTJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 3, -1, -1, "JUNK", "Lavf53.24.2", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Gilisoft Video Editor"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfJUNKstrlstrhstrfJUNKvprpJUNKJUNKJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(0, 0, 0, 0, "0", "0", "0");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Vegas"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfindxstrlstrhstrfJUNKindxodmldmlhJUNKVDEXLACEPAR INFOTCODTCDOJUNKmoviidx1JUNK";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 1, -1, -1, "strh", "auds", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Pinnacle Studio"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfindxstrlstrhstrfJUNKindxodmldmlhmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);


        //6
        delete sig;
        check = FieldValue(0, 0, 0, 0, "0", "0", "0");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Avidemux"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfJUNKstrlstrhstrfJUNKJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ISFT", "Lavf55.33.100", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "FFmpeg"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfJUNKvprpstrlstrhstrfJUNKJUNKINFOISFTJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);
    }
}