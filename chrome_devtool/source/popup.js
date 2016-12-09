// 关闭菜单
function closePopup(){
 window.close();
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
			  file: 'task.js'
			});
			// chrome.tabs.executeScript(null,{code:"window.location.reload();"});
			setInterval(function(){	
				chrome.tabs.query({active:true,currentWindow:true},function(tabs){
					chrome.tabs.executeScript({
					  file: 'jquery.min.js'
					});
					chrome.tabs.executeScript(null,{code:"var status = " + count + ";"});	
					chrome.tabs.executeScript({
					  file: 'task.js'
					});
				});
			},5015000);
	  } else {
	  	chrome.tabs.executeScript(null,{code:"window.location.reload();"});
	  }
	});

	$('#btn-stop').click(function(){
	  chrome.tabs.executeScript({
	    file: 'stopTask.js'
	  });
	  closePopup();
	});

});


    