import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jsonData from './videoInfo.json';

const baseUrl = "http://127.0.0.1:5000/";

export default function Landing(props) {
    const navigate = useNavigate();
    const numPairs = 10;  // Number of pairs to select
    let loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;

    const [userID, setUserID] = useState(0);
    const [pairs, setPairs] = useState([]);

    // Fetch user ID when component mounts
    useEffect(() => {
        console.log("Fetching user ID...");
        fetch(baseUrl + "/userIDs")
            .then((res) => res.json())
            .then((data) => {
                if (data[0] !== undefined) {
                    console.log("User ID received:", data[0]);  // Debug log
                    setUserID(data[0]);
                }
            })
            .catch((err) => console.error("Error fetching user ID:", err));
    }, []);

    // Fetch the selected pairs from the backend
    useEffect(() => {
        async function fetchSelectedPairs() {
            try {
                console.log("Fetching selected pairs...");
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

                const selectedPairs = await response.json();
                console.log("Selected pairs received:", selectedPairs);  // Debug log
                setPairs(selectedPairs);  // Directly setting API response

            } catch (error) {
                console.error('Error fetching selected pairs:', error);
            }
        }

        fetchSelectedPairs();
    }, []);  // Empty dependency array ensures this only runs once

    useEffect(() => {
        console.log("Pairs state updated:", pairs);  // Debugging re-renders
    }, [pairs]);

    useEffect(() => {
        console.log("User ID state updated:", userID);
    }, [userID]);

    const handlePlay = async (event) => {
        event.preventDefault();
        
        console.log("Navigating to consent page with:", {
            userID: userID,
            pairData: pairs,
            videoData: videoData,
            numPairs: numPairs
        });

        navigate('/consent', { state: {
            userID: userID,
            pairData: pairs,
            videoData: videoData,
            numPairs: numPairs }
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
                            <p>Once you have watched at least 90% of both videos, the question buttons will be enabled. Tell us which video you prefer, then which video you think is more popular.</p>
                        </div>
                        <div className='col-sm-3 col-xl-4' />
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-5 col-3'/>
                        <button type="button" onClick={handlePlay} className="col btn btn-dark p-15" id="play-button">
                            <h3 className='m-2'><strong aria-label="Play">Play</strong></h3>
                        </button>
                        <div className='col-md-5 col-3'/>
                    </div>
                </div>
            </div>
        </div>
    );
}
