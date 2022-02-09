$.fn.extend({
    swiper: function (options) {
        var keyBtn = true;                                      // ?全局变量，用于防止bug，进行上锁
        var delayA = 200;                                       // ?全局变量，指定所用动画的时间
        var defaultConfig = {                                   // ?用来初始化配置文件
            list: $(this).find('li') || '',                     // ?获取需要轮播的元素
            width: $(this).width(),                             // ?获取轮播元素的父级宽高
            height: $(this).height(),                           
            type: 'fade',                                       // ?轮播元素需要的动画，这里只有三个
            showChangeBtn: true,                                // ?轮播图是否需要按钮
            autoTime: 3000,                                     // ?自动录播时间
            showSpotBtn: true,                                  // ?轮播图是否需要小圆点
            isAuto: false,                                      // ?是否自动轮播
            spotClick : false,                                  // ?小圆点的点击事件
            spotHover : false,                                  // !小圆点的移入事件,用这个慎用动画类型为 'fade' 而是用 'CSS3',主要有小bug
            dom: $(this),                                       // ?获取当前dom的元素
            nowIndex: 0                                         // ?全局变量，用来指定图片当前的位置
        }
        options = $.extend(true, defaultConfig, options)
        options.spotHover ? '' : delayA = 400;
        init(options);
        initStyle(options);
        initEvent(options);
        initAutoMove(options);
        spotClick(options);
        spotHover(options);

        //TODO 初始化轮播图结构
        function init(options) {
            if (options.list.length == 0) {
                // console.log(options)
                console.log('没有轮播的元素');
                return false;
            }
            var leftBtn = $('<div class="jqSwiperlBtn conmainBtn"><</div>');
            var rightBtn = $('<div class="jqSwiperrBtn conmainBtn">></div>');
            options.dom.append(leftBtn)
                .append(rightBtn);
            if (!options.showChangeBtn) {
                options.dom.find('.conmainBtn').css('display', 'none');
            }
            if (options.showSpotBtn) {
                var spotDiv = $('<div class="jqSwiperSpot"></div>');
                for (var i = 0; i < options.list.length; i++) {
                    $('<span></span>').appendTo(spotDiv);
                }
                options.dom.append(spotDiv)
            }
        }
        //TODO 初始化初始样式
        function initStyle(options) {
            if (options.type == 'fade' || options.type == 'CSS3') {
                options.list.hide().eq(options.nowIndex).show();
                if (options.list.css('position') != 'absolute') {
                    options.list.css('position', 'absolute');
                }
                if(options.type == 'CSS3'){
                    options.list.css('display', 'block');
                }
            }
            if (options.type == 'animate') {
                options.dom.find('ul').eq(0).append(options.list.eq(0).clone().css({
                    background: options.list.eq(0).css('background')
                })).css({
                    width: options.list.width() * (options.list.length + 1)
                });
                options.list = options.dom.find('ul').eq(0).find('>li');
                if (options.list.css('float') == 'none') {
                    options.list.css('float', 'left');
                }
            }
            changeSpots(options)
        }
        //TODO 初始化事件
        function initEvent(options) {
            options.dom.find('.jqSwiperlBtn').on('click', function () {
                if (keyBtn) {
                    options.nowIndex--;
                    if (options.type == 'fade' || options.type == 'CSS3') {
                        if (options.nowIndex < 0) {
                            options.nowIndex = options.list.length - 1;
                        }
                    } else if (options.type == 'animate') {
                        if (options.nowIndex < 0) {
                            options.dom.find('ul').eq(0).css({
                                marginLeft: options.width * -(options.list.length - 1)
                            })
                            options.nowIndex = options.list.length - 2;
                        }
                    }
                    options.type == 'fade' ? fade(options) : (options.type == 'CSS3' ? CSS3(options) : animate(options));
                }
            })
            options.dom.find('.jqSwiperrBtn').on('click', function (e) {
                e.stopPropagation();
                if (keyBtn) {
                    options.nowIndex++;
                    if (options.type == 'fade' || options.type == 'CSS3') {
                        if (options.nowIndex >= options.list.length) {
                            options.nowIndex = 0;
                        }
                    } else if (options.type == 'animate') {
                        if (options.nowIndex >= options.list.length) {
                            options.dom.find('ul').eq(0).css({
                                marginLeft: 0
                            })
                            options.nowIndex = 1;
                        }
                    }
                    options.type == 'fade' ? fade(options) : (options.type == 'CSS3' ? CSS3(options) : animate(options));
                }
            })
        }
        //TODO 初始化自动轮播
        function initAutoMove(demo) {
            if (demo.isAuto) {
                if (demo.autoTime < 2000) {
                    demo.autoTime = 2000;
                }
                demo.dom.get(0).timer = setInterval(function () {
                    demo.dom.find('.jqSwiperrBtn').click()
                }, demo.autoTime)
                demo.dom.on('mouseenter', function () {
                    clearInterval(demo.dom.get(0).timer);
                    demo.dom.one('mouseleave', function (e) {
                        e.stopPropagation();
                        demo.dom.get(0).timer = setInterval(function () {
                            demo.dom.find('.jqSwiperrBtn').click()
                        }, demo.autoTime)
                    })
                })
            }
        }
        //TODO 初始化小圆点改变
        function changeSpots(options, num) {
            if ($.type(num) == 'number') {
                options.dom.find('.jqSwiperSpot span').removeClass('active').eq(num).addClass('active')
            } else {
                options.dom.find('.jqSwiperSpot span').removeClass('active').eq(options.nowIndex).addClass('active')
            }
        }
        //TODO 初始化淡入淡出动画
        function fade(options) {
            options.list.fadeOut(delayA, function () {
                keyBtn = false;
            }).eq(options.nowIndex).fadeIn(delayA, function () {
                keyBtn = true;
            });
            changeSpots(options)
        }
        //TODO 初始化线性动画
        function animate(options) {
            keyBtn = false;
            options.dom.find('ul').eq(0).animate({
                marginLeft: options.nowIndex * -options.list.width()
            }, delayA, 'easeInOutQuad', function () {
                keyBtn = true;
            })
            if (options.nowIndex == options.list.length - 1) {
                changeSpots(options, 0)
            } else {
                changeSpots(options);
            }
        }
        //TODO 初始化小圆点点击事件
        function spotClick(options) {
            if(options.spotClick){
                options.dom.find('.jqSwiperSpot').on('click', 'span', function () {
                    options.nowIndex = $(this).index();
                    options.type == 'fade' ? fade(options) : (options.type == 'CSS3' ? CSS3(options) : animate(options));
                })
            }
        }
        //TODO 初始化小圆点移入事件
        function spotHover(options) {
            if(options.spotHover){
                options.dom.find('.jqSwiperSpot span').hover(function () {
                    if(options.nowIndex == $(this).index()){
                        return false;
                    }
                    options.nowIndex = $(this).index();
                    options.type == 'fade' ? fade(options) : (options.type == 'CSS3' ? CSS3(options) : animate(options));

                },function () {})
            }
        }
        //TODO 初始化CSS3动画事件
        function CSS3 (options) {
            options.list.css({
                opacity : 0,
            }).eq(options.nowIndex).css({
                opacity : 1
            });
            changeSpots(options);
        }
    }
})