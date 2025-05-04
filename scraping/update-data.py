import json
import csv

# --- Load Data ---
with open("original.json") as f:
    original_data = json.load(f)

with open("updated.json") as f:
    updated_videos = json.load(f)

# --- Create lookup dictionary for updated videos ---
updated_video_lookup = {str(video["id"]): video for video in updated_videos}

# --- Helper: Assign level based on view count ---
def get_level(view_count):
    if view_count > 3000000:
        return "viral"
    elif view_count > 1000000:
        return "high"
    elif view_count > 250000:
        return "medium"
    elif view_count > 10000:
        return "low"
    else:
        return "very_low"

# --- Update videos with new stats ---
updated_video_data = []
for video in original_data["videos"]:
    vid_id = str(video["id"])
    if vid_id in updated_video_lookup:
        updated = updated_video_lookup[vid_id]
        category = video.get("category", None)
        updated_entry = {
            **updated,
            "id": vid_id,
            "category": category
        }
        updated_video_data.append(updated_entry)
    else:
        updated_video_data.append(video)

# --- Update pairs with new video levels ---
updated_pair_data = []
for pair in original_data["pairs"]:
    v1_id = str(pair["video1"])
    v2_id = str(pair["video2"])

    v1_views = updated_video_lookup.get(v1_id, {}).get("view_count", 0)
    v2_views = updated_video_lookup.get(v2_id, {}).get("view_count", 0)

    v1_level = get_level(v1_views)
    v2_level = get_level(v2_views)

    pair["video1Level"] = v1_level
    pair["video2Level"] = v2_level
    pair["pairLevel"] = f"{v1_level}-{v2_level}" if v1_level != v2_level else v1_level

    updated_pair_data.append(pair)

# --- Write video-data.csv ---
with open("video-data.csv", "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=list(updated_video_data[0].keys()))
    writer.writeheader()
    writer.writerows(updated_video_data)

# --- Write pair-data.csv ---
with open("pair-data.csv", "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=list(updated_pair_data[0].keys()))
    writer.writeheader()
    writer.writerows(updated_pair_data)
