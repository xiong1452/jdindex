(function () {
    var menuList = [{
        titles: ['家用电器'],
        content: {
            tabs: ['家电馆', '家电专卖店', '家电服务', '企业采购', '商用电器', '以旧换新'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }, {
                title: '洗衣机',
                items: ["滚筒洗衣机", "洗烘一体机", "波轮洗衣机", "迷你洗衣机", "烘干机", "洗衣机配件"]
            }, {
                title: '冰箱',
                items: ["多门", "对开门", "三门", '双门', '冰柜/冰吧', '酒柜', '冰箱配件']
            }, {
                title: '厨卫大电',
                items: ['油烟机', '燃气灶', '烟灶套装', '集成灶', '消毒柜', '洗碗柜', '电热水器', '燃气热水器', '空气能热水器', '太阳能热水器', '嵌入式厨电', '烟机灶具配件']
            }, {
                title: '厨卫小电',
                items: ['破壁机', '电烤箱', '电饭煲', '电压力锅', '电炖锅', '豆浆机', '料理机', '咖啡机', '电饼铛', '榨汁机/原汁机', '电水壶/热水瓶', '微波炉', '电火锅', '养生壶', '电磁炉', '面包机', '空气炸锅', '面条机', '电陶炉', '煮蛋器', '电烧烤炉']
            }]
        }
    }, {
        titles: ['手机', '运营商', '数码'],
        content: {
            tabs: ['玩3C', '手机频道', '网上营业厅', '配件频道', '智能数码', '影像Club'],
            subs: [{
                title: '手机',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '手表',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['电脑', '办公'],
        content: {
            tabs: ['玩3C', '电脑办公', '企业采购', 'GAME+', '装机大师', '私人定制'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['家居', '家具', '家装', '厨具'],
        content: {
            tabs: ['家装城', '居家日用', '精品家具', '家装建材', '国际厨具', '装修服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }];
    var clickKey = false;
    var mouseKey = false;
    var timer = null;
    menuLi(menuList);

    function menuLi(menuList) {
        var str = '';
        var lotDom = [];
        var lotDdDom = [];
        menuList.forEach(function (ele, index) {
            str += `<li data-index = ${index + 1}><a href = "#">${ele.titles.join('/')}</a></il>`
            lotDom.push(menuTab(ele));
            lotDdDom.push(menuDl(ele))
        })
        $('.fs_col1_content').find('ul').html(str);
        returnDl(CloneDiv(lotDom, lotDdDom))
    }

    function menuTab(dom) {
        var str = ''
        var length = dom.content.tabs.length;
        for (var i = 0; i < length; i++) {
            str += `<a href="#" class="iconfont">${dom.content.tabs[i]}&nbsp;&#xe600;</a>`
        }
        return str;
    }

    function menuDl(dom) {
        var allDom = [];
        dom.content.subs.forEach(function (ele, index) {
            var str = ''
            ele.items.forEach(function (ele, index) {
                str += `<dd><a href="#">${ele}</a></dd>`
            })
            str = `<dl><dt><a href="#">${ele.title}</a><i class="iconfont">&#xe600;</i></dt>${str}</dl>`
            allDom.push(str);
        })
        return allDom.join('');
    }

    function CloneDiv(Doma, DomDl) {
        var ArrayDom = []
        for (var i = 0; i < Doma.length; i++) {
            ArrayDom.push($('.F-shadow-part').eq(0).clone().find('.F-shadow-title').html(Doma[i])
                .parent().find('.F-shadow-ul').html(DomDl[i]).parents('.F-shadow-part').attr('index-id', i + 1)
                .css('display', 'none')
            )
        }
        return ArrayDom;
    }

    function returnDl(array) {
        $('.F-shadowList').html(array)
    }

    $('.fs_col1_content').on('mouseenter', 'li', function () {
        $('.F-shadowList').css('display', 'block');
        $('.F-shadow-part').css('display', 'none')
            .eq($(this).index()).css('display', 'block');
    }).on('mouseleave', function () {
        $('.F-shadowList').css('display', 'none');
    })

    $('.fs_col2_autoPic1').swiper({
        list: $('.fs_col2_autoPic1').find('li'),
        width: 590,
        height: 470,
        type: 'CSS3',
        showChangeBtn: true,
        autoTime: 5000,
        showSpotBtn: true,
        isAuto: true,
        spotHover: true,
    })

    $('.fs_col2_Pic_wapper').swiper({
        list: $('.fs_col2_Pic_wapper').find('li'),
        width: 190,
        height: 470,
        type: 'fade',
        autoTime: 7000,
        isAuto: true,
        showSpotBtn: false,
        showChangeBtn: false
    })

    $('.Fs_service_pop').on('mouseenter', function () {
        var dom = $(this);
        // mouseKey = false;
        timer = setTimeout(function () {
            if(mouseKey){
                clearTimeout(timer);
                return;
            }
            $('.Fs-service-pop1').addClass('service_iframe')
            if (dom.hasClass('Fs-service-pop2')) {
                dom.addClass('service_iframe2')
            }
            $('.Fs-service-pop').css({
                top: 238,
                transform: 'translateY(-100%)'
            })
            active();
            clickKey = true;
        }, 200)
        if (clickKey) {
            active();
        }
        function active() {
            $('.Fs_service_pop').removeClass('service_iframe_on');
            dom.addClass('service_iframe_on');
        }
    }).on('mouseleave', function () {
        clearTimeout(timer);
    })

    $('.fsWapper').on('click', function (e) {
        e.stopPropagation()
    })

    $('.fs, .header, .shortcut').on('click', function (e) {
        $('.Fs_service_pop').removeClass('service_iframe service_iframe_on service_iframe2');
        $('.Fs-service-pop').css({
            top: 232,
            transform: 'translateY(100%)'
        })
        mouseKey = false;
        clickKey = false;
    })

    $('.Fs-phone-wapper').on('mouseenter', 'li', function () {
        var dom = $(this);
        $('.Fs-phone-content').css('display', 'none')
            .eq(dom.index()).css('display', 'block');
        dom.addClass('Fs-phone-active').siblings().removeClass('Fs-phone-active');
    })

    $('.Fs-service-pop-close').on('click', function (e) {
        e.preventDefault();
        $('.fs').trigger('click');
    })

    $('.Fs-service-content').on('mouseenter', 'li', function (e) {
        var dom = $(this);
        $('.Fs-service-pop > div').css('display', 'none')
            .eq(dom.index()).css('display', 'block');
    })
})()