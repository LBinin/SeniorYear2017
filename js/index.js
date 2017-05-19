$(function(){
    
    // 设定高度
    var bodyHeight = $(window).height()
    var bodyWidth = $(window).width()
    if (isPc || isPad) {}
    else if (bodyHeight <= bodyWidth) {
        bodyHeight = $(window).width()
        bodyWidth = $(window).height()
    }
    $('.container').height(bodyHeight)
    orientation_landscape()
    $(window).resize(function(){
        orientation_landscape()
    })

    function orientation_landscape () {
        $('.container').height( bodyHeight / bodyWidth * $(window).width() )
        $('input').height( bodyHeight / bodyWidth * $(window).width() * 0.06 )
        $('select').height( bodyHeight / bodyWidth * $(window).width() * 0.06 )
    }
})