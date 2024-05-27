import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jsonData from './videoInfo.json';

const baseUrl = "http://127.0.0.1:5000/";

export default function Landing(props) {
    const navigate = useNavigate();

    let loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;
    let pairData = loadData.pairs;

    const [userID, setUserID] = useState(0)
    useEffect(() => {
        fetch(baseUrl + "/userIDs")
        .then((res) => res.json())  
        .then((data) => {
            if(data[0] != undefined) {
                setUserID(data[0]);
            }
          });
      }, []);


    let shuffled = pairData.sort(function(){ return 0.5 - Math.random() });
    let sliceEnd = 5
    let pairs = shuffled.slice(0, sliceEnd);
    let allVidIDs = [];

    // for (var onePair of pairs) {
    //     allVidIDs.push(onePair.video1);
    //     allVidIDs.push(onePair.video2);
    // }

    // const findDuplicates = (arr) => {
    //     let sorted_arr = arr.slice().sort(); 
    //     let results = [];
    //     for (let i = 0; i < sorted_arr.length - 1; i++) {
    //       if (sorted_arr[i + 1] == sorted_arr[i]) {
    //         results.push(sorted_arr[i]);
    //       }
    //     }
    //     return results;
    // }
    
    // let uniqueVidIDs = findDuplicates(allVidIDs)
    // if (uniqueVidIDs.length != 0) {
    //     while (uniqueVidIDs.length != 0) {
    //         let testID = uniqueVidIDs.pop();
    //         for (let i = 0; i < pairs.length; i++) {
    //             if ((pairs[i].video1 == testID) || (pairs[i].video2 == testID)) {
    //                 let removedPair = pairs.splice(i, 1);

    //                 const index1 = allVidIDs.indexOf(removedPair.video1);
    //                 const index2 = allVidIDs.indexOf(removedPair.video2);

    //                 if (index1 > -1) {
    //                     allVidIDs.splice(index1, 1);
    //                 }
    //                 if (index2 > -1) { 
    //                     allVidIDs.splice(index2, 1); 
    //                 }

    //                 let newPair = shuffled.slice(sliceEnd, sliceEnd + 1);
    //                 pairs.push(newPair);
    //                 allVidIDs.push(newPair.video1);
    //                 allVidIDs.push(newPair.video2);

    //                 uniqueVidIDs = findDuplicates(allVidIDs)

    //                 sliceEnd++;
    //                 break;
    //             }
    //         }
    //     }

    // }
    

    // let shuffled = pairs.sort(function(){ return 0.5 - Math.random() });
    // let selectedPairs = shuffled.slice(0,5);

    const handlePlay = async (event) => {
        event.preventDefault();
        
        console.log(pairs)
        navigate('/consent', {state: {
            userID: userID,
            pairData: pairs,
            videoData: videoData}
        });

    }

    return (
        <div className='container-flex h-100'>
            <div className='h-100 row align-items-center'>
                <div className='col'>
                    <div className='row align-items-center'>
                        <div className='col'/>
                        <button type="button" className="col btn btn-dark p-15" id="info-button"><h3 className='m-2'><strong aria-label="Info">Info</strong></h3></button>
                        <div className='col'/>
                        <button type="button" onClick={handlePlay} className="col btn btn-dark p-15" id="play-button"><h3 className='m-2'><strong aria-label="Play">Play</strong></h3></button>
                        <div className='col'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getUserID() {
    let requestUrl = baseUrl + "/userIDs";
    return fetch(requestUrl)
    .catch(err => console.log(err));
}