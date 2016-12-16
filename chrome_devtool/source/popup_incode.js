var extension;
// 关闭菜单
function closePopup(){
 window.close();
}
// 打开选项页
function openOptions(){
 closePopup();
 window.open('chrome-extension://cnihlhefojebepdflppnooehncmbcgjm/options.html');
}

$(function(){
	$('#btn-start').show();
	$('#btn-start').click(function(){
		chrome.tabs.executeScript({
		  file: 'jquery.min.js'
		});
		chrome.tabs.executeScript({
		  file: 'task_arrayincode.js'
		});
	 
	});
	$('#btn-stop').click(function(){
	  chrome.tabs.executeScript({
	    file: 'stopTask2.js'
	  });
	  closePopup();
	});

	$('#options').click(openOptions);
});


    