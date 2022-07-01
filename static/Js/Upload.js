$(document).ready( ()=> {


    var loading
    layui.use(['upload','layer'],  () => {
        var upload = layui.upload;
        var layer = layui.layer;
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#btnupload'
            , url: '/UploadAPI'
            , data: {
                name:  () => {
                console.log($("#name"));
                debugger;
                    return $("#name")[0].value;
                }
            }
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
                    return layer.msg("上传成功", {icon: 1, time: 1500}, function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layui.table.reload('datatable');//重载父页表格，参数为表格id
                        parent.layer.close(index);
                    });
                } else if (res.code == 404) {
                    return layer.msg("上传失败,请先输入图片对应的人名，再选择照片进行上传", {icon: 2, time: 1500}, function () {
                        setTimeout('window.location.reload()', 100);
                    });
                } else {
                    return layer.msg("上传失败", {icon: 2, time: 1500}, function () {
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


