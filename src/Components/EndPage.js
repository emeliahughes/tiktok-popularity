import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import jsonData from './videoInfo.json';

export default function Ending(props) {
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let score = data.score;
    let numPairs = data.numPairs;
    const navigate = useNavigate();
    let playedAlready = true;

    let loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;
    let pairData = loadData.pairs;

    let shuffled = pairData.sort(function(){ return 0.5 - Math.random() });
    let sliceEnd = numPairs;
    let pairs = shuffled.slice(0, sliceEnd);

    let href = "https://twitter.com/intent/tweet?text=I%20got%20" + score + "%20%2F%205,%20what%20can%20you%20get?%20https%3A%2F%2FTokOrNot.com%2F"

    const handlePlay = async (event) => {
        event.preventDefault();
        
        navigate('/quiz', {state: {
            userID: userID,
            selectedPairs: pairs,
            videoData: videoData,
            numPairs: numPairs,
            playedAlready: playedAlready}
        });

    }

    return (
        <div className='container-flex h-100'>
            <div className='h-100 row align-items-center'>
                <div className='col'>
                    <div className='col p-sm-3 py-3'>
                        <h1 className='space-mono-bold'>TokOrNot</h1>
                        <h4>Rate the TikTok</h4>
                    </div>
                    <div className='row mb-5'><br></br></div>
                    <div className='row mb-5'><br></br></div>
                    <div className='row align-items-center py-2'>
                        <h2>Thanks for playing!</h2>
                    </div>
                    <div className='row align-items-center mb-3'>
                        <h4>Final score: {score}/{numPairs}</h4>
                    </div>
                    <div className='row mb-2'><br></br></div>
                    <div className='row align-items-center mb-5'>
                        <div className='col'/>
                        <button type="button" onClick={handlePlay} className="col-7 btn btn-dark p-15" id="play-button"><h3 className='m-2 space-mono-bold' aria-label="Play">Play Again</h3></button>
                        <div className='col'/>
                        
                    </div>
                    <div className='row'>
                        <div className='col'/>
                        <div className='col'>
                            <div className="btn btn-dark align-items-center" data-href="https://www.TokOrNot.com" data-layout="" data-size="">
                                <a className="" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.TokOrNot.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                                    <img className='mx-0' id="fb-logo" src="fb-logo-white.png"></img>
                                    Share
                                </a>
                            </div>
                        </div>
                        
                        <div className='col'>
                            <a class="btn btn-dark"
                                href={href}
                                id="twitter-button"
                                data-size="large">
                                    <img className='mx-0' id="twitter-logo" src="X_logo_2023_(white).png"></img>
                                Tweet</a>
                        </div> 
                        <div className='col'/>
                    </div>
                    <div className='row mb-5'><br></br></div>
                    <div className='row mb-5'><br></br></div>
                </div>
            </div>
        </div>
    );
}