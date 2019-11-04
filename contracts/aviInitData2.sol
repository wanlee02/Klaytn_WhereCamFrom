pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0xa0367516a1f68657f6f38f91071e799f28a935f8
contract AviInitData2 is SignatureShape{

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
        check = FieldValue(0, 0, 0, 0, "0", "0", "0");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "Avid Media Composer"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrnstrlstrhstrfstrnJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 2, -1, -1, "JUNK", "VirtualDub", "STR");
        sig.checkValue = check;

        sig.itemType = "AVI_EDITOR";
        sig.itemName = "VirtualDub"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfJUNKstrlstrhstrfJUNKodmldmlhJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(0, 0, 0, 0, "0", "0", "0");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "Garmin dash cam 20"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfindxstrlstrhstrfindxJUNKmoviidx1GR02MKLT";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 0, -1, -1, "JUNK", "v1020013 2011101", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "Toguard dash cam"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfJUNKmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, 4, 4, "strh", "H264", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "INAVI FXD700"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 0, 4, 4, "strh", "H264", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "INAVI FXD900"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 2, 4, 4, "strh", "XBLB", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "INAVI CLAIR"; // "정보 없음"은 empty로 처리
        sig.idSeq = "AVI hdrlavihstrlstrhstrfstrlstrhstrfstrlstrhstrfmoviidx1";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);
    }
}