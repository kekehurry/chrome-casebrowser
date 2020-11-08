function download(url,filename){
  chrome.downloads.download({
    url:url,
    filename:filename
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
    else
      sendResponse({}); // snub them.
  });
