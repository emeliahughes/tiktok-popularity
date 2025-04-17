import json

# Load the JSON data from a file (replace 'file.json' with your filename)
with open('survey_results.json') as f:
    videos = json.load(f)

# Counter for videos meeting the condition
videos_with_few_predictions = 0

# Iterate through each video
for video in videos:
    # Collect all keys that start with 'user_prediction_'
    user_predictions = [value for key, value in video.items() if key.startswith("user_prediction_")]
    # Count the ones that are not 'NA'
    non_na_count = sum(1 for pred in user_predictions if pred != "NA")
    
    # Check if the count is 0 or 1
    if non_na_count >= 2:
        videos_with_few_predictions += 1

print("Number of videos with 0 or 1 user_predictions not 'NA':", videos_with_few_predictions)
