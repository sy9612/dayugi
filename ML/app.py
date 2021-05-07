from flask import Flask, render_template

from module.dbModule import Database


app = Flask(__name__)

@app.route('/emotion')
def emotion():
    return 'emotion'

@app.route('/comment')
def comment():
    return 'comment'

if __name__=="__main__":
    app.run(debug=True)
    # host 등을 직접 지정하고 싶다면
    # app.run(host="127.0.0.1", port="5000", debug=True)