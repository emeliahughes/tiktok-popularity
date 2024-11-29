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
    cursor.execute("SELECT * FROM selection_data")
    rows = [dict(row) for row in cursor.fetchall()]  # Convert rows to dictionaries
    print(f"Total rows fetched: {len(rows)}")
    return rows

# Function to count filled columns for a given row, using specific logic if necessary
def count_filled(columns):
    return sum(1 for col in columns if col not in (None, "", "NA"))

# Simulate filling with logic matching the backend route
def simulate_filling(rows, num_pairs, target_filled_count=3):
    print(f"Starting simulation to fill all eligible pairs with at least {target_filled_count} filled columns...")
    count = 0
    max_iterations = 1000000  # Safety limit to avoid infinite loops

    eligible_pairs = [row for row in rows if count_filled([row[f"user_pref_{i}"] for i in range(1, 18)]) < target_filled_count]

    if not eligible_pairs:
        print("No eligible pairs found that need filling.")
        return

    while count < max_iterations:
        count += 1
        if count % 1000 == 0:  # Print progress every 1000 iterations
            print(f"Simulation round: {count}")

        # Shuffle eligible pairs
        random.shuffle(eligible_pairs)

        # Select the first `num_pairs` from the shuffled eligible pairs
        selected_pairs = eligible_pairs[:num_pairs]

        # If not enough eligible pairs, select randomly from all pairs
        if len(selected_pairs) < num_pairs:
            additional_pairs = random.sample(rows, num_pairs - len(selected_pairs))
            selected_pairs.extend(additional_pairs)

        # Mark one of the "user_pref_" columns as "filled" in the selected pairs
        for pair in selected_pairs:
            selected_columns = [f"user_pref_{i}" for i in range(1, 18)]
            for column in selected_columns:
                if pair[column] not in ["NA", "", None]:
                    continue
                pair[column] = "filled"  # Mark the first empty column as filled
                break

        # Check if all eligible pairs have at least `target_filled_count` filled columns
        if all(count_filled([pair[f"user_pref_{i}"] for i in range(1, 18)]) >= target_filled_count for pair in eligible_pairs):
            print("All eligible pairs have at least 5 filled columns.")
            break

        # Debug: Print progress every 10,000 iterations
        if count % 10000 == 0:
            filled_counts = [count_filled([pair[f"user_pref_{i}"] for i in range(1, 18)]) for pair in eligible_pairs]
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
