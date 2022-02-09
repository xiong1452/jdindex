function Swiper (options, wapper) {
    this.wapper = wapper;
    this.list = options.list || [];
    this.width = options.width || wapper.width();
    this.height = options.height || wapper.height();
    this.type = options.type || 'fade';
    this.showChangeBtn = options.showChangeBtn || options.showChangeBtn == undefined ? true : options.showChangeBtn;
    this.showSpotBtn = options.showSpotBtn || options.showSpotBtn == undefined ? true : options.showSpotBtn;
    this.autoTime = options.autoTime || 5000;
    this.isAuto = options.isAuto || options.isAuto == undefined ? true : options.isAuto;
    this.init = function () {
        // 用于初始化轮播图结构样式
        // 轮播图结果构建
        
    }
}
 
// 创建轮播图结构
Swiper.prototype.createDom = function () {
    var swiperWapper = $('<div class="my-swiper-wapper"></div>')
    var swiperContent = $('<ul class="my-swiper-list"></ul>')
    var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn"><</div>');
    var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">></div>')
    var spotDiv = $('<div class="my-swiper-stops"></div>');
    for(var i = 0; i < this.list.length; i++){
        $('<li class="my-swiper-item"></li>').append(this.list[i]).appendTo(swiperWapper);
        
    }
}

// $.fn.extend({
//     swiper : function (options) {
//         var obj = new Swiper(options, this)
//         obj.init()
//     }
// })