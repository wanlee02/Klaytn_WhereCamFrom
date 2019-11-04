pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./videoParser.sol";

contract SignatureDB is VideoParser{

    struct VideoShape {
        string[]    result;         //무결성 검사 결과
        string      fileHash;       //파일 해시 값
        string      fileName;       //파일 이름
        string      checkTime;      //검사 시간
        address     userAddress;    //등록 사용자
    }

    struct VideoShapeCompare {
        VideoShape   beforeVideo;
        VideoShape   afterVideo;
        string      result;
    }
    
    VideoShape[] videoshapes;
    VideoShapeCompare[] videoshapescompare;

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getBalanceOwner(address own) public view returns (uint) {
        return own.balance;
    }

    function deposit() public payable { 
    }   

    function singleRegi(string[] result, string fileHash, string fileName, string checkTime) public payable {
        VideoShape memory video;
        video.result = result;
        video.fileHash = fileHash;
        video.fileName = fileName;
        video.checkTime = checkTime;
        video.userAddress = msg.sender;
        videoshapes.push(video);
    }  

    function twoRegi(string compareResult, string[] result, string[] result2, string[] fileHash, string[] fileName, string checkTime) public payable {
        VideoShape memory beforeVideo;
        beforeVideo.result = result;
        beforeVideo.fileHash = fileHash[0];
        beforeVideo.fileName = fileName[0];
        beforeVideo.checkTime = checkTime;
        beforeVideo.userAddress = msg.sender;
        if(isRegister(beforeVideo) != 1){
            videoshapes.push(beforeVideo);
        }
        VideoShape memory afterVideo;
        afterVideo.result = result2;
        afterVideo.fileHash = fileHash[1];
        afterVideo.fileName = fileName[1];
        afterVideo.checkTime = checkTime;
        afterVideo.userAddress = msg.sender;
        if(isRegister(afterVideo) != 1){
            videoshapes.push(afterVideo);
        }
        videoshapescompare.push(VideoShapeCompare(beforeVideo, afterVideo, compareResult));
    }  

    function isRegister(VideoShape video) public view returns (uint) {
        for(uint i = 0; i < videoshapes.length; i++){
            if(videoshapes[i].userAddress == video.userAddress && keccak256(bytes(videoshapes[i].fileHash)) == keccak256(bytes(video.fileHash))){
                return 1;
            }
        }
        return 0;
    }

    function getCount(uint[] memory temp) public pure returns (uint) {
        uint cnt = 0;
        for(uint i = 0; i < temp.length; i++){
            if(temp[i] == 1){
                cnt++;
            }
        }
        return cnt;
    } 

    function getResult(string memory fileHash, address user) public view returns (VideoShape[] memory, VideoShapeCompare[] memory) {
        uint[] memory temp = new uint[](videoshapes.length);
        for(uint i = 0; i < videoshapes.length; i++){
            if(videoshapes[i].userAddress == user && keccak256(bytes(videoshapes[i].fileHash)) == keccak256(bytes(fileHash))){
                temp[i] = 1;
            }
        }
        uint cnt = getCount(temp);
        VideoShape[] memory videotemp = new VideoShape[](cnt);
        cnt = 0;
        for(i = 0; i < videoshapes.length; i++){
            if(temp[i] == 1){
                videotemp[cnt++] = videoshapes[i];
            }
        }
        
        temp = new uint[](videoshapescompare.length);
        for(i = 0; i < videoshapescompare.length; i++){
            if((videoshapescompare[i].afterVideo.userAddress == user && keccak256(bytes(videoshapescompare[i].afterVideo.fileHash)) == keccak256(bytes(fileHash)))
                || (videoshapescompare[i].beforeVideo.userAddress == user && keccak256(bytes(videoshapescompare[i].beforeVideo.fileHash)) == keccak256(bytes(fileHash)))){
                temp[i] = 1;
            }
        }
        cnt = getCount(temp);
        VideoShapeCompare[] memory videocomparetemp = new VideoShapeCompare[](cnt);
        cnt = 0;
        for(i = 0; i < videoshapescompare.length; i++){
            if(temp[i] == 1){
                videocomparetemp[cnt++] = videoshapescompare[i];
            }
        }

        return (videotemp, videocomparetemp);
    }

    function displayAllUserData() public view returns (VideoShape[] memory){
        VideoShape[] memory userShapeArr = new VideoShape[](videoshapes.length);
        
        uint cnt = 0;
        for(uint i = 0; i < videoshapes.length; i++){
            userShapeArr[cnt++] = videoshapes[i];
        }

        return userShapeArr;
    }

    function transfer(uint _value) public returns (bool) {
        require(getBalance() >= _value, "");
        msg.sender.transfer(_value);
        return true;
    }
}