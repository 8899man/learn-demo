/* 绝密 TOP SECRET, COPYRIGHT © AFMOBI GROUP */
clearTimeout(t_timeout);

info = '请等待剩余' + linksArray.length + '条链接运行完毕...';
$('div.pane.pane-two').append('<span style="color:green;font-weight:bold;">' + info + '</span>');

var getLastNum = function(){
	var phone = {
		phones: [],
		id: null,
		name: '',
		create_user: ''
	};
	url = linksArray.shift();
	if(url == null || typeof(url) === undefined || url === undefined) {
		info = '本次任务运行完毕,请关闭浏览器';
		$('div.pane.pane-two').append('<h2 style="color:green;font-weight:bold;">' + info + '</h22>');
		clearTimeout(t_timeout);
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
			success: function(){},
			error: function(XMLHttpRequest,textStatus){},
			complete: function(XMLHttpRequest,textStatus){
				console.log('上传电话号码状态：' + textStatus);
				phone = null;
			}
		});
		clearTimeout(k);
	},8000);
	t_timeout = setTimeout(getLastNum,interval);
};
setTimeout(getLastNum,interval);