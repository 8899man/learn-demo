window.onload = function () {
  var isOperaMini = (navigator.userAgent.indexOf('Opera Mini') > -1);
  // alert(isOperaMini);

  function xTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }
  // 获取 url 参数
  function GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    }
    else {
      return "";
    }
  }
  // 发送请求
  // ajax 对象
  function ajaxObject() {
    var xmlHttp;
    try {
      // Firefox, Opera 8.0+, Safari
      xmlHttp = new XMLHttpRequest();
    } catch (e) {
      // Internet Explorer
      try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          // alert("您的浏览器不支持AJAX！");
          alert("your browser not support ajax");
          return false;
        }
      }
    }
    return xmlHttp;
  }

  // var ip = returnCitySN.cip;
  var inviteCustId = decodeURI(GetUrlParam('inviteCustId')).replace(/\s+/g,"");
  var sourceBusiness = decodeURI(GetUrlParam('sourceBusiness')).replace(/\s+/g,"");


  var cancel = document.getElementById('cancel');
  var open = document.getElementById('open');

  var get = document.getElementById('get-code');
  var time = document.getElementById('time');
  var submit = document.getElementById('ok');
  var prompt = document.getElementById('prompt-wrapper');

  var count = 60;
  var cc = document.getElementById('cc');
  var country = '';

  var phone = document.getElementById('phone');
  var captcha = document.getElementById('captcha');

  var errorWrapper = document.getElementById('error-wrapper');
  var faildMsg = document.getElementById('faild');

  var tipWrapper = document.getElementById('tip-wrapper');
  var tipMsg = document.getElementById('tip');

  // error消息定时器 2s 消失
  var errorTimer = 0;
  // 验证码定时器 interval
  var timer = 0;

   // post请求
   // 格式化post 传递的数据
   function postDataFormat(obj){
       if(typeof obj != "object" ) {
           alert("输入的参数必须是对象");
           return;
       }

       // 不支持FormData的浏览器的处理 
       var arr = new Array();
       var i = 0;
       for(var attr in obj) {
           arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
           i++;
       }
       return arr.join("&");
   }

  // ajax post请求：
  function ajaxPost ( url , data , header, fnSucceed , fnFail , fnLoading ) {
    var ajax = ajaxObject();
    ajax.open( "post" , url , true );
    ajax.setRequestHeader("Country", header);
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                fnSucceed( ajax.responseText );
            }
            else {
                // fnFail( "HTTP请求错误！错误码："+ajax.status );
                fnFail("HTTP request error! error code: " + ajax.status)
            }
        }
        else {
            fnLoading();
        }
    }
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send( JSON.stringify(data) );
  }

  get.addEventListener('click', function() {
    phone.blur();
    captcha.blur();
    window.clearTimeout(errorTimer)
    // 手机号码不能为空
    if(xTrim(phone.value).length <= 0) {
      faildMsg.innerText = 'phone number can not empty';
      errorWrapper.style.display = 'block';
      errorTimer = setTimeout(function() {
        errorWrapper.style.display = 'none';
      }, 2000);
      return false;
    }
    // 手机号码纯数字验证
    if(!/^[0-9]*$/.test(xTrim(phone.value))) {
      faildMsg.innerText = 'phone number format is incorrect';
      errorWrapper.style.display = 'block';
      errorTimer = setTimeout(function() {
        errorWrapper.style.display = 'none';
      }, 2000);
      return false;
    }
    get.style.display = 'none';
    time.style.display = 'block';
    if(isOperaMini) {
      time.innerText = 'Sending'
    } else {
      timer = setInterval(function() {
        if(count === 0) {
          count = 60;
          time.innerText = '60s';
          time.style.display = 'none';
          get.style.display = 'block';
          window.clearInterval(timer);
        } else {
          count --;
          time.innerText = count + 's';
        }
      }, 1000)
    }
    ajaxPost('/point/v1/business/getcaptcha', {
      cc: cc.value,
      phone: phone.value
    }, '', function(resp) {
      resp = JSON.parse(resp)
      if(resp.code === 0) {
        // window.scrollTo(0,0);
        // console.log('get captcha success')
      } else if(resp.code === 3) {
        faildMsg.innerText = 'params error';
        errorWrapper.style.display = 'block';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 1) {
        faildMsg.innerText = 'system error';
        errorWrapper.style.display = 'block';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 131002) {
        prompt.style.display = 'block';
        count = 60;
        time.innerText = '60s';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
      } else if(resp.code === 131001) {
        faildMsg.innerText = 'phone number format is incorrect';
        errorWrapper.style.display = 'block';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 114001) {
        faildMsg.innerText = 'Upper limit of your number that get verification';
        errorWrapper.style.display = 'block';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 114003) {
        faildMsg.innerText = 'Upper limit of your ip that get verification';
        errorWrapper.style.display = 'block';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else {
        faildMsg.innerText = resp.msg;
        errorWrapper.style.display = 'block';
        time.style.display = 'none';
        get.style.display = 'block';
        window.clearInterval(timer);
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      }
    }, function(msg) {
      alert(msg)
    }, function() {})
  }, false);

  // 提交注册
  submit.addEventListener('click', function() {
    country = cc.options[cc.selectedIndex].dataset.country;
    window.clearTimeout(errorTimer);
    // 手机号码纯数字验证
    if(!/^[0-9]*$/.test(xTrim(phone.value))) {
      faildMsg.innerText = 'phone number format is incorrect';
      errorWrapper.style.display = 'block';
      errorTimer = setTimeout(function() {
        errorWrapper.style.display = 'none';
      }, 2000);
      return false;
    }
    // 验证码纯数字验证
    if(!/^[0-9]*$/.test(xTrim(captcha.value))) {
      faildMsg.innerText = 'captcha format is incorrect';
      errorWrapper.style.display = 'block';
      errorTimer = setTimeout(function() {
        errorWrapper.style.display = 'none';
      }, 2000);
      return false;
    }
    // 手机号和验证码不能为空
    if(xTrim(phone.value).length <= 0 || xTrim(captcha.value).length <= 0) {
      faildMsg.innerText = 'phone numer or captcha can not empty'
      errorWrapper.style.display = 'block'
      errorTimer = setTimeout(function() {
        errorWrapper.style.display = 'none'
      }, 2000)
      return false;
    }
    ajaxPost('/point/v1/business/regist', {
      cc: cc.value,
      phone: phone.value,
      captcha: captcha.value,
      inviteCustId: inviteCustId,
      sourceBusiness: sourceBusiness
    }, country, function(resp) {
      resp = JSON.parse(resp)
      if(resp.code === 0) {
        window.location.href = '/success.html?phone=' + phone.value;
      } else if(resp.code === 3) {
        faildMsg.innerText = 'params error';
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 1) {
        faildMsg.innerText = 'system error';
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 131001) {
        faildMsg.innerText = 'phone number format is incorrect';
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 131007) {
        faildMsg.innerText = 'registration failed';
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 199001) {
        faildMsg.innerText = 'Invalid verification code';
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if(resp.code === 199004) {
        faildMsg.innerText = 'Please reacquire the verification code';
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      } else if (resp.code === 131002) {
        prompt.style.display = 'block';
        // count = 60;
        // time.innerText = '60s';
        // time.style.display = 'none';
        // get.style.display = 'block';
      } else {
        faildMsg.innerText = resp.data.msg;
        errorWrapper.style.display = 'block';
        errorTimer = setTimeout(function() {
          errorWrapper.style.display = 'none';
        }, 2000);
      }
    },function(msg) {
      alert(msg);
    }, function() {})
  }, false)

  // 关闭（以注册弹窗）
  cancel.addEventListener('click', function() {
    prompt.style.display = 'none';
  }, false);

  // 打开app
  open.addEventListener('click', function() {
    window.location.href = 'palmcredit://splash?channelid=h5';
    window.setTimeout(function() {
      window.location.href = "https://go.onelink.me/zyTA/appShare";
    }, 2000);
  })
}