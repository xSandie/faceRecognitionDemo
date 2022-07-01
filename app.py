from flask import Flask
from flask import send_file
from flask import request
from FaceAPI import *

app = Flask(__name__, static_folder='', static_url_path='')


# 页面
@app.route('/')
def hello_world():
    return send_file('templates/Index.html')


# API
@app.route('/Getdata')
def Getdata():
    try:
        sql = 'select * from face_info'
        db = Mssql()
        list = db.Query(sql)
        datalist = []
        for item in list:
            dic = {}
            dic['id'] = item[0]
            dic['name'] = item[1]
            dic['data'] = item[2]
            datalist.append(dic)
        return json.dumps({
            "code": 0,
            "msg": "Success",
            "count": len(list),
            "data": datalist
        })
    except Exception as e:
        print(e)
        return None


@app.route('/UploadAPI', methods=['post'])
def UploadAPI():
    try:
        name = request.form.get('name')
        if name != 'undefined' and len(name) > 0:
            upload_file = request.files['file']
            old_file_name = upload_file.filename
            if upload_file:
                file_path = os.path.join(os.getcwd(),'UploadFiles',old_file_name)
                upload_file.save(file_path)
                makefacemodel(name, file_path)
                return json.dumps({'code': 200})
        else:
            return json.dumps({'code': 404})
    except Exception as e:
        print(e)
        return json.dumps({'code': 0})


@app.route('/CheckAPI', methods=['post'])
def CheckAPI():
    try:
        upload_file = request.files['file']
        old_file_name = upload_file.filename
        if upload_file:
            file_path = os.path.join(os.getcwd(),'UploadFiles',old_file_name)
            upload_file.save(file_path)
            r = checkfacemodel(file_path)
            if r:
                # 0.5为阈值，设定多少之内可以认定为此人
                if float(r[1]) <= 0.5:
                    return json.dumps({'code': 200, 'msg': r[0]})
                else:
                    return json.dumps({'code': 200, 'msg': '对不起，我不认识！'})
            else:
                return json.dumps({'code': 200, 'msg': '对不起，未识别到脸部特征'})
    except Exception as e:
        print(e)
        return json.dumps({'code': 0})
