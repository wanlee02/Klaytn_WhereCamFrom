pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0xea8ccce37ac233dcfe52e299014a401cd853ab82 
contract Mp4InitData1 is SignatureShape{

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
        check = FieldValue(1, 0, 0, 44, "meta", "000000000000002068646c7200000000000000006d64697200000000000000000000000000000008696c7374", "BYTE");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Movie Maker"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdtraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstscstszstcostsstraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcostssudtametaXtra";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 0, -1, -1, "meta", "Lavf56.40.101", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "VapMix"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypfreemdatmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstsscttsstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcoudtameta";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 0, 0, 14, "sdtp", "0000000000000000080808080000", "BYTE");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Edius"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfvmhddinfdrefstblstsdsttscttsstscstszstcostsssdtptraktkhdedtselstmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcofreefreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ftyp", "MSNV", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "PowerDirector"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypfreemdatmoovmvhdtraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttscttsstscstszstcostsstraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttscttsstscstszstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, -1, -1, "hdlr", "Mainconcept", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Adobe Premiere"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttsstsssdtpstscstszstcocttstraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcoudtaⓒTIMⓒTSCⓒTSZuuidmdat";
        
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 0, -1, -1, "dscp", "This video", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Final Cut Pro X"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcotraktkhdedtselstmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstsssdtpstscstszstcoudtadscpthmbtitltitlauthwidemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 0, -1, -1, "meta", "Lavf57.26.100", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Free Video Editor"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypfreemdatmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcotraktkhdedtselstmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstscstszstcoudtameta";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);    
    }
}