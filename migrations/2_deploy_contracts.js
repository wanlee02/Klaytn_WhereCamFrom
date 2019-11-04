const fs = require('fs')

const FrontHash = artifacts.require('./frontHashDB.sol')
const Signature = artifacts.require('./signatureDB.sol')
// const Signature = artifacts.require('./mp4Analysis.sol')
// const Signature = artifacts.require('./mp4InitData5.sol')

// const Signature = artifacts.require('./aviInitData3.sol')
// const Signature = artifacts.require('./aviAnalysis.sol')
// const LibraryString = artifacts.require('./strings.sol')
// const LibraryBytes = artifacts.require('./bytesUtil.sol')
// const LibraryInt = artifacts.require('./intUtil.sol')

module.exports = function (deployer) {
    // deployer.deploy(LibraryString)
    // deployer.link(LibraryString, Signature)
    // deployer.deploy(LibraryBytes)
    // deployer.link(LibraryBytes, Signature)
    // deployer.deploy(LibraryInt)
    // deployer.link(LibraryInt, Signature)
  
    deployer.deploy(Signature)
    .then(() => {
        if (Signature._json) {
            fs.writeFile('deployedABI', JSON.stringify(Signature._json.abi),
                (err) => {
                    if(err) throw err;
                    console.log("파일에 ABI 입력 성공"); 
                }
            )
            fs.writeFile('deployedAddress', Signature.address,
                (err) => {
                    if(err) throw err;
                    console.log("파일에 주소 입력 성공");
                }
            )
        }
    })

    deployer.deploy(FrontHash)
    .then(() => {
        if (FrontHash._json) {
            fs.writeFile('deployedFrontABI', JSON.stringify(FrontHash._json.abi),
                (err) => {
                    if(err) throw err;
                    console.log("파일에 ABI 입력 성공"); 
                }
            )
            fs.writeFile('deployedFrontAddress', FrontHash.address,
                (err) => {
                    if(err) throw err;
                    console.log("파일에 주소 입력 성공");
                }
            )
        }
    })
 
}
