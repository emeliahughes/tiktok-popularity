import sqlite3
import json
import random

# Connect to the SQLite database
conn = sqlite3.connect('selection.db')
conn.row_factory = sqlite3.Row  # Ensures rows are returned as dictionaries
cursor = conn.cursor()

# Function to get all rows from the table and convert them to dictionaries
def get_all_rows():
    print("Fetching all rows from the 'selection_data' table...")
    cursor.execute("SELECT * FROM selection_data WHERE (user_prediction_1 != 'NA') + (user_prediction_2 != 'NA') + (user_prediction_3 != 'NA') + (user_prediction_4 != 'NA') + (user_prediction_5 != 'NA') + (user_prediction_6 != 'NA') +(user_prediction_7 != 'NA') + (user_prediction_8 != 'NA') + (user_prediction_9 != 'NA') + (user_prediction_10 != 'NA') + (user_prediction_11 != 'NA') + (user_prediction_12 != 'NA') + (user_prediction_13 != 'NA') + (user_prediction_14 != 'NA') + (user_prediction_15 != 'NA') + (user_prediction_16 != 'NA') + (user_prediction_17 != 'NA') >= 2")
    # cursor.execute("SELECT * FROM selection_data")
    rows = [dict(row) for row in cursor.fetchall()]  # Convert rows to dictionaries
    print(f"Total rows fetched: {len(rows)}")
    return rows

# Function to count filled columns for a given row, using specific logic if necessary
def count_filled(columns):
    return sum(1 for col in columns if col not in (None, "", "NA"))

# Simulate filling with logic matching the backend route
def simulate_filling(rows, num_pairs, target_filled_count=5):
    print(f"Starting simulation to fill all eligible pairs with at least {target_filled_count} filled columns...")
    count = 0
    max_iterations = 1000000  # Safety limit to avoid infinite loops

    while count < max_iterations:
        # Recalculate eligible pairs each round based on current state.
        eligible_pairs = [
            row for row in rows 
            if count_filled([row[f"user_pref_{i}"] for i in range(1, 18)]) < target_filled_count
        ]
        if not eligible_pairs:
            print("All eligible pairs have reached the target fill count.")
            break

        count += 1
        if count % 1000 == 0:
            print(f"Simulation round: {count}")

        # Shuffle eligible pairs
        random.shuffle(eligible_pairs)
        
        # Only select from the eligible pairs; do not add random rows from the full set.
        if len(eligible_pairs) >= num_pairs:
            selected_pairs = eligible_pairs[:num_pairs]
        else:
            selected_pairs = eligible_pairs

        # For each selected row, fill one empty column
        for pair in selected_pairs:
            for column in [f"user_pref_{i}" for i in range(1, 18)]:
                if pair[column] in ["NA", "", None]:
                    pair[column] = "filled"
                    break

        # Optional debug output every 10,000 rounds
        if count % 10000 == 0:
            filled_counts = [
                count_filled([pair[f"user_pref_{i}"] for i in range(1, 18)])
                for pair in eligible_pairs
            ]
            print(f"Round {count} - Filled counts for eligible pairs: {filled_counts}")
    else:
        print("Reached maximum iteration limit without completing the simulation.")

    print(f"Total rounds needed to fill all eligible pairs: {count}")


# Main script execution
if __name__ == "__main__":
    rows = get_all_rows()
    num_pairs = 10  # Number of pairs to select
    simulate_filling(rows, num_pairs)
    conn.close()
