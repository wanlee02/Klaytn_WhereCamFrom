pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0xe5660a59dfb0f5668317dfaafab4ccf19de6fcd4
contract Mp4InitData4 is SignatureShape{

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
        check = FieldValue(1, 1, -1, -1, "hdlr", "dhlralisappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE 7+"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttsstsssdtpstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcometa";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 1, -1, -1, "hdlr", "dhlralisappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE 8"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttscttscslgstsssdtpstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselstmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselstmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcometafree";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 0, -1, -1, "hdlr", "mhlrvideappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE SE"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttsstsssdtpstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcoudtafreemetafree";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 0, -1, -1, "hdlr", "mhlrvideappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE X"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsgpdsgpdsbgpsttscttscslgstsssdtpstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcoudtafreemetafree";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ftyp", "mp42", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "HONGMI NOTE 5"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdmetatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcofreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ⓒmak", "Apple", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPAD 2"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttsstsssdtpstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcometaudtaⓒmakⓒswrⓒdayⓒmod";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 0, -1, -1, "auth", "ÇLM-X510L", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "LG X5"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdudtaauthstvdvhdrmetatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcofreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

       
    }
}