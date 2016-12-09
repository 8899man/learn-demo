// 使用setInterval
// 使用全局变量

var linksArray = new Array();
//数据源链接
var url = '';
//包装每一条链接
var urlToNode = '';
//提示信息
var info = '';
//提示信息添加到页面用于友好提示
var infoToNode = '';

//暂存单个的电话号码
var number = '';
//存放电话号码的数组
var numberArray = new Array();
//群名称
var groupName = '';

//递归定时器
var t = null;
//取链接超时标志
var ajaxTimeout = null;
//内部setTimeout标记
var k = null;

var getNum = function() {

	clearTimeout(t);

	if(linksArray.length < 2) {
		ajaxTimeout = $.ajax({
			type: "POST",
			url: "http://115.28.56.197/whatsapp/get/url/",
			data: {
				"size": 50,
				"status": status
			},
			dataType: 'json',
			timeout: 6000,
			async: false,
			success: function(data){
				if(data.code === '0') {
					linksArray = linksArray.concat(data.urls);						
				} else {
					info = '链接已取完';
					infoToNode = '<div class="msg"><div class="message message-chat"><div class="bubble bubble-text"><div class="message-text"><span class="emojitext selectable-text" style="color:red;font-weight:bold;">' + info + '</span></div></div></div></div>';
					$('#main .pane-body .message-list').append(infoToNode);	
					console.log('链接已取完');			
				}		
			},
			error: function(XMLHttpRequest,textStatus){	
				console.log(textStatus + '取链接服务器错误');
				info = '取链接时服务器错误，请检查服务器';
				infoToNode = '<div class="msg"><div class="message message-chat"><div class="bubble bubble-text"><div class="message-text"><span class="emojitext selectable-text" style="color:red;font-weight:bold;">' + info + '</span></div></div></div></div>';
				$('#main .pane-body .message-list').append(infoToNode);	
			},
			complete: function(XMLHttpRequest,textStatus){
				if(textStatus == 'timeout'){
					ajaxTimeout.abort();
					info = '当前这次请求超时';
					infoToNode = '<div class="msg"><div class="message message-chat"><div class="bubble bubble-text"><div class="message-text"><span class="emojitext selectable-text" style="color:red;font-weight:bold;">' + info + '</span></div></div></div></div>';
					$('#main .pane-body .message-list').append(infoToNode);	
					console.log('当前这次请求链接超时');
				}
			}
		});
	}

	url = linksArray.shift();
	if(url == null || url == '' || url === undefined) {
		// clearTimeout(t);
		// clearInterval(t);
		return;
	}
	console.log('群链接剩余：' + linksArray.length);
	urlToNode = '<div class="msg"><div class="message message-chat"><div class="bubble bubble-text"><div class="message-text"><span class="emojitext selectable-text"><a class="selectable-text" id="mytarget" href="' + url + '" rel="noopener noreferrer" target="_blank">' + url + '</a></span></div></div></div></div>';
	$('#main .pane-body .message-list').append(urlToNode);	
	console.log('本次群链接是：' + $('#mytarget').html());
	$('#mytarget')[0].click();

	k = setTimeout(function(){
		groupName = $('.popup-container .popup-body .metadata-container .metadata-text span.metadata-title').html();
		$.each($('.popup-container .popup-body .participants-container .participant-wrapper'),function(){
			number = $(this).find('.participant-text').html();
			numberArray.push('"' + number + '"');
		});
		$('.popup-container .popup-controls .btn-plain:first-child').click();
		$('#mytarget').closest('.msg').remove();
		console.log('本次群名称是：' + groupName);
		console.log('这条链接获取的电话号码总数：' + numberArray.length);

		$.ajax({
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			url: 'http://115.28.56.197/whatsapp/upload/phone/',
			data: '{"phones":[' + numberArray +'],"tag":"' + groupName + '"}',
			dataType: 'json',
			timeout: 8000,
			success: function(data){
				if(data.code === 0){
					console.log('当前群数据上传服务器成功！');
					console.log('++++++++++++++++++++++++++');
				}
			},
			error: function(XMLHttpRequest,textStatus){
				console.log(textStatus + '上传群数据服务器错误');
			},
			complete: function(XMLHttpRequest,textStatus){
				numberArray = [];
			}
		});

		clearTimeout(k);

	},8000);

	t = setTimeout(getNum,10000);

}
getNum();

