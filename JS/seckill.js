(function () {
    var timer = setInterval(function () {
        var nowDate = new Date();
        var nowHours = nowDate.getHours();
        var nowYear = nowDate.getFullYear();
        var nowDay = nowDate.getDate();
        var nowMonth = nowDate.getMonth() + 1;
        var lastDate;
        if(!(nowHours % 2)){
            lastDate = new Date(`${nowYear}, ${nowMonth}, ${nowDay}, ${(nowHours + 2) + '' + ':00'}`).getTime();
            $('.countdown-desc').find('strong').text((nowHours) + '' + ':00')
        }else{
            $('.countdown-desc').find('strong').text((nowHours + 1) + '' + ':00')
        }
        lastDate ? '' : lastDate = new Date(`${nowYear}, ${nowMonth}, ${nowDay}, ${(nowHours + 1) + '' + ':00'}`).getTime();
        var time = lastDate - nowDate.getTime();
        $('.timer-hour').text(`${Math.floor(time / 1000 / 3600)}`.padStart(2, '0'))
        $('.timer-minute').text(`${Math.floor(time / 1000 / 60 % 60)}`.padStart(2, '0'))
        $('.timer-second').text(`${Math.floor(time / 1000 % 3600 % 60)}`.padStart(2, '0'))
    }, 1000)

    $('.seckill-list').swiper({
        list : $('.seckill-list-li'),
        width : 800,
        height : 260,
        type : 'animate',
        showChangeBtn : true,
        autoTime : 500, 
        showSpotBtn : false
    })

    $('.seckill-brand-wapper').swiper({
        list : $('.seckill-brand-wapper').find('li'),
        type : 'animate',
        showChangeBtn : false,
        showSpotBtn : true,
        autoTime : 3000,
        isAuto : true
    })
})()