function download(url,filename){
  chrome.downloads.download({
    url:url,
    filename:filename
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  download(request.url,request.filename);
  });
