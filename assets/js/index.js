$(function() {
        //调用getUserInfo()获取用户信息
        getUserInfo()
            //提示用户是否确认退出
        var layer = layui.layer
            //点击按钮,实现退出功能
        $('#btnLogout').on('click', function() {
            layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //1清空本地存储中的token
                localStorage.removeItem('token')
                    // 2.重新跳转登录页面
                location.href = '/login.html'
                    //关闭confirm询问框
                layer.close();
            });
        })


        //获取用户的基本信息
        function getUserInfo() {
            $.ajax({
                method: 'GET',
                url: '/my/userinfo',

                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('获取用户信息失败')
                    }
                    //调用 renderAavatar渲染用户头像
                    renderAavatar(res.data)
                },
                //无论成功还是失败,最终都会调用complete回调函数
                // complete: function(res) {
                //     //在complete回调函数中,可以使用res.responseJSON 拿到服务器响应的数据
                //     console.log(res);
                //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //         console.log(11);
                //         //1.强制清空token
                //         localStorage.removeItem('token')
                //             //2.强制跳转到登录页面
                //         location.href = '/login.html'
                //     }
                // }
            })
        }

    })
    //渲染用户的头像
function renderAavatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
        // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 3.按需要渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}