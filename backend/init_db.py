import sqlite3

connection = sqlite3.connect('survey.db')

cur = connection.cursor()

cur.execute("CREATE TABLE survey (userID INTEGER PRIMARY KEY AUTOINCREMENT, pairID INTEGER, created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, q1 TEXT NOT NULL, q2 TEXT NOT NULL, q3 TEXT NOT NULL, q4 TEXT NOT NULL, q5 TEXT NOT NULL, q6 TEXT NOT NULL, q7 TEXT NOT NULL)")


cur.execute("INSERT INTO survey (q1, q2, q3, q4, q5, q6, q7) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Several days', 'Several days', 'Several days', 'Several days', 'Several days', 'Several days', 'Several days')
            )

cur.execute("INSERT INTO survey (q1, q2, q3, q4, q5, q6, q7) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ('Several days', 'Several days', 'Several days', 'Several days', 'Several days', 'Several days', 'Several days')
            )


connection.commit()
connection.close()
