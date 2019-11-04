pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0xda418a6ee5b8e8a7168bb1243944853defa92ea8
contract Mp4InitData3 is SignatureShape{

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
        check = FieldValue(1, 0, 0, 4, "ftyp", "mp42", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY 9+"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdⓒxyzsmtametatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 0, -1, -1, "SDLN", "SEQ_PLAY", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY S8+"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdsmtametatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ftyp", "mp42", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY S9"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdⓒxyzsmtametatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 0, -1, -1, "SDLN", "SEQ_PLAY", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY NOTE 5"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdsmtatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcosefd";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, -1, -1, "smrd", "TRUEBLUE", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY NOTE 8"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdsmtametatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcosefd";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 2, -1, -1, "hdlr", "mhlrsounappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE 6S"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttsstsssdtpstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcoudtafreemetafree";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 0, -1, -1, "hdlr", "mhlrsounappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE 6S+"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypwidemdatmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttscttscslgstsssdtpstscstszstcometa";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);
    }
}