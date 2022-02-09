(function () {
    var animateKey = true;
    var ifKey = true;
    var operatDom = $('.hide-a');
    var inputList = ['烧烤炉', 'bb霜', 'diy主机', '奥克斯空调'];
    var hotwords = ['送十万金豆', '美妆秒杀节', '萌宠惠生活']
    var hotwordsDom = $('.H-hotwords .first-hotwords')
    var hotwordscount = 0;
    var inputDom = $('.H-search').find('input');
    var inputTimer = null;
    var searchMouse = null;
    $('.H-logo').hover(function () {
        ifKey = false;
        if(animateKey){
            animateKey = false;
            $('.logo-img').fadeOut();
            operatDom.fadeIn().find('.hide-gif').css({
                backgroundImage: `url('//img1.360buyimg.com/da/jfs/t1/16273/9/11655/153805/5c90a4f3E683206d9/eef283b0ed619fe4.gif?v=${Math.random()}')`
            })
            setTimeout(function () {
                operatDom.find('span').animate({
                    opacity : 1
                }, 200, 'linear', function () {
                    animateKey = true;
                    if(ifKey && animateKey){
                        setTimeout(function () {logoStyle(operatDom)}, 1000)
                    }
                });
            }, 3500)
        }   
    }, function () {
        ifKey = true;
        if(ifKey && animateKey){
            logoStyle(operatDom);
        }
    })
    function logoStyle (dom) {
        dom.fadeOut(function () {
            dom.find('span').css('opacity', 0)
        })
        $('.logo-img').fadeIn();
    }
    inputDom.get(0).timer = setInterval(function () {
        inputDom.get(0).placeholder = `${inputList[Math.floor(Math.random() * 4)]}`
    }, 6000)
    hotwordsDom.get(0).timer = setInterval(function () {
        ++hotwordscount == hotwords.length ? hotwordscount = 0 : '';
        hotwordsDom.html(hotwords[hotwordscount]);
    }, 4000)
    function getDate (val) {
        $.ajax({
            url : 'https://suggest.taobao.com/sug',
            type : 'get',
            data : {
                code : 'utf-8',
                q : val,
                callback : 'renderSearchList',
            },
            dataType : 'jsonp'
        })
    }
    inputDom.on('input', function () {
        var textInput = inputDom.val();
        clearTimeout(inputTimer);
        if(textInput){
            inputTimer = setTimeout(function () {
                getDate(textInput);
            }, 500)
        }
        if(textInput == ''){
            $('.H-search-list').css('display', 'none');
        }
    }).focus(function () {
        inputDom.val() == '' ? '' : getDate(inputDom.val())
    })
    window.renderSearchList = function (data) {
        var data = data.result;
        var dom = $('.H-search-list');
        var str = '';
        for(var i = 0; i < data.length; i++){
            str += `<li><a href="#">${data[i][0]}</a></li>`
        }
        str == '' ? '' : dom.html(str).css('display', 'block');
    }
    $('.H-search-f').on('mouseleave', function () {
        searchMouse = setTimeout(function () {
            $('.H-search-list').hide();
        }, 500)
    }).mouseenter(function () {
        clearTimeout(searchMouse);
    })
})()