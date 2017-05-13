$(function(){
    var className
    var personName
    var imgHeight
    var imgWidth
    var canvas
    var ctx
    var canvas_background = './images/input_paper_empty.png?1'
    var canvas_background_img = new Image()
    var img_url

    canvas = $('#canvas')[0]

    canvas_background_img.src = canvas_background
    // canvas_background_img.setAttribute('crossOrigin', 'anonymous') // 允许跨域
    // 获取背景图片高度宽度,设置canvas的高度宽度
    canvas_background_img.onload = function() {
        imgWidth = canvas_background_img.width
        imgHeight = canvas_background_img.height
        canvas.height = imgHeight
        canvas.width = imgWidth
        ctx = canvas.getContext('2d')
        
        // 绘制背景
        console.log(canvas.toDataURL('image/jpg'));
        ctx.drawImage(canvas_background_img, 0, 0)
        // 生成图片
        img_url = canvas.toDataURL('image/jpg')

        console.log(img_url + '1');

        // 
        $('.paper-generate').eq(0).css({
            'background-image': 'url(' + img_url +')',
        })
    }
})