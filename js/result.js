$(function(){
    var className
    var personName
    var imgHeight
    var imgWidth
    var canvas
    var ctx
    var canvas_background = './images/input_paper_empty.png?'
    var canvas_background_img = new Image()
    // canvas_background_img.crossOrigin = 'anonymous' // 允许跨域
    canvas_background_img.src = canvas_background
    var img_url

    var wordSpacing = 8 // 字间距
    var currLinePaddingBottom = 40 // 行间距

    canvas = $('#canvas')[0]

    var str = [
        ['30~有', '50~3', '30~对', '40~班队'],

        ['30~40%的人拿到了', '55~名企', '30~offer'],
        ['40~速成西班牙语'],
        ['30~你的班级有毒']
    ]

    var bottomStr = [
        ['将“最美毕业照”邮件发送至byj@sky31.com,'],
        ['即有机会在学校官方毕业季活动中展示']
    ]

    var activityName = '最美毕业照'

    // 获取参数
    var request = decodeURI(window.location.search.substr(1, window.location.search.length)).split('&');
    var grade = ''
    var className = ''
    var personName = ''
    console.log(request);
    for (var i = 0; i < request.length; i++) {
        var temp = request[i].split('=');
        if (temp[0] == 'className') {
            className = temp[1]
        }else if (temp[0] == 'personName') {
            personName = temp[1]
        }else if (temp[0] == 'grade') {
            grade = temp[1]
        }
    }

    // 获取背景图片高度宽度,设置canvas的高度宽度
    canvas_background_img.onload = function() {
        imgWidth = canvas_background_img.width
        imgHeight = canvas_background_img.height
        canvas.height = imgHeight
        canvas.width = imgWidth
        ctx = canvas.getContext('2d')

        var center = {x: imgWidth / 2, y: imgHeight / 2}  // 画布中心
        
        // 绘制背景
        ctx.drawImage(canvas_background_img, 0, 0)

        // 写字
        ctx.font = '50px MicrosoftYahei'
        ctx.textAlign = 'center'
        ctx.fillText(grade, center.x, 150, imgWidth - 140)
        // ctx.textAlign='center';
        ctx.fillText(className, center.x, 220, imgWidth - 140)


        // 绘制有毒内容
        var currLineY = 330 // 初始文字位置
        for (var j = 0; j < str.length; j++) {
            // 测量宽度
            var currLineSumWidth = 0
            var currLineMaxHeight = 0
            for (var i = 0; i < str[j].length; i++) {
                // 测量
                var temp = str[j][i].split('~')
                ctx.font = temp[0] + 'px MicrosoftYahei'
                // 获取该行宽度
                currLineSumWidth += ctx.measureText( temp[1] ).width + wordSpacing
                // 获取最大高度
                currLineMaxHeight = parseInt(temp[0]) > currLineMaxHeight ? parseInt(temp[0]) : currLineMaxHeight
            }

            var textLeft = (imgWidth - currLineSumWidth) / 2

            // 绘制文字
            ctx.textAlign='left';
            for (var i = 0; i < str[j].length; i++) {
                // 绘制
                var temp = str[j][i].split('~')
                ctx.font = temp[0] + 'px MicrosoftYahei'
                ctx.fillText(temp[1], textLeft, currLineY, imgWidth - 140)
                // 文字的X值
                textLeft += ctx.measureText( temp[1] ).width + wordSpacing
            }
            currLineY += currLineMaxHeight + currLinePaddingBottom
        }


        // 绘制bottom
        var bottomY = 770 // 底部文字起始Y值
        var bottomFontSize = 20 // 底部文字大小
        var bottomLineHeight = 10 // 底部文字行间距
        for (var j = 0; j < bottomStr.length; j++) {
            ctx.textAlign = 'center'
            ctx.font = bottomFontSize + 'px MicrosoftYahei'
            ctx.fillText(bottomStr[j], center.x, bottomY)
            bottomY += bottomFontSize + bottomLineHeight
        }

        // 绘制活动名字
        var activityNameY = 875 // 底部文字起始Y值
        var activityNameX = 480 // 底部文字起始X值
        var activityNameSplit = activityName.split('')
        var activityNameSpacing = 10
        var activityNameFontSize = 30
        for (var j = 0; j < activityNameSplit.length; j++) {
            ctx.textAlign = 'right'
            ctx.font = activityNameFontSize + 'px MicrosoftYahei'
            ctx.fillText(activityNameSplit[j], activityNameX, activityNameY)
            activityNameX += ctx.measureText(activityNameSplit[j]).width + activityNameSpacing
        }


        // 生成图片
        img_url = canvas.toDataURL('image/png')

        // console.log(img_url + '1');

        // // 
        $('.paper-generate img').attr('src', img_url)
    }
})