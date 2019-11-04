pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./signatureShape.sol";

//0x90504cadbcb99eee9c3688ae78702831f2e6e039
contract Mp4InitData5 is SignatureShape{

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
        check = FieldValue(1, 0, -1, -1, "meta", "mdtacom.android.version", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "Nexus 5X"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdudtaⓒxyzmetatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcofreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //2
        delete sig;
        check = FieldValue(1, 0, -1, -1, "ftyp", "3gp4", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "HTC Wildfire A3333"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmdatmoovmvhdudtacprtauthtitldscpperfgnrertngclsfkywdlocialbmyrrctraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstscstszstcostsstraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstco";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //3
        delete sig;
        check = FieldValue(1, 0, -1, -1, "meta", "ⓒtoo", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Kakao Talk"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcoudtametafreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //4
        delete sig;
        check = FieldValue(1, 0, -1, -1, "hdlr", "mhlrsounappl", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPHONE 7"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfsmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdtaptedtselstmdiamdhdhdlrminfvmhdhdlrdinfdrefstblstsdsttscttscslgstsssdtpstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcotraktkhdedtselsttrefmdiamdhdhdlrminfgmhdhdlrdinfdrefstblstsdsttsstscstszstcometawidemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //5
        delete sig;
        check = FieldValue(1, 0, -1, -1, "auth", "ÇLGM-V300K", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "LG V30"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdudtaauthstvdvhdrmetatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcofreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //6
        delete sig;
        check = FieldValue(1, 0, -1, -1, "auth", "ÇLGM-X600S", "STR");
        sig.checkValue = check;
    
        sig.itemType = "SMARTPHONE";
        sig.itemName = "IPAD 2"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypmoovmvhdudtaauthstvdmetatraktkhdmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstszstscstcotraktkhdmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstszstscstcofreemdat";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);

        //7
        delete sig;
        check = FieldValue(1, 1, -1, -1, "stsd", "Wmp4a", "STR");
        sig.checkValue = check;
    
        sig.itemType = "MP4_EDITOR";
        sig.itemName = "Movavi Video Editor Plus"; // "정보 없음"은 empty로 처리
        sig.idSeq = "ftypfreemdatmoovmvhdtraktkhdedtselstmdiamdhdhdlrminfvmhddinfdrefstblstsdsttsstssstscstszstcotraktkhdedtselstmdiamdhdhdlrminfsmhddinfdrefstblstsdsttsstscstszstcosgpdsbgpudtameta";
        sig.creatTime = uint32(now);
        sig.deleteTime = 0;

        signatures.push(sig);
    }
}