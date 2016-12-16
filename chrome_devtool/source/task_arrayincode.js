//代码重构，正式代码，链接写入代码
//使用timeout循环，配套stopTask2,

var linksArray = ["https://chat.whatsapp.com/AeT0uilVKpX118gthtQAJs","https://chat.whatsapp.com/AeT0uilVKpX118gthtQAJs","https://chat.whatsapp.com/AeT0uilVKpX118gthtQAJs"];
//提示信息
var info = '';
//每一条数据源
var url = '';
//群成员数量原始值
var member_count = '';
//得到的号码总数
var num = 0;
//跑链接时间间隔
var interval = 10000;
//递归定时器
var t_timeout = null;



var getNum = function() {
	url = linksArray.shift();
	if(url == null || url == '' || url === undefined) {
		clearTimeout(t_timeout);
		info = '链接已跑完';
		$('div.pane.pane-two').append('<span style="color:red;font-weight:bold;">' + info + '</span>');
		console.log('+++++++++++++++++++++++++++++');
		console.log('本次链接得到的总数是：' + num);
		return;
	}
	console.log('群链接剩余：' + linksArray.length);
	$('div.pane.pane-two').append('<a id="mytarget" href="' + url + '" target="_blank">.' + '</a>');	
	$('#mytarget').get(0).click();

	var k = setTimeout(function(){
		member_count = $('.popup-container span.participants-title').html();
		member_count = member_count.substring(0,member_count.length-5);
		console.log('本条链接成员数量：' + member_count);
		num += parseInt(member_count);
		$('.popup-container .popup-controls .btn-plain:first-child').click();
		$('#mytarget').remove();
		clearTimeout(k);
	},8000);
	t_timeout = setTimeout(getNum,interval);
};

var start = function(){  //定时处理
	//jquery的html()函数，不是基于innerHTML实现的
	$('div.pane.pane-two').get(0).innerHTML = '';	
	setTimeout(getNum,5000);
};
start();

