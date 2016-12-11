//代码重构
//使用timeout循环，配套stopTask2,

var linksArray = new Array();
//提示信息
var info = '';
//数据源链接
var url = '';
//递归定时器
var t_timeout = null;
//已取链接计数器
var count = 0;
//每次取链接条数
var num = 1;
//请求地址
var request_url = 'http://10.2.227.118:3000/';


//取链接
var getLinks = function(){
	var ajaxTimeout = $.ajax({
		type: 'POST',
		url: request_url + 'whatsapp/get/url/',
		data: {
			"size": num,
			"status": status
		},
		dataType: 'json',
		timeout: 5000,
		success: function(data){
			if(data.code === 0) {
				linksArray = linksArray.concat(data.urls);
				count += num;
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
		id: 0,
		name: '',
		create_user: ''
	};
	if(linksArray.length < 2 && count < 1){
		getLinks();
	}
	url = linksArray.shift();
	if(url == null || url == '' || url === undefined) {
		clearTimeout(t_timeout);
		// window.location.reload();
		return;
	}
	phone.id = url.id;
	console.log('群链接剩余：' + linksArray.length);
	$('div.pane.pane-two').append('<a id="mytarget" href="' + url.url + '" target="_blank">.' + '</a>');	
	$('#mytarget').get(0).click();

	var k = setTimeout(function(){
		phone.name = $('.popup-container span.metadata-title').html();
		phone.create_user = $('.popup-container span.metadata-subtitle').html();
		$.each($('.popup-container .participants-container .participant-text'),function(){
			phone.phones.push($(this).get(0).innerHTML);
		});
		$('.popup-container .popup-controls .btn-plain:first-child').click();
		$('#mytarget').remove();
		console.log('本次群名称是：' + phone.name + '---号码总数：' + phone.phones.length);

		$.ajax({
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			url: request_url + 'whatsapp/upload/phone/',
			data: JSON.stringify(phone),
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
	t_timeout = setTimeout(getNum,12000);
};

var start = function(){  //定时处理
	//jquery的html()函数，不是基于innerHTML实现的
	$('div.pane.pane-two').get(0).innerHTML = '';	
	getLinks();
	setTimeout(getNum,5000);
};

start();

