from flask import Flask, render_template, request

from module.dbModule import Database

from module.emotion import extract_emotion, BERTClassifier
from module.summary import summarize_script
from module.comment import generate_comment
import torch


# from flask_cors import CORS
# from flask_restplus import Api, Resource, fields


# @recomm.rount('/')

app = Flask(__name__)

# CORS(app)

# api = Api(app, version='1.0', title='Recommendation API')


emotion_model = torch.load('module/checkpoint/kobert_emotion_classification.pth', map_location='cpu')
emotion_model.eval()

# @app.route('/emotion/', methods=['POST'])
def emotion(did, diary):
    # did = request.json.get('did')
    # diary = request.json.get('diary').split('\n')
    diary = diary.split('\n')
    analysis = {'angry' : 0,
                'disgust' : 0,
                'fear' : 0,
                'happiness' : 0,
                'neutral' : 0,
                'sadness' : 0,
                'surprise' : 0}
                
    for sentence in diary:
        if len(sentence) > 5:
            result = extract_emotion(sentence, emotion_model)
            for key, value in result.items():
                analysis[key] += value

    db_class = Database()
    sql = f"""SELECT count(did) FROM dayugi.emotion_rate WHERE did={did}"""
    row = db_class.executeAll(sql)
    print(row[0]['count(did)'])
    if row[0]['count(did)']:
        sql = f"""UPDATE dayugi.emotion_rate SET {','.join([emotion + '=' + str(score) for emotion, score in analysis.items()])}"""
    else:
        sql = f"""INSERT INTO dayugi.emotion_rate(did,{','.join([emotion for emotion in analysis.keys()])})
        VALUES ({did},{','.join([str(score) for score in analysis.values()])})"""

    db_class.execute(sql)
    db_class.commit()

    return analysis


# @app.route('/comment/', methods=['POST'])
def comment(did, diary):
    # did = request.json.get('did')
    # diary = request.json.get('diary')
    summaries = summarize_script(diary)
    answer = {}
    for summary in summaries:
        answer[summary] = generate_comment(summaries[0])
    
    for a in answer.values():
        result = a.split('.')

    db_class = Database()
    sql = f"""UPDATE dayugi.diary SET review_content = '{result[0] + '.' + result[1]}' WHERE (did = '{did}')"""
    db_class.execute(sql)
    db_class.commit()
    
    return answer

@app.route('/diary/', methods=['POST'])
def emotion_comment():
    did = request.json.get('did')
    diary = request.json.get('diary')
    emotion(did, diary)
    comment(did, diary)

    return '성공적으로 저장되었습니다.'

if __name__=="__main__":
    app.run(debug=True)
    # host 등을 직접 지정하고 싶다면
    # app.run(host="127.0.0.1", port="5000", debug=True)