
var request = require('request');

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }
    value = {};
    return new Promise(function(resolve,reject){
          request.get({"url": url, "qs": invocationParameters}, function(err, res, body) {
    			   checkResult.resultStatus = res.statusCode;
             checkResult.statusTestPassed = (res.statusCode == expectedResultStatus);
             checkResult.resultData = res.body;
             checkResult.resultDataAsExpected = compareResults(expectedResultData, res.body);
             resolve(checkResult);
		      });
    });
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check
