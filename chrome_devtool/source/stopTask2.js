/* 绝密 TOP SECRET, COPYRIGHT © AFMOBI GROUP */

clearTimeout(t_timeout);

var lastInfo = '请等待剩余' + linksArray.length + '条链接运行完毕...';
$('div.pane.pane-two').append('<span style="color:green;font-weight:bold;">' + lastInfo + '</span>');

var getLastNum = function(){
	var phone = {
		phones: [],
		tag: ''
	};

	url = linksArray.shift();
	if(url == null || url == '' || url === undefined) {
		lastInfo = '本次任务运行完毕,请关闭浏览器';
		$('div.pane.pane-two').append('<h2 style="color:green;font-weight:bold;">' + lastInfo + '</h22>');
		clearTimeout(t_timeout);
		return;
	}
	console.log('群链接剩余：' + linksArray.length);
	$('div.pane.pane-two').append('<a id="mytarget" href="' + url + '" target="_blank">' + url + '</a>');	
	console.log('本次群链接是：' + $('#mytarget')[0].innerHTML);
	$('#mytarget')[0].click();

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
			dataType: 'json',
			success: function(){},
			error: function(XMLHttpRequest,textStatus){},
			complete: function(XMLHttpRequest,textStatus){
				console.log('上传电话号码状态：' + textStatus);
				phone = {};
			}
		});
		clearTimeout(k);
	},8000);
	t_timeout = setTimeout(getLastNum,12000);
};
setTimeout(getLastNum,12000);