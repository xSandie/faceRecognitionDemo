$(document).ready(() => {

    layui.use('table', () => {
        var table = layui.table;
        table.render({
            elem: '#datatable'
            , url: '/Getdata'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                {field: 'id', width: 80, title: 'id', align: 'center', sort: true}
                , {field: 'name', width: 150, align: 'center', title: '姓名'}
                , {field: 'data', title: '特征数据', align: 'center'}
            ]]
        });
    });


    //上传按钮
    $("#upload").click( () => {
        layer.open({
            type: 2,
            area: ['500px', '400px'],
            content: '/templates/Upload.html'
        });
    })


    //人脸对比识别按钮
    $("#check").click( () => {
        layer.open({
            type: 2,
            area: ['500px', '400px'],
            content: '/templates/FaceCheck.html'
        });
    })


})