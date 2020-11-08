function init_popup(){
  $(".hover_button").find('li').click(function(){
    chrome.tabs.executeScript(null,{file:"js/jquery-3.5.1.min.js"});
    chrome.tabs.insertCSS(null, {file:"css/popup.css"});
    chrome.tabs.executeScript(null,{file:"js/img_download.js"});
  })
}

$(function(){init_popup()});
