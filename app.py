from flask import Flask, render_template, request, jsonify, abort
from diff import textDiff

app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route('/')
def index():
    return render_template('main.html')


@app.route('/diff', methods=["POST"])
def diff():
    json_response = request.json
    if check_json_response(json_response):
        return jsonify({'text': textDiff(json_response['doc1'], json_response['doc2'])})
    else:
        return abort(400)


def check_json_response(json):
    return 'doc1' in json and 'doc2' in json


if __name__ == '__main__':
    app.run()
