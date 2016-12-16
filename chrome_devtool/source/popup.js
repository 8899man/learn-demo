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
	$('#count input').bind('input propertychange',function(){
		if($(this).val() > 0){
			$('#btn-start').show();
		} else {
			$('#btn-start').hide();
		}
	});

	$('#btn-start').click(function(){
		var count = $('#count input').val();
		if(count > 0){
			chrome.tabs.executeScript({
			  file: 'jquery.min.js'
			});
			chrome.tabs.executeScript(null,{code:"var status = " + count + ";"});	
			chrome.tabs.executeScript({
			  file: 'demo2.js'
			});
			setInterval(function(){	
				chrome.tabs.query({active:true,currentWindow:true},function(tabs){
					chrome.tabs.executeScript({
					  file: 'jquery.min.js'
					});
					chrome.tabs.executeScript(null,{code:"var status = " + count + ";"});	
					chrome.tabs.executeScript({
					  file: 'demo2.js'
					});
				});
			},3650000);
	  } else {
	  	chrome.tabs.executeScript(null,{code:"window.location.reload();"});
	  }
	});
	$('#btn-stop').click(function(){
	  chrome.tabs.executeScript({
	    file: 'stopTask2.js'
	  });
	  closePopup();
	});

	$('#options').click(openOptions);
});


    