//代码重构
//使用inter循环，配套stopTask1,10条链接22M

var linksArray = new Array();
//提示信息
var info = '';

//数据源链接
var url = '';
//存放电话号码的数组
// var numberArray = new Array();

//递归定时器
var t_interval = null;

//取链接
var getLinks = function(){
	var ajaxTimeout = $.ajax({
		type: "POST",
		url: "http://120.27.42.144/whatsapp/get/url/",
		data: {
			"size": 20,
			"status": status
		},
		dataType: 'json',
		timeout: 5000,
		success: function(data){
			if(data.code === '0') {
				linksArray = linksArray.concat(data.urls);						
			} else {
				info = '链接已取完';
				$('div.pane.pane-two').append('<span style="color:red;font-weight:bold;">' + info + '</span>');				
			}		
		},
		error: function(XMLHttpRequest,textStatus){	
			info = textStatus + '取链接时服务器错误，请检查服务器';
			$('div.pane.pane-two').append('<span style="color:red;font-weight:bold;">' + info + '</span>');	
		},
		complete: function(XMLHttpRequest,textStatus){
			if(textStatus == 'timeout'){
				ajaxTimeout.abort();
				info = '当前这次请求超时';
				$('div.pane.pane-two').append('<span style="color:red;font-weight:bold;">' + info + '</span>');	
			}
		}
	});
};

var getNum = function() {
	var phone = {
		phones: [],
		tag: ''
	};
	if(linksArray.length < 2){getLinks();}
	url = linksArray.shift();
	if(url == null || url == '' || url === undefined) {
		clearInterval(t_interval);
		return;
	}
	console.log('群链接剩余：' + linksArray.length);
	$('div.pane.pane-two').append('<a id="mytarget" href="' + url + '" target="_blank">' + url + '</a>');	
	console.log('本次群链接是：' + $('#mytarget')[0].innerHTML);
	$('#mytarget').get(0).click();

	var k = setTimeout(function(){
		phone.tag = $('.popup-container span.metadata-title').html();
		$.each($('.popup-container .participants-container .participant-text'),function(){
			phone.phones.push($(this).get(0).innerHTML);
		});
		$('.popup-container .popup-controls .btn-plain:first-child').click();
		$('#mytarget').remove();
		console.log('本次群名称是：' + phone.tag + '---号码总数：' + phone.phones.length);

		$.ajax({
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			url: 'http://120.27.42.144/whatsapp/upload/phone/',
			data: JSON.stringify(phone),
			// data: '{"phones":[' + numberArray +'],"tag":"' + groupName + '","admin_phone":"' + admin_phone + '","g_url":"' +  url + '"}',
			dataType: 'json',
			// timeout: 8000,
			success: function(){},
			error: function(XMLHttpRequest,textStatus){},
			complete: function(XMLHttpRequest,textStatus){
				console.log('上传电话号码状态：' + textStatus);
				phone = {};
			}
		});
		clearTimeout(k);
	},8000);
};

var start = function(){  //定时处理
	//jquery的html()函数，不是基于innerHTML实现的
	$('div.pane.pane-two').get(0).innerHTML = '';	
	getLinks();


	
	t_interval = window.setInterval(getNum,12000);

	// setTimeout(function(){
	// 	window.location.reload();
	// },60000);

};

start();

