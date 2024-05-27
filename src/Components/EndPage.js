import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import jsonData from './videoInfo.json';

export default function Ending(props) {
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let score = data.score;
    const navigate = useNavigate();
    let playedAlready = true;

    let loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;
    let pairData = loadData.pairs;

    let shuffled = pairData.sort(function(){ return 0.5 - Math.random() });
    let sliceEnd = 5
    let pairs = shuffled.slice(0, sliceEnd);


    const handlePlay = async (event) => {
        event.preventDefault();
        
        navigate('/quiz', {state: {
            userID: userID,
            selectedPairs: pairs,
            videoData: videoData,
            playedAlready: playedAlready}
        });

    }

    return (
        <div className='container-flex h-100'>
            <div className='h-100 row align-items-center'>
                <div className='col'>
                    <div className='row align-items-center'>
                        <h2>Thanks for playing!</h2>
                    </div>
                    <div className='row align-items-center'>
                        <h4>Final score: {score}/5</h4>
                    </div>
                    <div className='row'><br></br></div>
                    <div className='row align-items-center'>
                        <div className='col'/>
                        <button type="button" onClick={handlePlay} className="col btn btn-dark p-15" id="play-button"><h3 className='m-2'><strong aria-label="Play">Play Again</strong></h3></button>
                        <div className='col'/>
                    </div>
                </div>
            </div>
        </div>
    );
}