$(function() {
    //点击"去注册账号的链接"
    $('#link-reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击"登录的链接"
    $('#link-login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //从layui 中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数自定义
    form.verify({
            //自定义一个叫做pwd效验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码是否一致的规则
            repwd: function(value) {
                //通过形参拿到的确认密码框中内容
                //还需要拿到密码框的内容
                //然后进行判断是否相等
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听注册表单的事件
    $('#form_reg').on('submit', function(e) {
            //1.先阻止默认的提交行为
            e.preventDefault();
            //2.发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');;
                //模拟点击行为
                $('#link-login').click();
            })
        })
        //监听登录表单事件
    $('#form_login').on('submit', function(e) {
        //1.先阻止默认的提交行为
        e.preventDefault();
        //2.发起Ajax的post请求


        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) { return layer.msg(res.message); }
                layer.msg('登录成功')
                    //将登录成功得到的token字符保存到   localStorage中
                localStorage.setItem('token', res.token)
                console.log(res.token);

                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})