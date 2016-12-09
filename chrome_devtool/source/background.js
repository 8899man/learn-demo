/* 绝密 TOP SECRET, COPYRIGHT © AFMOBI GROUP */

// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.executeScript({
//         file: 'jquery.min.js'
//     });
//     chrome.tabs.executeScript({
//         file: 'getContacts5.js'
//     });
// });
// 
// 

$.ajax({
	type: "POST",
	url: "http://gd1.palmchat.im/whatsapp/get/url/",
	data: "size=1",
	success: function(data){
		console.log(data);
	}
});
