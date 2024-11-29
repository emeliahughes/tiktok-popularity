import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jsonData from './videoInfo.json';

const baseUrl = "http://127.0.0.1:5000/";

export default function Landing(props) {
    const navigate = useNavigate();
    let numPairs = 10;
    let loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;
    let pairData = loadData.pairs;

    const [userID, setUserID] = useState(0);
    const [pairs, setPairs] = useState([]);

    useEffect(() => {
        // Fetch the user ID when the component mounts
        fetch(baseUrl + "/userIDs")
            .then((res) => res.json())
            .then((data) => {
                if (data[0] != undefined) {
                    setUserID(data[0]);
                }
            });
    }, []);

    useEffect(() => {
        // Fetch the selected pairs from the backend
        async function fetchSelectedPairs() {
            try {
                const response = await fetch(baseUrl + "/select-pairs", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ numPairs })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch selected pairs');
                }

                const selectedPairIds = await response.json();

                // Filter the pairData based on the selected pair IDs
                const selectedPairs = pairData.filter(pair => selectedPairIds.includes(pair.pairID));
                setPairs(selectedPairs);

            } catch (error) {
                console.error('Error fetching selected pairs:', error);
            }
        }

        fetchSelectedPairs();
    }, [numPairs, pairData]);

    const handlePlay = async (event) => {
        event.preventDefault();
        
        console.log(pairs)
        navigate('/consent', {state: {
            userID: userID,
            pairData: pairs,
            videoData: videoData,
            numPairs: numPairs}
        });

    }

    return (
        <div className='container-flex h-100'>
            <div className='h-100 row align-items-center'>
                <div className='col'>
                    <div className='row' style={{margin: "40px"}}>
                        <div className='col'>
                            <h1 className='space-mono-bold'>TokOrNot</h1>
                            <h4>Rate the TikTok</h4>
                        </div>
                    </div>
                    <div className='row' style={{margin: "40px"}}>
                        <div className='col-sm-3 col-xl-4' />
                        <div className='col-md-6 col-xl-4'>
                            <p className='space-mono-bold-italic'>Can you figure out which TikTok is more popular?</p>
                            <p>Watch each of the TikTok videos by moving your mouse over the video or clicking play.</p>
                            <p>Once you have watched at least 90% of both videos, the question buttons will be enabled. Tell us which video you prefer, then which video you think is more popular. </p>
                        </div>
                        <div className='col-sm-3 col-xl-4' />
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-5 col-3'/>
                        <button type="button" onClick={handlePlay} className="col btn btn-dark p-15" id="play-button"><h3 className='m-2'><strong aria-label="Play">Play</strong></h3></button>
                        <div className='col-md-5 col-3'/>
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

