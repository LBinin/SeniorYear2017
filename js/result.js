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
    var currLinePaddingBottom = 30 // 行间距

    // 获取参数
    var request = decodeURI(window.location.search.substr(1, window.location.search.length)).split('&');
    var grade = ''
    var className = ''
    var personName = ''
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
    if (personName.length > 4) {
        personName = personName.substr(0,4)
    }

    canvas = $('#canvas')[0]

    // 公司
    var company = [
        '阿里巴巴',
        '京东',
        '百度',
        '小米科技',
        '锤子科技',
        '腾讯',
        '网易',
        '暴雪',
        '谷歌',
        '微软',
        '汉东省人民检察院',
        '神盾局',
        '迪士尼',
        '湘潭大学人事处',
        '华为',
        '白宫',
        '美国联邦调查局',
        '美国中央情报局',
        '中国国家安全部',
        '国家计划生育委员会',
        '中国科学院',
        '中国气象局',
    ]

    // 大学
    var college = [
        '北京大学',
        '清华大学',
        '哈佛大学',
        '剑桥大学',
        '复旦大学',
        '香港大学',
        '武汉大学',
        '上海交大',
        '华中科技大学',
        '浙江大学',
        '耶鲁大学',
        '牛津大学',
        '麻省理工',
        '宾夕法尼亚大学',
        '斯坦福大学',
    ]

    // 教学楼
    var site = [
        '逸夫楼',
        '三教',
        '二教',
        '一教',
        '四教',
        '兴湘',
        '体育馆',
        '图书馆',
    ]

    // 班委
    var classCommittee = [
        '班长',
        '副班长',
        '团支书',
        '学习委员',
        '体育委员',
        '组织委员',
    ]

    // 节假日
    var festival = [
        '中秋',
        '元旦',
        '端午',
        '七夕',
        '圣诞',
        '平安夜',
        '万圣节',
        '情人节',
        '愚人节',
        '母亲节',
        '父亲节',
        '重阳节',
        '清明节',
        '妇女节',
        '双11',
        '618购物节',
        '国际禁毒日',
        '国际消费者权益日',
        '国际臭氧层保护日',
        '全国法制宣传日',
    ]

    // 组织活动地点
    var activitySite = [
        '去私人影院看天线宝宝',
        '去溜冰场搞露营',
        '去健身房搞烧烤',
        '去篮球场踢足球',
        '去北五食堂搞自习',
        '去KTV搞茶话会',
    ]

    // 配置数量
    var kongmingNum = getRandom(3,50) // 孔明灯数量
    var classCommitteeNum = getRandom(0,classCommittee.length - 1) // 班委1
    var classCommitteeNum2 = getRandom(0,classCommittee.length - 1) // 班委2
    while(classCommitteeNum == classCommitteeNum2) {
        classCommitteeNum2 = getRandom(0,classCommittee.length - 1)
    }
    var classCommitteeNum3 = getRandom(0,classCommittee.length - 1) // 班委3
    var classCommitteeNum4 = getRandom(0,classCommittee.length - 1) // 班委4
    while(classCommitteeNum3 == classCommitteeNum4) {
        classCommitteeNum4 = getRandom(0,classCommittee.length - 1)
    }
    var classCommitteeNum5 = getRandom(0,classCommittee.length - 1) // 班委5
    var classCommitteeNum6 = getRandom(0,classCommittee.length - 1) // 班委6
    while(classCommitteeNum5 == classCommitteeNum6) {
        classCommitteeNum6 = getRandom(0,classCommittee.length - 1)
    }

    // 班级内容
    var str1 = [
        ['30~有', '50~' + getRandom(1,5), '30~个人被', '50~' + company[getRandom(0,company.length - 1)], '30~录取'],
        ['30~有', '53~' + getRandom(1,3), '30~个人被', '50~' + college[getRandom(0,college.length - 1)], '30~录取'],
        ['30~班上四年一共产生了', '50~' + getRandom(1,4), '30~对情侣'],
        ['30~有', '50~' + getRandom(1,4), '30~个男生暗恋隔壁班妹子'],
        ['50~' + getRandom(1,100) + '%', '30~的男生直男癌晚期'],
        ['30~都二十好几了还有', '50~' + getRandom(3,12), '30~个人没谈过恋爱'],
        ['30~超过', '50~' + getRandom(1,60) + '%', '20~的同学仅凭', '30~考试月抱佛脚', '20~从未挂科'],
        ['30~一共有', '50~' + getRandom(4,18), '30~个人丢过校园卡'],
        ['30~有', '50~' + getRandom(4,18) + '%', '30~的女生进过', '50~' + site[getRandom(0, site.length - 1)], '30~男厕所'],
        ['30~一共有', '50~' + getRandom(1,3), '30~个最强王者'],
        ['30~四年来', '30~男生一共偷窥对面女寝','50~' + getRandom(6,18), '30~次'],

        ['30~四年累计放飞孔明灯','46~' + kongmingNum, '30~盏，'],
        ['30~围起来可绕一田', '50~' + (kongmingNum / 200).toFixed(2),'30~圈'],

        ['30~班上同学对', '32~老师','30~的满意率为', '50~' + getRandom(1,98) + '%'],
        ['30~组织委员一共组织了', '45~' + getRandom(1,6),'30~次班级活动'],
        ['30~最成功的一次竟是', '45~' + activitySite[getRandom(0,activitySite.length - 1)]],
        ['40~' + classCommittee[classCommitteeNum], '30~偷偷牵过', '40~' + classCommittee[classCommitteeNum2], '30~的小手'],
        ['40~' + classCommittee[classCommitteeNum3], '30~做梦都想亲', '40~' + classCommittee[classCommitteeNum4], '30~一口'],
        ['45~' + classCommittee[getRandom(0,classCommittee.length - 1)], '30~竟然私藏了一个', '33~充气娃娃'],
        ['35~' + classCommittee[classCommitteeNum5], '28~总喜欢和', '35~' + classCommittee[classCommitteeNum6], '28~当众秀恩爱'],
    ]

    // 自定义人名
    var str2 = [
        ['35~' + personName, '25~在吃毕业饭那天', '30~告白','25~肯定能成功'],
        ['35~' + personName, '25~将在','30~' + festival[getRandom(0, festival.length)] ,'25~告白成功'],
        ['35~' + personName, '30~脱完袜子会闻很久'],
        ['35~' + personName, '25~总是喜欢上课坐第一排', '30~玩手机'],
        ['35~' + personName, '25~总喜欢把内裤和袜子一起洗'],
        ['45~' + personName, '30~总是那么美'],
        ['45~' + personName, '30~总是那么妩媚'],
        ['45~' + personName, '28~胸围有', '35~36D'],
        ['30~' + personName, '18~毕业被黄校长评为', '26~校园卡之王', '18~从没丢过校园卡'],
        ['35~' + personName, '25~明明可以靠才华吃饭，', '25~却选择靠脸'],
        ['25~毕业照拍了十次，', '35~' + personName, '25~闭眼闭了九次'],
        ['35~' + personName, '22~总喜欢穿着滑板鞋在', '28~逸夫楼门口','22~摩擦'],
        ['40~' + personName, '25~是吃穷了宿舍的胖纸'],
        ['40~' + personName, '25~图书馆抢座从未失手'],

    ]

    // 非自定义
    var str3 = [
        ['30~震惊！', '30~就业率竟然有100%'],
        ['35~班长说', '23~要请大家去万达看', '25~IMAX天线宝宝大电影'],
        ['30~湘大南门分手，', '30~召唤师峡谷再会'],
        ['25~有几个耿直boy', '25~打了四年撸还是', '35~"英勇黄铜"'],
        ['30~12点断网后，', '30~用夜间流量打LOL'],
        ['20~四年前这时候','20~我们距离高考不到一个月，', '22~现在距离毕业也是'],
        ['40~还有四个月', '30~学校又要开始军训了'],
        ['26~两年前欢送辅导员的时候', '35~大家笑的很伤心'],
        ['28~有几个boy看着', '40~gay里gay气'],
        ['28~有个可怜boy的','35~女票', '28~和','35~隔壁班妹子', '28~跑了'],
        ['25~班上女生从大一下学期开始变美，', '30~现在到达颜值巅峰'],
        ['28~总有几个学渣', '30~敢给其他 学渣 讲题'],
        ['30~副班长每次翘课', '40~都被抓'],
        ['25~学委其实很闷骚'],
        ['30~学习委员不搞学习，', '30~宣传委员不搞宣传'],
        ['30~去KTV总喜欢点', '35~最炫民族风'],
        ['25~寝室有几个那种', '35~唱的烂又喜欢唱','25~的室友'],
        ['26~有人重修没过准备读大五'],
        ['30~和尚庙/尼姑庵'],
        ['35~女神班/男神班'],
        ['30~目标是星辰大海'],
        ['26~拍毕业照的时候悄悄站在', '35~暗恋的女生背后'],
        ['26~毕业照是', '30~我和TA','26~唯一的一张', '40~合照','26~……'],
    ]

    var str = []

    var str1Num = 2;
    var str2Num = personName == '' ? 0 : 1;
    var str3Num = 3;
    for (var i = 0; i < str1Num; i++) {
        var randomTemp = getRandom(0,str1.length - 1)
        str.push(str1[randomTemp]);
        str1.splice(randomTemp,1)
    }
    for (var i = 0; i < str2Num; i++) {
        var randomTemp = getRandom(0,str2.length - 1)
        str.push(str2[randomTemp]);
        str2.splice(randomTemp,1)
    }
    for (var i = 0; i < str3Num; i++) {
        var randomTemp = getRandom(0,str3.length - 1)
        str.push(str3[randomTemp]);
        str3.splice(randomTemp,1)
    }

    str.push(['30~你的班级有毒'])

    console.dir(str);

    var bottomStr = [
        ['将“最美毕业照”邮件发送至byj@sky31.com,'],
        ['即有机会在学校官方毕业季活动中展示']
    ]

    var activityName = '最美毕业照'

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
        // 年级
        ctx.fillText(grade, center.x, 150, imgWidth - 140)
        // 班级
        ctx.fillText(className, center.x, 220, imgWidth - 140)


        // 绘制有毒内容
        var currLineY = 300 // 初始文字位置
        var textOffsetRight = 10 // 文字右偏移
        for (var j = 0; j < str.length; j++) {
            // 测量宽度
            var currLineSumWidth = 0
            var currLineMaxHeight = 0
            for (var i = 0; i < str[j].length; i++) {
                // 测量
                var temp = str[j][i].split('~')
                ctx.font = temp[0] + 'px MicrosoftYahei'
                // 获取该行宽度
                currLineSumWidth += ctx.measureText( temp[1] ).width > 300 ? 300 + wordSpacing : ctx.measureText( temp[1] ).width + wordSpacing
                // 获取最大高度
                currLineMaxHeight = parseInt(temp[0]) > currLineMaxHeight ? parseInt(temp[0]) : currLineMaxHeight
            }

            var textLeft = (imgWidth - currLineSumWidth) / 2 + textOffsetRight

            // 绘制文字
            ctx.textAlign='left';
            for (var i = 0; i < str[j].length; i++) {
                // 绘制
                var temp = str[j][i].split('~')
                ctx.font = temp[0] + 'px MicrosoftYahei'
                ctx.fillText(temp[1], textLeft, currLineY, 300)
                // 文字的X值
                textLeft += ctx.measureText( temp[1] ).width > 300 ? 300 + wordSpacing : ctx.measureText( temp[1] ).width + wordSpacing
            }
            currLineY += (currLineMaxHeight + currLinePaddingBottom)
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

        // 设置图片
        $('.paper-generate img').attr('src', img_url)
    }

    // 获取随机数
    function getRandom(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
})