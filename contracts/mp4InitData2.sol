pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0x394af04e64b6136fc9237f05cadd32f5f52fc7f3
contract Mp4InitData2 is SignatureShape{

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
        check = FieldValue(1, 0, -1, -1, "ⓒinf", "CarDV-TURNKEY", "STR");
        sig.checkValue = check;

        sig.itemType = "BLACKBOX";
        sig.itemName = "Oasser Amazing U2"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypfreamdatmoovmvhdtraktkhdmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttsstssstscstszstcotraktkhdmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcoudtaⓒfmtⓒinfgps ";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        
        check = FieldValue(1, 4, -1, -1, "free", "Sep 05 2012", "STR");
        sig.checkValue = check;
    
        sig.itemType = "BLACKBOX";
        sig.itemName = "Dabonda Gallery DBR-200H"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypfreefreefreefreefreemdatmoovmvhdiodstraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdstszsttsstscstcotraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdstszsttsstscstcostsstraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdstszsttsstscstcostsstraktkhdmdiamdhdhdlrminfnmhddinfdrefstblstsdstszsttsstscstcofree";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 0, -1, -1, "meta", "mdtacom.android.version", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY Note 4"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdsmtametatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 0, -1, -1, "SDLN", "SEQ_PLAY", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY Note 3"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdsmtatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, -1, -1, "SDLN", "SEQ_PLAY", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "GALAXY S4"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtaSDLNsmrdsmtatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 0, -1, -1, "auth", "LGE", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "LG G4"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdudtaauthadzcadzmadzetraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcofreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ftyp", "3gp4", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "LG Optimus G"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtacprtauthtitldscpperfgnrertngclsfkywdlocialbmyrrctraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcotraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstscstszstcostss";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        
    }
}