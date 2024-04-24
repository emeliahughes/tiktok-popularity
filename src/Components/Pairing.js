import React, { useState, useEffect } from 'react';
import jsonData from './videoInfo.json' //need to switch where other videoInfo file is as this one doesn't have categories currently

export default function Pairing(props) {
    let loadData = props.videoData;
    let videoData = loadData.videos;
    let posCategories = props.categories;
    let levels = ["viral", "high", "medium", "low", "very_low"];
    let sortedVideos = { };
    let pairs = [];

    for (var category of posCategories) {
        sortedVideos[category] = {
            viral: [],
            high: [],
            medium: [],
            low: [],
            very_low: []
        };
    }
    for (var video of videoData) {
        let category = video.category;
        let videoLevel = video.view_count;

        if ( videoLevel > 3000000 ) {
            sortedVideos[category].viral.push(video)
        } else if ( videoLevel > 1000000 ) {
            sortedVideos[category].high.push(video)
        } else if ( videoLevel > 250000 ) {
            sortedVideos[category].medium.push(video)
        } else if ( videoLevel > 10000 ) {
            sortedVideos[category].low.push(video)
        } else {
            sortedVideos[category].very_low.push(video)
        }
    }

    console.log("------- Number of Videos -------")

    for (var category of posCategories) {
        console.log("Category: " + category)
        for (let level = 0; level < levels.length; level++) {
            let numVideos = sortedVideos[category][levels[level]].length;
            console.log(levels[level] + ": " + numVideos)
        }
    }

    let pairID = 0;

    for (var category of posCategories) {
        for (let currLevel = 0; currLevel < levels.length; currLevel++){ 
            if (sortedVideos[category][levels[currLevel]].length > 0) {
                for (var video1 of sortedVideos[category][levels[currLevel]]) {
                    let nextLevel = currLevel + 1;
                    while (nextLevel < levels.length) {
                        if (sortedVideos[category][levels[nextLevel]].length > 0) {
                            for (var video2 of sortedVideos[category][levels[nextLevel]]) {
                                let newPair = {};
                                let video1Level = Object.keys(sortedVideos[category])[currLevel];
                                let video2Level = Object.keys(sortedVideos[category])[nextLevel];
        
                                newPair.pairID = pairID;
                                newPair.category = category;
                                newPair.pairLevel = video1Level + "-" + video2Level;
        
                                let randomSide = Math.random();
                                if (randomSide < 0.5) {
                                    newPair.video1 = video1.id;
                                    newPair.video2 = video2.id;
                                    newPair.video1Level = video1Level;
                                    newPair.video2Level = video2Level;
                                } else {
                                    newPair.video1 = video2.id;
                                    newPair.video2 = video1.id;
                                    newPair.video1Level = video2Level;
                                    newPair.video2Level = video1Level;
                                }
                                pairs.push(newPair);
                                pairID++;
                            }
                        }
                        nextLevel++;
                    }
                }
            }
        }
    }

    loadData.pairs = pairs;
    
    return loadData;
}