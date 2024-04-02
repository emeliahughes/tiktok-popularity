#!/bin/bash

result=$(curl --location --request POST 'https://open.tiktokapis.com/v2/oauth/token/' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Cache-Control: no-cache' \
    --data-urlencode 'client_key=awgvauhwqlugk6oz' \
    --data-urlencode 'client_secret=UbobBlvVpGLnv4jeBVgcM4astVieobMZ' \
    --data-urlencode 'grant_type=client_credentials')

access_token=$(jq -r '.access_token' <<< ${result})

# videoIDTest="7341796912883862814"
# test=$(curl -X POST \
#         'https://open.tiktokapis.com/v2/research/video/query/?fields=id,create_time,username,video_description,like_count,comment_count,share_count,view_count' \
#         -H "authorization: bearer ${access_token}" \
#         -d '{ 
#         "query": {
#             "and": [
#                { "operation": "IN", "field_name": "video_id", "field_values": ["'${videoIDTest}'"] }
#             ]
#         }, 
#             "start_date": "20240301",
#             "end_date": "20240328"
#         }')

# testData=$(jq -r '.data.videos' <<< ${test})
# testData=${testData:1:${#testData}-2}
# testData = $testData | fromjson

# if [[ -z "${testData[@]}" ]]; then
#     echo "no result"
#   else
#     newFile=$(jq --argjson newVideo "$testData" '.videos += [$newVideo]' videoInfo.json)
#     echo $newFile > videoInfo.json
# fi
startDates=("20230101" "20230201" "20230301" "20230401" "20230501" "20230601" "20230701" "20230801" "20230901" "20231001" "20231101" "20231201" "20240101" "20240201" "20240301" "20240401")
endDates=("20230131" "20230228" "20230331" "20230430" "20230531" "20230630" "20230731" "20230831" "20230930" "20231031" "20231130" "20231231" "20240131" "20240229" "20240331" "20240430")

length=${#startDates[@]}
length=$((length - 1))
echo $length

videoIDArray=() 

while read line
do
    videoIDArray+=("$line")
done < videosTest.txt

for ((i=0;i<length;i++));
do
    for videoID in "${videoIDArray[@]}"
    do
        result=$(curl -X POST \
            'https://open.tiktokapis.com/v2/research/video/query/?fields=id,create_time,username,video_description,like_count,comment_count,share_count,view_count' \
            -H "authorization: bearer ${access_token}" \
            -d '{ 
            "query": {
                "and": [
                { "operation": "IN", "field_name": "video_id", "field_values": ["'${videoID}'"] }
                ]
            }, 
                "start_date": "'${startDates[$i]}'",
                "end_date": "'${endDates[$i]}'"
            }')

        resultData=$(jq -r '.data.videos' <<< ${result})
        resultData=${resultData:1:${#resultData}-2}
        #resultData=$($resultData | fromjson)
        
        if [[ -z "${resultData[@]}" ]]; then
            echo "no result"
        else
            newFile=$(jq --argjson newVideo "$resultData" '.videos += [$newVideo]' videoInfo.json)
            echo $newFile > videoInfo.json
            videoIDArray=("${videoIDArray[@]/$videoID}")
        fi
    done
done



