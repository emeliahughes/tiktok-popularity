import sqlite3
from flask import Flask, render_template, jsonify, json, request
import ast
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('survey.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    return render_template('index.html', posts=posts)

@app.route('/profile')
def my_profile():
    conn = get_db_connection()
    values = conn.execute('SELECT * FROM survey').fetchall()
    results = []
    for item in values:
        results.append({k: item[k] for k in item.keys()})
    conn.close()
    return results


@app.route('/submitsurvey', methods=['POST'])
def submit_survey():
    data = request.json
    data = str(data)
    data = ast.literal_eval(data)
    pair_id = data['pairID']
    q1 = data['q1']
    q2 = data['q2']
    q3 = data['q3']
    q4 = data['q4']
    q5 = data['q5']
    q6 = data['q6']
    q7 = data['q7']
    conn = get_db_connection()
    conn.execute('INSERT INTO survey (pairID, q1, q2, q3, q4, q5, q6, q7) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                 (pair_id, q1, q2, q3, q4, q5, q6, q7))
    conn.commit()
    conn.close()