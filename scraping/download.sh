#!/bin/bash


while read line
do
    url="https://www.tiktok.com/${line}"
    id=${line#*/*/}
    python3 -m tiktok_downloader --snaptik --url $url --save videos/$id.mp4
done < newVideosWCreator.txt

#python3 -m tiktok_downloader --snaptik --url https://www.tiktok.com/@cintaazara6/video/7348274132049562886 --save 7348274132049562886.mp4