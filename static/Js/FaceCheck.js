$(document).ready( ()=> {

    var loading

    layui.use('upload',  ()=> {
        var upload = layui.upload;
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#btnupload'
            , url: '/CheckAPI'
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
                 loading = layer.load(0, {
                    shade: false
                });
            }
            , done: function (res) {
                layer.close(loading);
                if (res.code == 200) {
                    return layer.msg(res.msg, {icon: 1, time: 3000});
                }  else {
                    return layer.msg("不好意思，出错啦", {icon: 2, time: 1500}, function () {
                        setTimeout('window.location.reload()', 100);
                    });
                }
                //上传成功
            }
            , error: function () {
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function () {
                    uploadInst.upload();
                });
            }
        });
    })


})