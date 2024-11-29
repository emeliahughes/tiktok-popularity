import sqlite3
import json

# Path to your JSON file
json_file_path = 'survey_results.json'
db_file_path = 'selection.db'

# Load the JSON data
with open(json_file_path, 'r') as f:
    data = json.load(f)

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect(db_file_path)
cursor = conn.cursor()

# Get column names from the first entry in the JSON
columns = [key for key in data[0].keys() if key.strip() != ""]  # Exclude empty column names
columns_str = ', '.join(columns)
placeholders = ', '.join(['?'] * len(columns))

# Construct the CREATE TABLE query with column names
create_table_query = f"""
CREATE TABLE IF NOT EXISTS selection_data (
    {', '.join([f"{col} TEXT" for col in columns])}
);
"""

# Execute the CREATE TABLE query
cursor.execute(create_table_query)

# Insert the JSON data into the table
for entry in data:
    # Extract values for each column in the entry
    values = [entry[col] for col in columns]

    # Debug: Print the SQL query and values to check formatting
    print(f"SQL Query: INSERT INTO selection_data ({columns_str}) VALUES ({placeholders})")
    print(f"Values: {values}")

    cursor.execute(f"INSERT INTO selection_data ({columns_str}) VALUES ({placeholders})", values)

# Commit and close the connection
conn.commit()
conn.close()

print("Database and table created, and data inserted successfully.")
