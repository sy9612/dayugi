from flask import Flask, render_template, request

from module.dbModule import Database

from module.emotion import extract_emotion, BERTClassifier
from module.summary import summarize_script
from module.comment import generate_comment
import torch


app = Flask(__name__)

emotion_model = torch.load('module/checkpoint/kobert_emotion_classification.pth', map_location='cpu')
emotion_model.eval()

@app.route('/emotion', methods=['POST'])
def emotion():
    diary = request.json.get('diary').split('\n')
    print(diary)
    analysis = {'Angry' : 0,
                'Disgust' : 0,
                'Fear' : 0,
                'Happiness' : 0,
                'Neutral' : 0,
                'Sadness' : 0,
                'Surprise' : 0}
                
    for sentence in diary:
        if len(sentence) > 5:
            result = extract_emotion(sentence, emotion_model)
            for key, value in result.items():
                analysis[key] += value

    return analysis


@app.route('/comment', methods=['POST'])
def comment():
    diary = request.json.get('diary')
    summaries = summarize_script(diary)
    answer = {}
    for summary in summaries:
        answer[summary] = generate_comment(summaries[0])

    return answer


if __name__=="__main__":
    app.run(debug=True)
    # host 등을 직접 지정하고 싶다면
    # app.run(host="127.0.0.1", port="5000", debug=True)