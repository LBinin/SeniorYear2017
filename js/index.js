$(function(){
    // 设定高度
    var bodyHeight = $(window).height() + 'px'
    var bodyResize = false
    $('.container').height(bodyHeight)
})
// document.body.style.height = bodyHeight

// 横屏
// tip()
// $(window).resize(function(){
//     console.log($(window).height());
//     tip()
// })

// function tip() {
//     alert(window.orientation)
//     if(window.orientation == 90 || window.orientation == -90) {
//         document.body.style.height = $(window).height() + 'px'
//         $('.orientation_landscape').css('visibility', 'visible')

//     }else if(window.orientation == 180 || window.orientation == 0) {
//         if (!bodyResize) {
//             bodyHeight = $(window).height() + 'px'
//             bodyResize = true
//         }
//         document.body.style.height = bodyHeight
//         $('.orientation_landscape').css('visibility', 'hidden')

//     }
// }