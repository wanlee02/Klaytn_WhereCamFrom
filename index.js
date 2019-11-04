import Caver from "caver-js";
import { Spinner } from "spin.js";

var CryptoJS = require('crypto-js');

const config = {
  rpcURL: 'https://api.cypress.klaytn.net:8651'
  //rpcURL: 'https://api.baobab.klaytn.net:8651'
}
var alcount = 0;

const cav = new Caver(config.rpcURL);

//const agContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const sigContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const frontContract = new cav.klay.Contract(FRONT_ABI, FRONT_ADDRESS);
const parserContract = new cav.klay.Contract(PARSER_ABI, PARSER_ADDRESS);


var list = new Array();
var list2 = new Array();
var count = 0;
var count2 = 0
var video1;
var video2;
var canvas;
var canvas2;
var compareSpin;
var analSpin;
var adSpin;
var scompareReult = "";
var sresult1 = "";
var sresult2 = "";
var sname1 = ""
var sname2 = "";
var shash1;
var shash2;

var close1 = 0;
var close2 = 0;
var close3 = 0;
var closeSig = 0;
var closeData = 0;
var adZipClo = 0;

var checkingNum;

const App = {

  auth: {
    accessType: 'privateKey',
    privateKey: ''
  },


  start: async function () {

    const walletFromSession = sessionStorage.getItem('walletInstance');
    const walletFromSession2 = sessionStorage.getItem('walletInstance2');

    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession));
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession2));
        this.changeUI(JSON.parse(walletFromSession));
      } catch (e) {
        sessionStorage.removeItem('walletInstance');
        sessionStorage.removeItem('walletInstance2');
      }
    }
  },

  //시작//
  playSelectedFile: async function () {
    video1 = document.getElementById("v1");
    video2 = document.getElementById("v2");
    canvas = document.getElementById("prevImgCanvas");
    canvas2 = document.getElementById("prevImgCanvas2");

    var target = document.getElementById("inputFile");
    var file = target.files[0];
    var fileURL = URL.createObjectURL(file);
    video1.src = fileURL;

    var target2 = document.getElementById("inputFile2");
    var file2 = target2.files[0];
    var fileURL2 = URL.createObjectURL(file2);
    video2.src = fileURL2;

    const me = this;
    video1.addEventListener('loadeddata', function () {
      me.reloadFrame();
    }, false);
    video2.addEventListener('loadeddata', function () {
      me.reloadFrame2();
    }, false);
    video1.addEventListener('seeked', function () {
      me.imageView(1);
    }, false);
    video2.addEventListener('seeked', function () {
      me.imageView(2);
    }, false);
  },

  imageView: async function (flag) {

    var one = 0;
    if (flag == 1) {
      var context = canvas.getContext('2d');
      context.drawImage(video1, 0, 0, canvas.width, canvas.height); // canvas에 그리기
      list[count] = context.getImageData(0, 0, canvas.width, canvas.height); //canvas에 올라간 프레임의 픽셀정보가 담긴 배열

      if (video1.duration > count) {
        console.log("count1 " + count);
        count++;
        one++;
        this.reloadFrame();

      }
    } else {
      var context = canvas2.getContext('2d');
      context.drawImage(video2, 0, 0, canvas2.width, canvas2.height);
      list2[count2] = context.getImageData(0, 0, canvas2.width, canvas2.height);

      if (video2.duration > count2) {
        console.log("count2 " + count2);
        count2++;
        one++;
        this.reloadFrame2();
      }
    }
    if (count > video1.duration && count2 > video2.duration && one != 0) {
      this.calculate();
    }
  },

  reloadFrame: async function () {
    video1.currentTime = count;
  },

  reloadFrame2: async function () {
    video2.currentTime = count2;
  },




  handleUpload2: async function (file) {
    // var spinner = this.showSpinner();
    checkingNum = 0;

    return new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      var size = file.size;

      var result;

      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        var r = event.target.result;

        var uint8Array = new Uint8Array(r);

        //arraybuffer -> string
        //utf-8일경우 bandicut 샘플 영상일 때 index 오류 발생: m자리 오류
        var decoder = new TextDecoder("iso-8859-2");
        var s = decoder.decode(uint8Array);


        //**** avi 일때 *****
        var aSize = s.lastIndexOf("movi");
        var i = s.indexOf("ftyp");
        if ((aSize != -1) && (i == -1)) {
          console.log('avi');
          var t = r.slice(0, (aSize + 4));

          //arraybuffer -> hex
          var buffer = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');


          this.Analysis(buffer).then(function (e) {

            console.log(e[1])
            result = e[0].slice(0, e[1]);
            $('#print').empty();
            // spinner.stop();
            resolve(result);

          });
        }

        //**** mp4 일때 *****
        else if (i != -1) {
          console.log('md');

          var moovIndex = s.indexOf("moov");
          var mdatIndex = s.indexOf('mdat');

          // moov먼저나올 때
          if (moovIndex < mdatIndex) {
            var t = r.slice(0, (mdatIndex + 4));
            var buffer = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            t = r.slice(mdatIndex - 4, mdatIndex);

            var b = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            var free = mdatIndex - 4 + parseInt(b.toString(16), 16) + 4;
            t = r.slice(free, free + 4);

            var fr = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            count = (fr.match(/66726565/g) || []).length;
            if (count == 1) {
              t = r.slice(free - 4, size);
              buffer += Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
              console.log('free');
            }

            console.log('moov');
          }
          // moov가 뒤에 나올 때
          else {
            var mdatLastIndex = s.lastIndexOf('mdat');
            var t = r.slice(0, mdatIndex + 4);
            buffer = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');



            var count = 0
            var countAll = 0;
            var middle = 0;

            if (mdatLastIndex > mdatIndex) {
              t = r.slice(mdatLastIndex, mdatLastIndex + 4);
              var md = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
              count = (md.match(/6d646174/g) || []).length;


              t = r.slice(mdatIndex - 4, mdatIndex);
              var b = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
              middle = mdatIndex - 4 + parseInt(b.toString(16), 16) + 4;
              t = r.slice(middle, mdatLastIndex - 4);

              var bufferMiddle = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
              countAll = (bufferMiddle.match(/6d646174/g) || []).length;
            }
            if (countAll >= 1) {
              console.log('나야나')
              $('#print').empty();

            }
            // mdat 2개일 때
            else if (count == 1 && middle <= mdatLastIndex) {
              t = r.slice(mdatLastIndex - 4, size);
              buffer += Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
              console.log('mdat 2개');
            }
            // mdat 1개일 때
            else {
              t = r.slice(moovIndex - 4, size);
              buffer += Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
              console.log('mdat 1개');
            }
          }

          this.Analysis(buffer).then(function (e) {
            console.log(e[1])
            result = e[0].slice(0, e[1]);
            $('#print').empty();
            // spinner.stop();
            console.log("나 핸들업2");
            console.log("result1" + result);
            resolve(result);
            checkingNum = 1;
          });
        }
      }

    });

  },

  handleUpload3: async function (file) {
    // var spinner = this.showSpinner();
    checkingNum = 0;

    return new Promise((resolve, reject) => {

      const fileReader = new FileReader();



      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        var r = event.target.result;

        var uint8Array = new Uint8Array(r);

        //arraybuffer -> string
        //utf-8일경우 bandicut 샘플 영상일 때 index 오류 발생: m자리 오류
        var decoder = new TextDecoder("iso-8859-2");
        var s = decoder.decode(uint8Array);

        var i = s.indexOf("ftyp");

        if (i != -1) {
          console.log('md');

          checkingNum = 1;
          resolve(checkingNum);
        }
        else {
          resolve(checkingNum);
        }
      }

    });

  },


  calculate: async function () {
    console.log("Max count: " + count)
    console.log(list[0])

    if (count == count2) {
      var rgbaAbs = new Array();


      console.log("Pixel Lenght of a frame: " + list[0].data.length)
      //calculate the rgba difference of each frame and store it in array rgba.abs[]
      for (var fr = 0; fr < count; fr++) {
        rgbaAbs[fr] = new Array(list[fr].data.length);
        for (var px = 0; px < list[fr].data.length; px++) {
          rgbaAbs[fr][px] = Math.abs(list[fr].data[px] - list2[fr].data[px]);
        }
      }

      var pixDiffArray = new Array();
      console.log(rgbaAbs[0]);

      // combine four rgba difference into a single pixel
      var p = 0;
      for (var i = 0; i < count; i++) {
        pixDiffArray[i] = new Array(rgbaAbs[i].length / 4);

        p = 0;
        for (var j = 0; j < rgbaAbs[i].length / 4; j++) {
          pixDiffArray[i][j] = 0;
          for (var k = p; k < 4 + p; k++) {
            pixDiffArray[i][j] += rgbaAbs[i][k];
          }
          p = p + 4;
        }
      }
      console.log("Each frame pixDiffArray: ")
      console.log(pixDiffArray)

      // sum and average of pixels of each frame 
      var frameDiffAvg = new Array();
      var frameDiffSum = 0;
      for (var fr = 0; fr < count; fr++) {
        frameDiffSum = 0;
        for (var px = 0; px < pixDiffArray[fr].length; px++) {
          frameDiffSum += pixDiffArray[fr][px];
        }
        frameDiffAvg[fr] = frameDiffSum / pixDiffArray[fr].length;
      }
      console.log("frameAvg: ")
      console.log(frameDiffAvg)

      // divide a frame into multiple areas with 10x10, get sum and average of each area
      var areaDiffSum, areaDiffAvg;
      var frameAreaMax = new Array(count);
      var areaLength = 10;

      for (var fr = 0; fr < count; fr++) {
        frameAreaMax[fr] = -1;

        for (var row = 0; row < pixDiffArray[fr].length; row = row + canvas.width) {
          for (var col = 0; col < canvas.width; col = col + areaLength) {
            areaDiffSum = 0;
            for (var i = 0; i < areaLength; i++) {
              for (var j = 0; j < areaLength; j++)
                areaDiffSum += pixDiffArray[fr][(row + i * canvas.width) + (col + j)];
            }

            areaDiffAvg = areaDiffSum / (areaLength * areaLength);
            if (frameAreaMax[fr] < areaDiffAvg)
              frameAreaMax[fr] = areaDiffAvg;
          }
        }
      }
      console.log("frame Area Max: ")
      console.log(frameAreaMax)

      var ratioMaxAvg = new Array(count);
      for (var fr = 0; fr < count; fr++) {
        ratioMaxAvg[fr] = (frameAreaMax[fr] / frameDiffAvg[fr]);
      }
      console.log("ratioMaxAvg: ")
      console.log(ratioMaxAvg)

      var cr;
      for (cr = 0; cr < count; cr++) {
        if (ratioMaxAvg[cr] > 10 || frameDiffAvg[cr] > 30) {
          break;
        }
      }

      var theSecond = cr - 1;
      if (cr == 0) {
        theSecond = 0;
      }

      $("#resultSentence").empty();
      $("#resultSentence").show();
      if (cr > -1 && cr < count) { //cr < count
        var canvas3 = document.getElementById("afImgCanvas");
        var context3 = canvas3.getContext('2d');
        var canvas4 = document.getElementById("afImgCanvas2");
        var context4 = canvas4.getContext('2d');
        $('#resultCanvas').show();
        context3.putImageData(list[cr], 0, 0);
        context4.putImageData(list2[cr], 0, 0);
        $('#resultSentence').append("Not Same!<br> different after " + theSecond + " second.");
      }
      else {
        $('#resultSentence').append("Same!");
      }

      let e, f, g, h, result1, result2, hash1, hash2;

      var file1 = document.getElementById("inputFile").files[0];
      var name1 = file1.name;
      var file2 = document.getElementById("inputFile2").files[0];
      var name2 = file2.name;

      e = App.handleUpload2(file1).then(res => {
        result1 = res;
      });
      f = App.handleUpload2(file2).then(res => {
        result2 = res;
      });
      g = App.process(2).then(res => {
        hash1 = res;
      });
      h = App.process(3).then(res => {
        hash2 = res;
      });

      Promise.all([e, f, g, h]).then(function () {
        console.log("complete all");
        sresult1 = result1;
        sresult2 = result2;
        sname1 = name1;
        sname2 = name2;
        shash1 = hash1;
        shash2 = hash2;
        App.printComResult(result1, result2, name1, name2);
      });
    }
    else {
      compareSpin.stop();
      alert('Please upload the same length videos.');
      return;
    }
  },


  printComResult: async function (result1, result2, name1, name2) {
    $("#print").empty();
    // $("#resultSentence").empty();
    // $("#resultSentence").show();
    // $('#resultSentence').append(comResult);

    $('#print').append(`<br>`);
    $('#print').append("<br>-------- First Video --------<br>");

    if (result1.length == 0) { //李얠쓣 ???놁쓣??
      $('#print').append("Result : <b style='color: blue'>Unknown</b><br>" + `<br>`);
    }

    else if (result1.length == 2) {//?꾨낫 ?놁씠 ?뺤떎?좊븣

      if (result1[0] == "MP4_EDITOR") {
        $('#print').append("<b style='color: blue'>Edited</b>" + " by&nbsp;&nbsp;" + result1[1] + `<br>`);
      }
      else {
        $('#print').append("<b style='color: blue'>Original</b> made by " + result1[1] + `<br>`);
      }
    }

    else { //?꾨낫媛 ?щ윭媛쒖씪 ??
      if (result1[0] == "MP4_EDITOR") {
        $('#print').append("<b style='color: blue'>Edited</b>" + "  by one of &nbsp;&nbsp;");
        for (var k = 0; k < result1.length; k += 2) {
          if (k == 0) {
            $('#print').append(result1[k + 1]);
          }
          else {
            $('#print').append(", " + result1[k + 1] + "<br>");
          }
        }
      }
      else {
        $('#print').append("<b style='color: blue'>Original</b>" + " made by one of &nbsp;&nbsp;");
        for (var k = 0; k < result1.length; k += 2) {
          if (k == 0) {
            $('#print').append(result1[k + 1]);
          }
          else {
            $('#print').append(", " + result1[k + 1] + "<br>");
          }
        }
      }
    }

    $('#print').append("File Name  : " + name1 + `<br>`);
    $('#print').append("<br>-------- Second Video --------<br>");

    if (result2.length == 0) { //李얠쓣 ???놁쓣??
      $('#print').append("Result: <b style='color: blue'>Unknown</b><br>" + `<br>`);
    }

    else if (result2.length == 2) {//?꾨낫 ?놁씠 ?뺤떎?좊븣
      if (result2[0] == "MP4_EDITOR") {
        $('#print').append("<b style='color: blue'>Edited</b>" + " by&nbsp;&nbsp;" + result2[1] + `<br>`);
      }
      else {
        $('#print').append("<b style='color: blue'>Original</b> made by " + result2[1] + `<br>`);
      }
    }

    else { //?꾨낫媛 ?щ윭媛쒖씪 ??
      if (result2[0] == "MP4_EDITOR") {
        $('#print').append("<b style='color: blue'>Edited</b>" + " by one of&nbsp;&nbsp;");
        for (var k = 0; k < result2.length; k += 2) {

          if (k == 0) {
            $('#print').append(result2[k + 1]);
          }
          else {
            $('#print').append(", " + result2[k + 1] + "<br>");
          }
        }
      }
      else {
        $('#print').append("<b style='color: blue'>Original</b>" + " made by one of &nbsp;&nbsp;");
        for (var k = 0; k < result2.length; k += 2) {

          if (k == 0) {
            $('#print').append(result2[k + 1]);
          }
          else {
            $('#print').append(", " + result2[k + 1] + "<br>");
          }
        }
      }
    }

    $('#print').append("File Name  : " + name2 + `<br>`);
    // $('#print').append('<br' + new Date() + `<br>`);
    compareSpin.stop();
    $('#print').show();
    $('#comrestore').show();
    $('#comstoring').show();
  },



  //두 이미지의 rgb 차이를 절대값으로 구해 abs 배열에저장
  getDifferenceValue: async function (pixels1, pixels2, index) {
    var p1 = pixels1.data;
    var p2 = pixels2.data;
    var abs = new Array();

    for (var i = 0; i < pixels1.data.length; i++) {
      abs[i] = Math.abs(p1[i] - p2[i]);     // R
      // abs[i+1] = Math.abs(p1[i+1] - p2[i+1]); // G
      // abs[i+2] = Math.abs(p1[i+3] - p2[i+2]); // B
      // abs[i+3] = 0;          // Alpha
    }
    return Promise.all([abs, index]);
  },

  //차이값을 넣으면 차이배열 (맥스값 구하기), 그냥 픽셀 넣으면 이미지의 합
  getSum: async function (abs, index) {
    var sum = 0;
    for (var i = 0; i < abs.length; i++) {
      sum += abs[i];
    }
    return Promise.all([sum, index]);
  },

  //각각의 전체이미지의 합
  getSumAll: async function (pixels, index) {
    var p1 = pixels.data;

    var sum = 0;

    for (var i = 0; i < pixels.data.length; i++) {
      sum = sum + Math.abs(p1[i]) / 10;     // R
      // abs[i+1] = Math.abs(p1[i+1] - p2[i+1]); // G
      // abs[i+2] = Math.abs(p1[i+3] - p2[i+2]); // B
      // abs[i+3] = 0;          // Alpha
    }

    return Promise.all([sum, index]);
  },

  //평균
  getMean: async function (abs) {
    var sum = 0;

    for (var i = 0; i < abs.length; i++) {
      sum += abs[i];
    }
    return sum / abs.length;
  },

  //표준편차
  getSD: async function (abs) {

    if (abs.length < 2) {
      return NaN;
    }

    var sum = 0;
    var sd = 0;
    var diff;
    var meanValue = getMean(abs);

    for (var i = 0; i < abs.length; i++) {
      diff = abs[i] - meanValue;
      sum += diff * diff;
    }
    sd = Math.sqrt(sum / (abs.length));
    return sd;

  },

  comStore: async function () {

    // var spinner = this.showSpinner();
    var n_time = new Date();
    var y = n_time.getFullYear();

    if (y < 2020) {
      var con_test = confirm('Free until this year. But it will be charged 1.5 KLAY from 2020.');

      if (con_test) {
        var tim = new Date();
        var time = tim.toString();
        App.twoRegi(scompareReult, sresult1, sresult2, shash1, shash2, sname1, sname2, time, "0")
      }
    }
    else {
      var con_test = confirm('1.5 KLAY will be paid. Are you sure you want to run it?');
      if (con_test) {
        var tim = new Date();
        var time = tim.toString();
        App.twoRegi(scompareReult, sresult1, sresult2, shash1, shash2, sname1, sname2, time, "1.5")

      }
    }

  },

  confirm1: async function () {
    if (document.getElementById("input_analyze").value == "") {
      alert('Please put the video');
    }
    else {
      var time = new Date();
      var y = time.getFullYear();

      if (y < 2020) {
        var con_test = confirm('Free until this year. But it will be charged 0.5 KLAY from 2020.');

        if (con_test) {
          var num = 0;
          App.handleUpload(num);
        }
      }
      else {
        var balance = cav.utils.fromPeb(await this.getBalanceOwner(), "KLAY");
        if (balance < 0.5) {
          alert('There is not enough balance.')
        }
        else {
          var con_test = confirm('0.5 KLAY will be paid. Are you sure you want to run it?');
          if (con_test) {
            var num = 1;
            App.handleUpload(num);
          }
        }
      }
    }
  },

  confirm2: async function () {
    if (document.getElementById("input_analyze").value == "") {
      alert('Please put the video');
    }
    else {
      var time = new Date();
      var y = time.getFullYear();

      if (y < 2020) {
        var con_test = confirm('Free until this year. But it will be charged 1 KLAY from next year.');

        if (con_test) {
          var num = 3;
          App.handleUpload(num);
        }
      }
      else {
        var balance = cav.utils.fromPeb(await this.getBalanceOwner(), "KLAY");
        if (balance < 1) {
          alert('There is not enough balance.')
        }
        else {
          var con_test = confirm('1 KLAY will be paid. Are you sure you want to run it?');

          if (con_test) {
            var num = 2;
            App.handleUpload(num);
          }
        }
      }
    }
  },


  confirm3: async function () {

    //새로고침했을 때
    count = 0;
    count2 = 0;
    $("#resultSentence").empty();


    //914
    //파일입력이 제대로 안되었을때
    if (document.getElementById("inputFile").value == "" || document.getElementById("inputFile2").value == "") {
      alert('Please put the videos');
    }

    //파일입력이 두개 다 완료되었을 때
    else {

      compareSpin = this.showSpinner();

      var checked = 0;

      var file1 = document.getElementById("inputFile").files[0];;
      var g = App.handleUpload3(file1).then(res => {
        if (checkingNum == 1) {
          checked++;
          console.log("Checked is plus")
        }

      });

      var file2 = document.getElementById("inputFile2").files[0];;
      var g2 = App.handleUpload3(file2).then(res => {
        if (checkingNum == 1) {
          checked++;
          console.log("Checked is plus plus")
        }

      });

      //두개의 영상이 각각 mp4영상인 지 확인
      Promise.all([g, g2]).then(function (values) {
        console.log("checked" + checked);
        if (checked != 2) {
          alert("please put the 'mp4' video.")
          compareSpin.stop();
        }
        else {
          App.confirm4();
        }
      })
    }

  },


  //914
  //모든 조건 만족했을 때만(mp4, 파일 두개입력) 비교 수행하는함수
  confirm4: async function () {
    var time = new Date();
    var y = time.getFullYear();

    if (y < 2020) {
      var con_test = confirm('Free until this year. But it will be charged 0.5 KLAY from next year.');

      if (con_test) {
        $('#comrestore').hide();
        $('#print').empty();
        $('#transaction').empty();
        App.playSelectedFile();
      }
      else {
        compareSpin.stop();
      }
    }
    else {
      var balance = cav.utils.fromPeb(await this.getBalanceOwner(), "KLAY");
      if (balance < 0.5) {
        alert('There is not enough balance.')
      }
      else {
        var con_test = confirm('0.5 KLAY will be paid. Are you sure you want to run it? It may take a long time.');
        if (con_test) {
          App.deposit("0.5").then(function (e) {
            $('#comrestore').hide();
            $('#print').empty();
            $('#transaction').empty();
            App.playSelectedFile();
          })
        }
        else {
          compareSpin.stop();
        }
      }
    }
  },


  handleUpload: async function (num) {
    analSpin = this.showSpinner();
    //App.process();
    var result;
    var printresult = "";
    //var printhash;
    const fileReader = new FileReader();
    var target;

    target = document.getElementById("input_analyze");

    var file = target.files[0];
    var size = file.size;
    var name = file.name;

    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (event) => {
      var r = event.target.result;
      var uint8Array = new Uint8Array(r);

      //arraybuffer -> string
      //utf-8일경우 bandicut 샘플 영상일 때 index 오류 발생: m자리 오류
      var decoder = new TextDecoder("iso-8859-2");
      var s = decoder.decode(uint8Array);



      //**** avi 일때 *****
      var aSize = s.lastIndexOf("movi");
      var i = s.indexOf("ftyp");
      if ((aSize != -1) && (i == -1)) {
        console.log('avi');
        var t = r.slice(0, (aSize + 4));

        //arraybuffer -> hex
        var buffer = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');




        this.Analysis(buffer).then(function (e) {
          if (e[0] == 'error') {
            analSpin.stop();
            alert("error : video's header content length is too large.");

            return;
          }
          console.log(e)
          var tim = new Date();
          var time = tim.toString();
          // alert(e[0][0]);
          console.log(e[1])
          result = e[0].slice(0, e[1]);
          $('#print').empty();
          $('#transaction').empty();

          if (e[1] == 0) {
            $('#print').append("<p style='color:blue; font-weight:bold; font-size:17px;'>Unknown!</p><br>");
            $('#print').append("KLAY is not paid. <br>")
            $('#print').append("<br>Signature of this video is not registered yet.<br>Please see 'Detectable recording device' and 'Detectable editing tool' in Home.");
            $('#print').show();

            analSpin.stop();

          }
          else {
            if (num == 0) {
              analSpin.stop(); App.rprint(time, name, printresult, e, num)
            }
            if (num == 1) {
              /*App.deposit2("0.1").then(function () {
                spinner.stop();
              })*/
              console.log('aaa')
              App.deposit2("0.5").then(
                res => { console.log('bbb'); analSpin.stop(); App.rprint(time, name, printresult, e, num) }
              )

            }
            if (num == 2) {
              App.process(1).then(res => {
                console.log(res);

                App.singleRegi(result, res, name, "1", time).then(
                  res => { console.log('ccc'); analSpin.stop(); App.rprint(time, name, printresult, e, num) }
                )
              });
            }
            if (num == 3) {
              App.process(1).then(res => {
                console.log(res);

                App.singleRegi(result, res, name, "0", time).then(
                  res => { console.log('c333'); analSpin.stop(); App.rprint(time, name, printresult, e, num) }
                )
              });
            }


          }
          $('#print').show();
        });
      }

      //**** mp4 일때 *****
      else if (i != -1) {
        console.log('md');
        // App.process();
        var moovIndex = s.indexOf("moov");
        var mdatIndex = s.indexOf('mdat');


        // moov먼저나올 때
        if (moovIndex < mdatIndex) {
          var t = r.slice(0, (mdatIndex + 4));
          var buffer = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');

          t = r.slice(mdatIndex - 4, mdatIndex);
          var b = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
          var free = mdatIndex - 4 + parseInt(b.toString(16), 16) + 4;
          t = r.slice(free, free + 4);

          var fr = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
          count = (fr.match(/66726565/g) || []).length;
          if (count == 1) {
            t = r.slice(free - 4, size);
            buffer += Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            console.log('free');
          }

          console.log('moov');
        }
        // moov가 뒤에 나올 때
        else {
          var mdatLastIndex = s.lastIndexOf('mdat');
          var t = r.slice(0, mdatIndex + 4);
          buffer = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');

          var count = 0
          var countAll = 0;
          var middle = 0;

          if (mdatLastIndex > mdatIndex) {
            t = r.slice(mdatLastIndex, mdatLastIndex + 4);
            var md = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            count = (md.match(/6d646174/g) || []).length;


            t = r.slice(mdatIndex - 4, mdatIndex);
            var b = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            middle = mdatIndex - 4 + parseInt(b.toString(16), 16) + 4;
            t = r.slice(middle, mdatLastIndex - 4);

            var bufferMiddle = Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            countAll = (bufferMiddle.match(/6d646174/g) || []).length;
          }
          //mdat 3개
          if (countAll >= 1) {
            console.log('mdat 3개');
            $('#print').empty();

          }
          // mdat 2개일 때
          else if (count == 1 && middle <= mdatLastIndex) {
            t = r.slice(mdatLastIndex - 4, size);
            buffer += Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            console.log('mdat 2개');
          }
          // mdat 1개일 때
          else {
            t = r.slice(moovIndex - 4, size);
            buffer += Array.prototype.map.call(new Uint8Array(t), x => ('00' + x.toString(16)).slice(-2)).join('');
            console.log('mdat 1개');
          }
        }


        this.Analysis(buffer).then(function (e) {
          console.log('Analysis')
          if (e[0] == 'error') {
            analSpin.stop();
            alert("error : video's header content length is too large.");

            return;
          }
          var tim = new Date();
          var time = tim.toString();

          // alert(e[0][0]);
          console.log(e[1])
          result = e[0].slice(0, e[1]);
          $('#print').empty();
          $('#transaction').empty();
          //  $('#print').append(e[0]);
          if (e[1] == 0) {
            $('#print').append("<p style='color:blue; font-weight:bold; font-size:17px;'>Unknown!</p><br>");
            $('#print').append("KLAY is not paid. <br>")
            $('#print').append("<br>Signature of this video is not registered yet.<br>Please see 'Detectable recording device' and 'Detectable editing tool' in Home.");
            $('#print').show();

            analSpin.stop();

          }
          else {
            if (num == 0) {
              analSpin.stop(); App.rprint(time, name, printresult, e, num)
            }
            if (num == 1) {
              /*App.deposit2("0.1").then(function () {
                spinner.stop();
              })*/
              console.log('aaa')
              App.deposit2("0.5").then(
                res => { console.log('bbb'); analSpin.stop(); App.rprint(time, name, printresult, e, num) }
              )

            }
            if (num == 2) {
              App.process(1).then(res => {
                console.log(res);

                App.singleRegi(result, res, name, "1", time).then(
                  res => { console.log('ccc'); analSpin.stop(); App.rprint(time, name, printresult, e, num) }
                )
              });
            }
            if (num == 3) {
              App.process(1).then(res => {
                console.log(res);

                App.singleRegi(result, res, name, "0", time).then(
                  res => { console.log('c333'); analSpin.stop(); App.rprint(time, name, printresult, e, num) }
                )
              });
            }
          }
          $('#print').show();
        });
      }
      else {
        $('#print').empty();
        $('#transaction').empty();
        $('#print').append('This file format is not supported.')
        $('#print').show();
        analSpin.stop();
      }
    }
    printresult = "";
  },

  rprint: async function (time, name, printresult, e, num) {
    console.log('ccc');
    if (e[0][0] == "MP4_EDITOR") {
      $('#print').append('<p style="color:red; font-weight:bold; font-size:18px;">Edited!</p><br>')
      printresult += "Edited by ";

      if (e[1] == 2) {
        { $('#print').append('Handled by&nbsp;&nbsp;') }
      }
      else {
        $('#print').append('Handled by one of&nbsp;&nbsp;');
        printresult += "Edited by one of ";
      }
    }
    else if (e[0][0] == "AVI_EDITOR") {
      $('#print').append('<p style="color:red; font-weight:bold; font-size:18px;">Edited!</p><br>');
      printresult += "Edited by ";

      if (e[1] == 2) {
        $('#print').append('Handled by&nbsp;&nbsp;');
      }
      else {
        $('#print').append('Handled by one of&nbsp;&nbsp;');
        printresult += "one of "
      }
    }
    else {
      $('#print').append('<p style="color:red; font-weight:bold; font-size:18px;">Original!</p>')
      if (e[1] == 2) {
        $('#print').append('Made by&nbsp;&nbsp;');
        printresult += "Original by ";
      }
      else {
        $('#print').append('Made by one of&nbsp;&nbsp;');
        printresult += "Original by one of ";
      }
    }

    for (var i = 0; i < e[1]; i += 2) {

      if (e[0][i] == "MP4_EDITOR") {
        if (i == 0) {
          $('#print').append(e[0][i + 1]);
          printresult += e[0][i + 1];
        }
        else {
          $('#print').append(", " + e[0][i + 1]);
          printresult += ", " + e[0][i + 1];
        }
      }
      else if (e[0][i] == "AVI_EDITOR") {
        if (i == 0) {
          $('#print').append(e[0][i + 1]);
          printresult += e[0][i + 1];
        }
        else {
          $('#print').append(", " + e[0][i + 1]);
          printresult += ", " + e[0][i + 1];
        }
      }
      else {
        if (i == 0) {
          $('#print').append(e[0][i + 1]);
          printresult += e[0][i + 1];
        }
        else {
          $('#print').append(", " + e[0][i + 1]);
          printresult += ", " + e[0][i + 1];
        }

      }
    }

    $('#print').append("<br>Analyzed Time : " + time);
    if (num == 2 || num == 3) {
      $('#print').append('<br><br><br><b style="color:red; font-weight:bold; font-size:18px;">Store success in Blockchain!</b><br><br> file name : ' + name + '<br>result : ' + printresult + '<br>stored time : ' + time);
      //: file name, result, file hash, address, stored time
    }
  },

  deposit2: async function (amount) {
    console.log('ddd')

    var spinner = this.showSpinner();
    console.log(amount)
    const walletInstance = this.getWallet();
    if (walletInstance) {
      if (amount > 0) {
        //------------ 지불 -------------------
        const plusMethodData = sigContract.methods.deposit().encodeABI();
        const sender = walletInstance;
        const sender_key = cav.klay.accounts.wallet[0].privateKey;


        const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: walletInstance.address,
          to: '0x819B00E8A7423E6a2Bb1c8C3826D5F10E49B5683', //contract 주소
          data: plusMethodData,
          gas: '20000000',
          value: 0
        }, sender_key);

        // signed raw transaction
        console.log("Raw TX:\n", senderRawTransaction);

        return new Promise((resolve, reject) => {
          // sendd fee delegated transaction with fee payer information
          cav.klay.sendTransaction({
            from: sender.address,
            senderRawTransaction: senderRawTransaction,
            feePayer: cav.klay.accounts.wallet[1].address
          })
            .once('receipt', (receipt) => {
              App.zan();
              console.log(receipt);
              spinner.stop();
              //alert(amount + " KLAY is paid");
              $('#transaction').html(""); //transaction div clear
              $('#transaction')
                .append(`<p><a href= 'https://scope.klaytn.com/tx/${receipt.transactionHash}'
              target='_blank'>Show Transaction</a></p>`);
              resolve('good');
            })
            .once('error', (error) => {
              alert(error.message);
              spinner.stop();
            })
        });
      }
      return;
    }
  },

  zan: async function () {
    $('#ownerAddress').empty();
    var balance = cav.utils.fromPeb(await this.getBalanceOwner(), "KLAY");
    $('#ownerAddress').append('<br>' + '<p>' + 'My account balance:  ' + Math.floor(balance * 100) / 100 + ' KLAY' + '</p>');
  },


  deposit: async function (amount) {
    var spinner = this.showSpinner();
    console.log(amount)
    const walletInstance = this.getWallet();
    if (walletInstance) {
      if (amount > 0) {
        //------------ 지불 -------------------
        const plusMethodData = sigContract.methods.deposit().encodeABI();
        const sender_key = cav.klay.accounts.wallet[0].privateKey;
        var sender = walletInstance;

        const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: walletInstance.address,
          to: '0x819B00E8A7423E6a2Bb1c8C3826D5F10E49B5683', //contract 주소
          data: plusMethodData,
          gas: '20000000',
          value: 0
        }, sender_key);

        // signed raw transaction
        console.log("Raw TX:\n", senderRawTransaction);

        // sendd fee delegated transaction with fee payer information
        cav.klay.sendTransaction({
          from: sender.address,
          senderRawTransaction: senderRawTransaction,
          feePayer: cav.klay.accounts.wallet[1].address
        })
          .once('receipt', (receipt) => {
            App.zan();
            console.log(receipt);
            spinner.stop();
            // alert(amount + " KLAY is paid");
            $('#transaction').html(""); //transaction div clear
            $('#transaction')
              .append(`<p><a href= 'https://scope.klaytn.com/tx/${receipt.transactionHash}'
            target='_blank'>Show Transaction</a></p>`);
          })
          .once('error', (error) => {
            alert(error.message);
            spinner.stop();
          })
      }
      return;

    }
  },

  addeposit: async function () {
    var target = document.getElementById("spinon");
    adSpin = new Spinner(opts).spin(target);
    const walletInstance = this.getWallet();
    var mon;
    let a = this.callContractBalance().then(function (m) {
      mon = m;
    })
    Promise.all([a]).then(function (e) {
      App.addepo(mon, walletInstance);
    })

  },

  addepo: async function (mon, walletInstance) {
    console.log(mon)
    const plusMethodData = sigContract.methods.transfer(mon).encodeABI();

    const sender_key = cav.klay.accounts.wallet[0].privateKey;
    console.log(sender_key);

    var sender = walletInstance;
    
    const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: walletInstance.address,
      to: '0x819B00E8A7423E6a2Bb1c8C3826D5F10E49B5683', //contract 주소
      data: plusMethodData,
      gas: '20000000',
      value: 0
    }, sender_key);

    // signed raw transaction
    console.log("Raw TX:\n", senderRawTransaction);

    // send fee delegated transaction with fee payer information
    cav.klay.sendTransaction({
      from: sender.address,
      senderRawTransaction: senderRawTransaction,
      feePayer: cav.klay.accounts.wallet[1].address
    })
      .once('receipt', (receipt) => {
        App.zan();
        adSpin.stop();
        //alert('success');
      })
      .once('error', (error) => {
        adSpin.stop();
        alert(error.message);
      })
  },

  singleRegi: async function (result, hash, name, amount, time) {

    //var spinner = this.showSpinner();
    // console.log(amount)
    const walletInstance = this.getWallet();
    if (walletInstance) {
      const plusMethodData = sigContract.methods.singleRegi(result, hash, name, time).encodeABI();
      var sender = walletInstance;
      const sender_key =  cav.klay.accounts.wallet[0].privateKey;
    

      const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: walletInstance.address,
        to: '0x819B00E8A7423E6a2Bb1c8C3826D5F10E49B5683', //contract 주소
        data: plusMethodData,
        gas: '20000000',
        value: 0
      }, sender_key);
      return new Promise((resolve, reject) => {
        // signed raw transaction
        console.log("Raw TX:\n", senderRawTransaction);

        // sendd fee delegated transaction with fee payer information
        cav.klay.sendTransaction({
          from: sender.address,
          senderRawTransaction: senderRawTransaction,
          feePayer: cav.klay.accounts.wallet[1].address
        })
          .once('receipt', (receipt) => {
            App.zan();
            console.log(receipt);
            //spinner.stop();
            resolve('good');
            //alert(amount + " KLAY is paid.");

            $('#transaction').html(""); //transaction div clear
            $('#transaction')
              .append(`<p><a href= 'https://scope.klaytn.com/tx/${receipt.transactionHash}'
          target='_blank'>Show Transaction</a></p>`);
          })
          .once('error', (error) => {
            alert(error.message);
            spinner.stop();
          })

      });
    }
  },

  twoRegi: async function (comResult, result1, result2, hash1, hash2, name1, name2, time, amount) {
    var spinner = this.showSpinner();
    // trSpinner = this.showSpinner();
    // console.log(amount)
    const walletInstance = this.getWallet();

    if (walletInstance) {

      const plusMethodData = sigContract.methods.twoRegi(comResult, result1, result2, [hash1, hash2], [name1, name2], time).encodeABI();
      const sender_key = cav.klay.accounts.wallet[0].privateKey;
      var sender = walletInstance;

      const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: walletInstance.address,
        to: '0x819B00E8A7423E6a2Bb1c8C3826D5F10E49B5683', //contract 주소
        data: plusMethodData,
        gas: '20000000',
        value: 0
      }, sender_key);

      // signed raw transaction
      console.log("Raw TX:\n", senderRawTransaction);

      // sendd fee delegated transaction with fee payer information
      cav.klay.sendTransaction({
        from: sender.address,
        senderRawTransaction: senderRawTransaction,
        feePayer: cav.klay.accounts.wallet[1].address
      })
        .once('receipt', (receipt) => {
          App.zan();
          console.log(receipt);
          $('#resultCanvas').hide();
          $('#resultSentence').hide();
          $('#comstoring').hide();

          if (sresult1 == null) {
            sresult1 = 'Unknown';
          }
          if (sresult2 == null) {
            sresult2 = 'Unknown';
          }
          $('#print').empty();
          $('#print').append("<font style='color:red; font-size:18px; font-weight:bold;'>Store success in Blockchain.</font><br>");
          $('#print').append("<br><b style='size:16px; color:blue;'>" + scompareReult + "</b><br>");
          $('#print').append("<br>-------- First Video --------<br>");
          $('#print').append("Result: " + sresult1 + "<br>");
          $('#print').append("Hash of the file: " + shash1 + "<br>");

          $('#print').append("<br>-------- Second Video --------<br>");
          $('#print').append("Result: " + sresult2 + "<br>");
          $('#print').append("Hash of the file: " + shash2 + "<br>");

          $('#print').append("<br>Stored Time: " + time + "<br>");

          spinner.stop();

          //alert(amount + " KLAY is paid.");

          $('#transaction').html(""); //transaction div clear
          $('#transaction')
            .append(`<p><a href= 'https://scope.klaytn.com/tx/${receipt.transactionHash}'
        target='_blank'>Show Transaction</a></p>`);
        })
        .once('error', (error) => {
          alert(error.message);
          console.log("transaction error")
          spinner.stop();
        })

    }
  },
  but_analyze: async function () {
    const walletInstance = this.getWallet();
    if (walletInstance) {
      $('#atext').show();
      $('#btn_compare').hide();
      var btn = document.getElementById('btn_analyze');
      btn.disabled = true;
      btn.style.backgroundColor = 'white';
      $('#br').hide();
      $('#print').empty();
      $('#transaction').empty();
      $('#back').show();
      $('#print_info').empty();
      $('#Compare').hide();
      $('#Analyze').show();
      $('#result').show();
      $('#how').hide();
      $('#btn_how').empty();
      $('#btn_how').append(`<blockquote>` + "<b>[Analyze]</b> : Show the integrity analysis result. (0.5 KLAY)<br><b>[Analyze & Store]</b> " +
        " : Show and store the result in Blockchain. (0.5 KLAY)<br><b>[Search]</b> " +
        " : Search and show the result in Blockchain. (Free)<br>" +
        "<a href='https://www.dropbox.com/s/vj4e3twvhl29jwn/sample1.MOV?dl=0' download> - Original Video Sample </a><br> " +
        "<a href='https://www.dropbox.com/s/k86ih41t0n83elu/sample2.avi?dl=0' download> - Modified Video Sample </a><br> " +
        `</blockquote>`)
      // a href="http://web.hallym.ac.kr/~wanlee/front_ver1.zip"

      document.getElementById("zipFile").value = "";
      $('#hashdiv').hide();
      $('#sub').hide();
    }
    else {
      alert('login first');
    }
  },

  but_compare: async function () {
    const walletInstance = this.getWallet();
    if (walletInstance) {
      var btn1 = document.getElementById('btn_compare');
      btn1.disabled = true;
      btn1.style.backgroundColor = 'white';
      $('#how').hide();
      $('#btn_how').empty();
      $('#btn_how').append(`<blockquote>` +
        "<b>[COMPARE]</b> : Check whether the two files have the same video contents. " +
        "<br><b>[SEARCH] </b>: Search the result stored in Blockchain. (Free)<br>" +
        "<a href='https://www.dropbox.com/s/irfoz12ljnfofx3/sample3.mp4?dl=0'> - Original Video Sample </a><br> " +
        "<a href='http://www.dropbox.com/s/etru5z37xck6ewy/sample4.mp4?dl=0'> - Unoriginal & Modified Video Sample </a><br> " +
        "<a href='https://www.dropbox.com/s/b0bq7c2s2zexhsm/sample5.mp4?dl=0' download> - Unoriginal & Unmodified Video Sample </a><br> " +
        `</blockquote>`);
      $('#btn_analyze').hide();
      $('#br').hide();
      $('#print').empty();
      $('#transaction').empty();
      $('#back').show();
      $('#print_info').empty();
      $('#Analyze').hide();
      $('#Compare').show();
      $('#result').show();

      document.getElementById("zipFile").value = "";
      $('#hashdiv').hide();
      $('#sub').hide();
    }
    else {
      alert('login first');
    }

  },

  back: async function () {
    var btn = document.getElementById('btn_analyze');
    btn.disabled = false;
    btn.style.backgroundColor = '';

    var btn1 = document.getElementById('btn_compare');
    btn1.disabled = false;
    btn1.style.backgroundColor = '';

    $('#btn_analyze').show();
    $('#btn_compare').show();
    $('#br').show();
    $('#print').empty();
    $('#transaction').empty();
    $('#print_info').empty();
    $('#Analyze').hide();
    $('#Compare').hide();

    $('#compareSearch').hide();
    $('#result').hide();
    $('#how').show();
    $('#btn_how').empty();
    $('#resultCanvas').hide();
    $('#resultSentence').hide();
    $('#back').hide();
    $('#comrestore').hide();
    $('#sub').show();

    document.getElementById("input_analyze").value = "";
    document.getElementById("inputFile").value = "";
    document.getElementById("inputFile2").value = "";

  },

  home: async function () {
    var btn = document.getElementById('btn_analyze');
    btn.disabled = false;
    btn.style.backgroundColor = '';

    var btn1 = document.getElementById('btn_compare');
    btn1.disabled = false;
    btn1.style.backgroundColor = '';

    $('#btn_analyze').show();
    $('#btn_compare').show();
    $('#br').show();
    $('#print').empty();
    $('#transaction').empty();
    $('#print_info').empty();
    $('#Analyze').hide();
    $('#Compare').hide();

    $('#compareSearch').hide();
    $('#result').hide();
    $('#how').show();
    $('#btn_how').empty();
    $('#resultCanvas').hide();
    $('#resultSentence').hide();
    $('#back').hide();
    $('#comrestore').hide();
    $('#sub').show();


    $('#backToCompare').hide();


    document.getElementById("input_analyze").value = "";
    document.getElementById("inputFile").value = "";
    document.getElementById("inputFile2").value = "";

  },


  showSpinner: function () {
    //스피너 인스턴스 리턴
    var target = document.getElementById("spin");
    return new Spinner(opts).spin(target);
  },

  handlePassword: async function () {
    this.auth.privateKey = event.target.value;
  },

  handleLogin: async function () {
    if (this.auth.accessType == 'privateKey') {
      try {
        const privateKey = this.auth.privateKey;
        this.integrateWallet(privateKey);
      } catch (e) {
        $('#message').text('privateKey does not match.');
        $('#message1').text('privateKey does not match.');
      }
    }
  },

  integrateWallet: function (privateKey) {
    const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);
    cav.klay.accounts.wallet.add(walletInstance);
    const fee_payer_key = "0x93d501286bc90f2271340a97432801e4406a9b8a7f4ab006f97cd426796668d8"; 
    const fee_payer_address = "0xad7c07eab1e56fbbb976fd5377e5088ec5528cd9";
    const walletInstance2 = cav.klay.accounts.wallet.add(fee_payer_key, fee_payer_address);

    sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));
    sessionStorage.setItem('walletInstance2', JSON.stringify(walletInstance2));
    this.changeUI(walletInstance);
  },

  handleLogout: async function () {
    this.removeWallet();
    location.reload();
  },

  Analysis: async function (buffer) {
    try {
      return await parserContract.methods.compareResult(buffer).call()
    }
    catch (err) {
      //alert(err);
      var e = new Array();
      e[0] = 'error'
      //alert("error : video's header content length is too large. Sorry.");
      return e;
    }
    //return await sigContract.methods.compareResult(buffer).call();

  },
  callOwner: async function () {
    return await sigContract.methods.owner().call();
  },

  callContractBalance: async function () {
    return await sigContract.methods.getBalance().call();
  },

  getBalanceOwner: async function () {
    const walletInstance = this.getWallet();
    return await sigContract.methods.getBalanceOwner(walletInstance.address).call()
  },

  getWallet: function () {
    if (cav.klay.accounts.wallet.length) {
      return cav.klay.accounts.wallet[0];
    }
  },


  displayAllUserData: async function () {

    if (closeData == 0) {
      $('#showList').empty();

      sigContract.methods.displayAllUserData().call().then(
        function (e) {
          console.log(e.length);
          console.log(e.filehash);

          for (var i = 0; i < e.length; i++) {
            $('#showList').append(
              `<ul>
              <li>result: ${e[i].result}</li>
              <li>fileHash: ${e[i].fileHash}</li>
              <li>fileName: ${e[i].fileName}</li>
              <li>userAddress: ${e[i].userAddress}</li>
            </ul><br>`
            );
          }
        });
      closeData = 1;
    }
    else {
      $("#showList").empty();
      closeData = 0;

    }

  },

  displayAllSignatures: async function () {
    if (closeSig == 0) {
      $('#showList').empty();
      
      parserContract.methods.displayAllSignatures().call().then(
        function (e) {
          console.log(e.length);
          console.log(e[0]);

          for (var i = 0; i < e.length; i++) {
            $('#showList').append(
              `<ul>
                  <li>itemType: ${e[i].itemType}</li>
                  <li>itemName: ${e[i].itemName}</li>
                  <li>idSeq: ${e[i].idSeq}</li>
                  <li>checkValue: ${e[i].checkValue}</li>
              </ul>`
            );
          }
        });
      closeSig = 1;
    }
    else {
      $("#showList").empty();
      closeSig = 0;
    }
  },

  videoTypes: async function () {
    if (close1 == 0) {
      $("#videoType").hide();
      $('#videoTypes').show();
      close1 = 1;
      close3 = 0;
    }
    else {
      $("#videoTypes").hide();
      close1 = 0;
    }
  },

  videoType: async function () {
    if (close3 == 0) {
      $("#videoTypes").hide();
      close1 = 0;
      $('#videoType').show();
      close3 = 1;
    }
    else {
      $("#videoType").hide();
      close3 = 0;
    }
  },

  zippingCode: async function () {
    if (document.getElementById("zipFile").value == "") {
      alert('Please put the file.');
    }
    else {
      var spinner = this.showSpinner();
      var hashresult;
      $('#resulthash').empty();
      $('#ourhash').empty();
      $('#showhash').empty();
      $('#hashdiv').hide();

      if (document.getElementById("zipFile").value == "") {
        alert('Please put the file.');
      }
      else {


        App.frontShow().then(
          res => {
            hashresult = res;
            App.getMD5(
              document.getElementById("zipFile").files[0],
            ).then(
              res => {
                console.log(res);
                $('#showhash').append("Received hash from Blockchain : " + res);
                if (res == hashresult) {
                  $('#resulthash').append('<b>Result : Same hash code!</b>')
                }
                else {
                  $('#resulthash').append('<b>Result : Different hash code!</b>')
                }

                spinner.stop();
                $('#hashdiv').show();
              },

            );
          }

        )

      }
    }
  },

  zippingCodeAdmin: async function () {
    if (adZipClo == 0) {
      var target = document.getElementById("spinon");
      var spinner = new Spinner(opts).spin(target);
      const walletInstance = this.getWallet();

      if (document.getElementById("zipFile2").value == "") {
        alert('Please put the file.');
      }
      else {
        App.getMD5(
          document.getElementById("zipFile2").files[0],
        ).then(
          async res => {
            console.log(res);
            var a = new Date();
            var time = a.toString();

            const plusMethodData = frontContract.methods.setFrontHash(res, time).encodeABI();
            const sender_key = cav.klay.accounts.wallet[0].privateKey;
            console.log(sender_key);

            var sender = walletInstance;


            const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
              type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
              from: walletInstance.address,
              to: '0xf2904c942cA3A426413bDD16C9054C5b17cE71D0', //contract 주소
              data: plusMethodData,
              gas: '20000000',
              value: 0
            }, sender_key);

            // signed raw transaction
            console.log("Raw TX:\n", senderRawTransaction);

            // sendd fee delegated transaction with fee payer information
            cav.klay.sendTransaction({
              from: sender.address,
              senderRawTransaction: senderRawTransaction,
              feePayer: cav.klay.accounts.wallet[1].address
            })
              .then(function (e) {
                console.log(time)
                $('#adFrontZip').empty();
                // $('#showList').empty();
                $('#adFrontZip').append("<b style='color:blue; font-size:16px;'>Store success in Blockchain!</b><br><br>");
                $('#adFrontZip').append("<b>Store time : </b>" + time);
                $('#adFrontZip').append("<br><b>Source code hash : </b>" + res + "<br><br>");
                spinner.stop();
                adZipClo = 1;
              })
          },
          err => {
            console.error(err); spinner.stop(); adZipClo = 1;
          }
        );
      }

    }
    else {
      $('#adFrontZip').empty();
      adZipClo = 0;
    }

  },


  frontShow: async function () {

    $("#ourhash").empty();
    return new Promise((resolve, reject) => {
      this.getAddress()
        .then(function (e) {
          $("#ourhash").append("Stored time: " + e[1] + "<br>Calculated hash of this zip file &nbsp; : " + e[0]);
          $("#ourhash").show();
          console.log(e[0])
          resolve(e[0]);
        });
    });

  },

  getAddress: async function () {
    return frontContract.methods.getFrontHash().call();
  },

  getResult: async function (fileHash, user) {
    return await sigContract.methods.getResult(fileHash, user).call();
  },

  searchResult: async function () {
    if (document.getElementById("input_analyze").value == "") {
      alert('Please put the video');
    }
    else {
      var spinner = this.showSpinner();
      var analyzeHash;
      const walletInstance = this.getWallet();
      var address = walletInstance.address;
      console.log(address)
      $('#transaction').empty();
      App.process(1).then(res => {
        analyzeHash = res; console.log(analyzeHash);
        this.getResult(analyzeHash, address).then(function (e) {
          $("#print").empty();
          //console.log(e[0][0][1])
          if (e[0].length == 0) {
            $('#print').append("No results saved.");
            $('#print').show();
            spinner.stop();
          }
          else {
            $('#print').append("<b style='font-size:17px;'> Matched video in Blockchain. </b><br>");

            $('#print').append(" <b>hash : " + e[0][0][1] + "</b><br><br>");
            for (var i = 0; i < e[0].length; i++) {
              //console.log(e[0][1][0].length);

              $('#print').append('<font size = 3px><b>' + (i + 1) + ".&nbsp;&nbsp;&nbsp;&nbsp;File name :</b>" + e[0][i][2] + '</font>' + "<br>");

              if (e[0][i][0].length == 0) {
                $('#print').append("<b><font size = 3px>Unknown</font></b>" + `<br>`);
              }
              else if ((e[0][i][0][0] == "AVI_EDITOR") || (e[0][i][0][0] == "MP4_EDITOR")) {
                $('#print').append('<font size = 3px><b>Result : </b><b style="color:red;">Edited </b></font>');
              }
              else {
                $('#print').append('<font size = 3px><b>Result : </b><b style="color:red; ">Original </b></font>');
              }
              if (((e[0][i][0][0] == "AVI_EDITOR") && (e[0][i][0].length == 2)) || ((e[0][i][0][0] == "MP4_EDITOR") && (e[0][i][0].length == 2))) {
                $('#print').append('<b><font size = 3px>by&nbsp;&nbsp;</font></b>');
              }
              else if (((e[0][i][0][0] == "AVI_EDITOR") && (e[0][i][0].length > 2)) || ((e[0][i][0][0] == "MP4_EDITOR") && (e[0][i][0].length > 2))) {
                $('#print').append('<b><font size = 3px>by one of&nbsp;&nbsp;</font></b>');
              }
              else if (e[0][i][0].length != 0) {
                if (e[0][i][0].length == 2) {
                  $('#print').append('<b><font size = 3px>made by&nbsp;&nbsp;</font></b>');
                }
                else {
                  $('#print').append('<b><font size = 3px>made by one of &nbsp;&nbsp;</font></b>');
                }
              }
              for (var j = 0; j < e[0][i][0].length; j += 2) {

                if (e[0][i][0][j] == "AVI_EDITOR") {
                  if (j == 0) {
                    $('#print').append("<font size = 3px>" + e[0][i][0][j + 1] + "</font>");
                  }
                  else {
                    $('#print').append("<font size = 3px>, " + e[0][i][0][j + 1] + "</font>");
                  }
                }
                else if (e[0][i][0][j] == "MP4_EDITOR") {
                  if (j == 0) {
                    $('#print').append("<font size = 3px>" + e[0][i][0][j + 1] + "</font>");
                  }
                  else {
                    $('#print').append("<font size = 3px>, " + e[0][i][0][j + 1] + "</font>");
                  }
                }
                else {
                  if (j == 0) {
                    $('#print').append("<font size = 3px>" + e[0][i][0][j + 1] + "</font>");
                  }
                  else {
                    $('#print').append("<font size = 3px>, " + e[0][i][0][j + 1] + "</font>");
                  }
                }
              }
              $('#print').append("<br><b><font size = 3px>Stored Time : </b>" + e[0][i][3] + "</font>");
              $('#print').append(`<br><br>`)
            }

            $('#print').show();
            spinner.stop();
          }

        });

      },
        //err=> {alert(err);spinner.stop()}
      );
    }
  },

  but_compareSearchStart: async function () {
    if (document.getElementById("inputFile_search").value == "") {
      alert('Please put the video');
    }
    else {
      var spinner = this.showSpinner();
      var comHash;
      const walletInstance = this.getWallet();
      var address = walletInstance.address;

      App.getMD5(
        document.getElementById("inputFile_search").files[0],
      ).then(res => {
        comHash = res; console.log(comHash);
        this.getResult(comHash, address).then(function (e) {
          $("#print").empty();
          //console.log(e[1])


          if (e[1].length == 0) {
            $('#print').append("<b style='color: blue; font-size:18px;' >There are no results saved.</b>");
            $('#print').show();
            spinner.stop();
          }
          else {

            for (var i = 0; i < e[1].length; i++) {


              $('#print').append("<b style='position:absolute; left:150px; font-size:18px;'>" + (i + 1) + ". </b>");
              $('#print').append("<font style='color:red; font-weight:bold; font-size:20px;'>" + e[1][i][2] + "</font><br>");

              $('#print').append("<br>-------- First Video --------<br>");
              // $('#print').append("Result:  ");

              if (e[1][i][0][0].length == 0) {
                $('#print').append("<b style='color: blue'>Unknown!</b>" + `<br>`);
              }

              else if (e[1][i][0][0].length == 2) {//후보 없이 확실할때

                if (e[1][i][0][0][0] == "MP4_EDITOR") {
                  $('#print').append("<b style='color: blue'>Edited</b>" + " by " + e[1][i][0][0][1] + `<br>`);
                }
                else {
                  $('#print').append("<b style='color: blue'>Original</b> made by " + e[1][i][0][0][1] + `<br>`);
                }

              }

              else { //후보가 여러개일 때

                if (e[1][i][0][0][0] == "MP4_EDITOR") {
                  $('#print').append("<b style='color: blue'>Edited</b>" + " by one of &nbsp;&nbsp;");
                  for (var k = 0; k < e[1][i][0][0].length; k += 2) {

                    if (k == 0) {
                      $('#print').append(e[1][i][0][0][k + 1]);
                    }
                    else {
                      $('#print').append(", " + e[1][i][0][0][k + 1] + "<br>");
                    }
                  }
                }

                else {
                  $('#print').append("<b style='color: blue'>Original</b>" + " made by one of &nbsp;&nbsp;");
                  for (var k = 0; k < e[1][i][0][0].length; k += 2) {

                    if (k == 0) {
                      $('#print').append(e[1][i][0][0][k + 1]);
                    }
                    else {
                      $('#print').append(", " + e[1][i][0][0][k + 1] + "<br>");
                    }
                  }
                }
              }



              $('#print').append("File Name  : " + e[1][i][0][2] + `<br>`);
              $('#print').append(`<br><br>`);

              $('#print').append("-------- Second Video --------<br>");


              // $('#print').append("Result:  ");

              //2번째 파일
              if (e[1][i][1][0].length == 0) {
                $('#print').append("<b style='color: blue'>Unknown!</b><b>" + `<br>`);
              }

              else if (e[1][i][1][0].length == 2) {//후보 없이 확실할때

                if (e[1][i][1][0][0] == "MP4_EDITOR") {
                  $('#print').append("<b style='color: blue'>Edited</b>" + " by " + e[1][i][1][0][1] + `<br>`);
                }
                else {
                  $('#print').append("<b style='color: blue'>Original</b> made by " + e[1][i][1][0][1] + `<br>`);
                }

              }

              else { //후보가 여러개일 때

                if (e[1][i][1][0][0] == "MP4_EDITOR") {
                  $('#print').append("<b style='color: blue'>Edited</b> " + " by one of &nbsp;&nbsp;");
                  for (var k = 0; k < e[1][i][1][0].length; k += 2) {

                    if (k == 0) {
                      $('#print').append(e[1][i][1][0][k + 1]);
                    }
                    else {
                      $('#print').append(", " + e[1][i][1][0][k + 1] + "<br>");
                    }
                  }
                }

                else {
                  $('#print').append("<b style='color: blue'>Original</b> " + " made by one of &nbsp;&nbsp;");
                  for (var k = 0; k < e[1][i][1][0].length; k += 2) {

                    if (k == 0) {
                      $('#print').append(e[1][i][1][0][k + 1]);
                    }
                    else {
                      $('#print').append(", " + e[1][i][1][0][k + 1] + "<br>");
                    }
                  }
                }
              }

              $('#print').append("File Name  : " + e[1][i][1][2] + `<br>`);

              $('#print').append(`<br>`);

              $('#print').append("Stored time : " + e[1][i][1][3])
              $('#print').append(`<br><br><br><br>`);

            }

            $('#print').show();
            spinner.stop();
          }

        });

      });
    }
  },


  but_compareSearch: async function () {
    document.getElementById("inputFile").value = "";
    document.getElementById("inputFile2").value = "";
    $('#Compare').hide();
    $('#compareSearch').show();
    $('#back').hide();
    $('#backToCompare').show();
    $('#print').empty();
    $("#resultSentence").empty();
    $("#comrestore").hide();
    $('#transaction').empty();
    $("#resultCanvas").hide();
  },

  backtoCompare: async function () {
    $('#print').empty();
    $('#backToCompare').hide();
    $('#back').show();
    $('#compareSearch').hide();
    $('#Compare').show();
    $('#resultCanvas').hide();

    document.getElementById("inputFile_search").value = "";
  },

  reset: function () {
    this.auth = {
      keystore: '',
      password: ''
    };
  },

  changeUI: async function (walletInstance) {
    $('#loginModal').modal('hide');
    $('#adad').modal('hide');
    //$('#loginADModal').modal('hide');

    var balance = cav.utils.fromPeb(await this.getBalanceOwner(), "KLAY")

    $('#print').hide();
    $('#ownerAddress').append('<br>' + '<p>' + 'My account balance:  ' + Math.floor(balance * 100) / 100 + ' KLAY' + '</p>');

    var ad2 = await this.callOwner();
    var ad = walletInstance.address;
    console.log(ad);
    console.log(ad2);

    if (ad2.toLowerCase() === walletInstance.address) {

      $('#all').hide();
      $('#howto').hide();
      $('#owner').show();
      $('#ad').hide();
      $('#adlogout').show();

      $('#login').hide();
      $('#logout').hide();

      $('#home').hide();

    }
    else {
      $('#login').hide();
      $('#logout').show();

      $('#ad').hide();
      $('#adlogout').hide();
    }
  },


  frontHashArea: async function () {
    if (close2 == 0) {
      console.log('a')
      $('#frontHashArea').show();
      App.frontShow();
      close2 = 1;
    }
    else {
      $('#frontHashArea').hide();
      close2 = 0;
    }





  },

  removeWallet: function () {
    cav.klay.accounts.wallet.clear();
    sessionStorage.removeItem('walletInstance');
    sessionStorage.removeItem('walletInstance2');
    this.reset();
  },


  //해시(hash)시작
  process: async function (n) {
    return new Promise((resolve, reject) => {
      if (n == 1) {
        App.getMD5(
          document.getElementById("input_analyze").files[0],
        ).then(
          res => { resolve(res) },
          err => console.error(err)
        );
      } else if (n == 2) {
        App.getMD5(
          document.getElementById("inputFile").files[0],
        ).then(
          res => { resolve(res) },
          err => console.error(err)
        );
      } else if (n == 3) {
        App.getMD5(
          document.getElementById("inputFile2").files[0],
        ).then(
          res => { resolve(res) },
          err => console.error(err)
        );
      }
    });

  },

  readChunked: async function (file, chunkCallback, endCallback) {
    var fileSize = file.size;
    var chunkSize = 5 * 1024 * 1024; // 4MB
    var offset = 0;

    var reader = new FileReader();
    reader.onload = function () {
      if (reader.error) {
        endCallback(reader.error || {});
        return;
      }
      offset += reader.result.length;
      // callback for handling read chunk
      // TODO: handle errors
      chunkCallback(reader.result, offset, fileSize);
      if (offset >= fileSize) {
        endCallback(null);
        return;
      }
      readNext();
    };

    reader.onerror = function (err) {
      endCallback(err || {});
    },
      readNext();
    function readNext() {
      var fileSlice = file.slice(offset, offset + chunkSize);
      reader.readAsBinaryString(fileSlice);
    }



  },



  getMD5: async function (blob, cbProgress) {
    return new Promise((resolve, reject) => {
      var md5 = CryptoJS.algo.MD5.create();
      App.readChunked(blob, (chunk, offs, total) => {
        md5.update(CryptoJS.enc.Latin1.parse(chunk));
        if (cbProgress) {
          cbProgress(offs / total);
        }
      }, err => {
        if (err) {
          reject(err);
        } else {
          // TODO: Handle errors
          var hash = md5.finalize();
          var hashHex = hash.toString(CryptoJS.enc.Hex);
          resolve(hashHex);
        }
      });
    });
  }

};

window.App = App;

//페이지가 로드될때 제일먼저 앱 상수 안에 있는 start함수를 실행시킨다.
window.addEventListener("load", function () {
  App.start();
});

var opts = {
  lines: 10, // The number of lines to draw
  length: 30, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#5bc0de', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};