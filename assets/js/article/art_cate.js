$(function() {
    var layer = layui.layer
    var form = layui.form
        //获取文章分类的列表
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //为添加类别按钮添加绑定事件
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: '1',
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html(),
            })
        })
        // 通过代理的形式, 为form - add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功')
                        // 根据索引关闭弹出层
                    layer.close(indexAdd)
                }

            })
        })
        //通过代理的形式,为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
            //弹出一个修改文章信息的层
            indexEdit = layer.open({
                type: '1',
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html(),
            })
            var id = $(this).attr('data-id')
                //发起请求获取数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    console.log(res);
                    form.val('form-edit', res.data)
                }
            })
        })
        //通过代理的形式,为修改分类表单绑定submit
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                layer.msg('更新分类信息成功！')
                layer.close(indexEdit)
                initArtCateList()
            }

        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            //提示是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                mothed: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    initArtCateList()
                }
            })
            layer.close(index);
        });
    })

})