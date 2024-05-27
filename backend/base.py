import sqlite3
from flask import Flask, render_template, jsonify, json, request
import ast
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection_survey():
    conn = sqlite3.connect('survey.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_db_connection_quiz():
    conn = sqlite3.connect('quiz.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_db_connection_userIDs():
    conn = sqlite3.connect('userIDs.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/survey-db')
def survey():
    conn = get_db_connection_survey()
    values = conn.execute('SELECT * FROM survey').fetchall()
    results = []
    for item in values:
        results.append({k: item[k] for k in item.keys()})
    conn.close()
    return results

@app.route('/quiz-db')
def quiz():
    conn = get_db_connection_quiz()
    values = conn.execute('SELECT * FROM quiz').fetchall()
    results = []
    for item in values:
        results.append({k: item[k] for k in item.keys()})
    conn.close()
    return results

@app.route('/submitsurvey', methods=['POST'])
def submit_survey():
    data = request.json
    # data = str(data)
    # data = ast.literal_eval(data)
    user_id = data['userID']
    q1 = data['q1']
    q2 = data['q2']
    q3 = data['q3']
    q4 = data['q4']
    q5 = data['q5']
    q6 = data['q6']
    q7 = data['q7']
    conn = get_db_connection_survey()
    conn.execute('INSERT INTO survey (userID, q1, q2, q3, q4, q5, q6, q7) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                 (user_id, q1, q2, q3, q4, q5, q6, q7))
    conn.commit()
    conn.close()
    return('inserted')

@app.route('/submitquiz', methods=['POST'])
def submit_quiz():
    data = request.json
    user_id = data['userID']
    pair_id = data['pairID']
    video_1 = data['video1']
    video_2 = data['video2']
    preference = data['prefer']
    popular_vid = data['popular']
    conn = get_db_connection_quiz()
    conn.execute('INSERT INTO quiz (userID, pairID, video1, video2, prefer, popular) VALUES (?, ?, ?, ?, ?, ?)',
                 (user_id, pair_id, video_1, video_2, preference, popular_vid))
    conn.commit()
    conn.close()
    return('inserted')

@app.route('/userIDs')
def userIDs():
    conn = get_db_connection_userIDs()
    values = conn.execute('SELECT * FROM userIDs').fetchall()
    results = []
    for item in values:
        results.append({k: item[k] for k in item.keys()})
    max = -1
    for item in results:
        if int(item['userID']) > max:
            max = item['userID']
    newID = [(int(max + 1))]
    conn.execute('INSERT INTO userIDs (userID) VALUES (?)', newID)
    conn.commit()
    conn.close()
    return newID

@app.route('/updateCategories', methods=['POST'])
def update_categories():
    data = request.json
    with open('videoInfo.json', 'w') as f:
        json.dump(data, f, indent=4)
    return('inserted')