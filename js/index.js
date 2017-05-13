// 设定高度
var bodyHeight = $(window).height() + 'px'
var bodyResize = false
document.body.style.height = bodyHeight

// 横屏
tip()
$(window).resize(function(){
    tip()
})

function tip() {
    if ($(window).height() < $(window).width()) {
        document.body.style.height = $(window).height() + 'px'
        $('.orientation_landscape').css('visibility', 'visible')
    }else {
        if (!bodyResize) {
            bodyHeight = $(window).height() + 'px'
            bodyResize = true
        }
        document.body.style.height = bodyHeight
        $('.orientation_landscape').css('visibility', 'hidden')
    }
}