function Timedown(opt) {
    var _opt = {
        selector: "",
        time: 10,
        onEnd: function () { },
        onStart: function () { }
    }
    var option = $.extend({}, _opt, opt);
    var obj = $(option.selector);
    var time = option.time;
    var onStart = option.onStart;
    var onEnd = option.onEnd;
    var timer = 0;

    onStart && onStart();
    init();
    function init() {
        obj.html(time);
        if (time == 0) {
            onEnd && onEnd();
        } else {
            time--;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(init, 1000)
        }
    }
    function toEnd() {
        if (timer) {
            clearTimeout(timer);
        }
        time = 0;
        obj.html(time);
        onEnd && onEnd();
    }
    this.toEnd = toEnd;
}

// 准备进入游戏
// 倒计时
var data_time = {
    // 倒计时
    timedown: function (obj,time,callback) {
        var that = $(obj);
        var countdown =time;
        settime(that);
        var timer;
        function settime(obj) {
            if (countdown == 0) {
                callback();
                return;
                // that.html(5);
                // countdown = 5;
                //  obj.html(countdown);
                // countdown--; 
            } else {
                var txt = countdown;
                obj.html(txt);
                countdown--;
            }
            window.clearTimeout(timer)
            timer = window.setInterval(function () {
                settime(obj)
            }, 1000)

        }
    }
};

var indexScroll= {
    init: function(){
        var speed=10; //数字越大速度越慢
        var tab=document.getElementsByClassName("scrollContent")[0];
        var tab1=document.getElementsByClassName("scroll1")[0];
        var tab2=document.getElementsByClassName("scroll2")[0];
        tab2.innerHTML=tab1.innerHTML;
        function Marquee(){
        if(tab2.offsetWidth-tab.scrollLeft<=0)
        tab.scrollLeft-=tab1.offsetWidth
        else{
        	tab.scrollLeft++;
        }
        }
        var MyMar=setInterval(Marquee,speed);
//      tab.onmouseover=function() {clearInterval(MyMar)};
//      tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
        
        
        $('.guidePopUp').click(function(){
            $(this).hide()
        })

    }
}

// 游戏
var timer = 0;
var gameing = {
    init: function (opt) {
        var _opt = {
            click: function () { }
        };
        var options = $.extend({}, _opt, opt)

        var win = (parseInt($(".couten").css("width"))) - 90;
        $(".couten").css("height", $(document).height());
        $("li").css({});
        var del = function () {
            nums++;
            $(".li" + nums).remove();
            setTimeout(del, 300)
        }

        //增加红包
        var num = 0;

        var add = function () {
            var Left = parseInt(Math.random() * (win - 0) + 30);
            var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
            num++;
            var $li = $("<li class='li" + num + "' ><a href='javascript:;'><img src='/Content/img/game.png'></a></li>");
            $li.css({
                "left": Left,
            });
            $li.find("img").css({
                "transform": "rotate(" + rot + ")",
                "-webkit-transform": "rotate(" + rot + ")",
                "-ms-transform": "rotate(" + rot + ")",
                "-moz-transform": "rotate(" + rot + ")",
                "-webkit-transform": "rotate(" + rot + ")",
                "-o-transform": "rotate(" + rot + ")"
            });
            $li.animate({ 'top': $(window).height() + 20 }, 3000, function () {
                //删掉已经显示的红包
                this.remove()
            });
            //点击红包的时候
            $li.click(function () {
                $(this).stop(true, false).hide(800, function () {
                    this.remove();
                    options.click.call(this);
                });
            });
            $(".couten").append($li);

            timer = setTimeout(add, 300)
        }
        add();

    },
    over: function () {
        if (timer) {
            clearTimeout(timer);
        }
    }
}



























