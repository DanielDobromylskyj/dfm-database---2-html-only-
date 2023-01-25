// How to inject into Numeric input
//let input = document.querySelector("#numeric-answer-1");
//input.value = "Data";

function callBackgroundFunction(functionName, args, callback) {
    chrome.runtime.sendMessage({
        type: "callFunction",
        functionName: functionName,
        args: args
    }, callback);
}



console.log("Requesting Data...");

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://dfmserver.mooo.com:2023/request", true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
    // Inject Code blah blah blah
    
    var response = xhr.responseText;
    var jsonResponse = JSON.parse(response);

    document.getElementById("response").innerHTML = "<p>" + jsonResponse.data + "</p>";









  }
}
// Fetch Data

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var websiteUrl = tabs[0].url;

        chrome.tabs.executeScript({
            code: 'document.getElementsByClassName("current")[0].id;'
        }, function(result) {
                    let POST_DATA = {
            id: websiteUrl,
            num: result[0],
        };

        xhr.send(JSON.stringify(POST_DATA));
        });

    });
