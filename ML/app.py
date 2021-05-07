from flask import Flask, render_template, request

from module.dbModule import Database

from module.emotion import extract_emotion, BERTClassifier
import torch

model = torch.load('module/checkpoint/kobert_emotion_classification.pth', map_location='cpu')


app = Flask(__name__)

@app.route('/emotion', methods=['POST'])
def emotion():
    sentence = request.json.get('sentence')
    result = extract_emotion(sentence, model)
    return result

@app.route('/comment')
def comment():
    return 'comment'

if __name__=="__main__":
    app.run(debug=True)
    # host 등을 직접 지정하고 싶다면
    # app.run(host="127.0.0.1", port="5000", debug=True)