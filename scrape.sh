#!/bin/bash

result=$(curl --location --request POST 'https://open.tiktokapis.com/v2/oauth/token/' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Cache-Control: no-cache' \
    --data-urlencode 'client_key=awgvauhwqlugk6oz' \
    --data-urlencode 'client_secret=UbobBlvVpGLnv4jeBVgcM4astVieobMZ' \
    --data-urlencode 'grant_type=client_credentials')

access_token=$(jq -r '.access_token' <<< ${result})

echo $result
echo $access_token


arr=() 

while read line
do
    arr+=("$line")
done < videos.txt

curl -X POST \
'https://open.tiktokapis.com/v2/research/video/query/?fields=id,create_time,username,video_description,like_count,comment_count,share_count,view_count' \
-H "authorization: bearer ${access_token}" \
-d '{ 
        "query": {
            "and": [
            { "operation": "IN", "field_name": "video_id", "field_values": ["${arr}"] }
            ]
        }, 
        "start_date": "20230801",
        "end_date": "20230828"
    }' \
>> "videoInfo.json"

