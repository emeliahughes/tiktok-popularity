import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useVideo from "./useVideo";

const baseUrl = "http://127.0.0.1:5000/";
const postUrl = baseUrl + "submitsurvey";

//TODO: generate userIDs on landing page (save to local storage?)

export default function QuizSection(props) {
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let pairs = data.selectedPairs;
    let videoData = data.videoData;
    const navigate = useNavigate();
    const questions = ['Which video do you prefer?', 'Which video do you think is more popular?'];
    const [buttonState, setButtonState] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentPair, setCurrentPair] = useState(0);
    let pair = pairs[currentPair];
    let pairID = pair.pairID;
    let leftVideo = pair.video1;
    let leftVideoData = videoData.find(video => video.id === pair.video1);
    let rightVideo = pair.video2;
    let rightVideoData = videoData.find(video => video.id === pair.video2);
    let pairResponse = {
        pairID: pairID,
        userID: userID,
        video1: leftVideo,
        video2: rightVideo
    }


    const handlePlay = async (video) => {
        console.log('loaded')
        video.play();
    }

    //TODO: update once everything fixed to delete unneeded parameters
    const Video = ( fileName, className, onCanPlayThrough, onEnded, playerID) => {
        const [key, setKey] = useState(fileName)

        const { loading, error, Video } = useVideo(fileName, setKey)
    
        if (error) {
            console.log(error)
            return (<div>'Error'</div>)
        }
        if(loading) return (<div>'Loading'</div>)
        return (
            <>
                {loading ? (
                    <div>'Loading'</div>
                ) : (
                    <video
                        controls
                        id = {playerID}
                        className={className}
                        //onCanPlayThrough={onCanPlayThrough}
                        onMouseOver={event => event.target.play()}
                        onMouseOut={event => event.target.pause()}
                        onTimeUpdate={event => {timeUpdate(event)}}
                        //onEnded={onEnded}
                        key = {key}>
                        <source src={Video} key={key} id={fileName} type="video/mp4"/>
                    </video>
                )}
            </>
        )
    }

    function timeUpdate (event) {
        let currentTime = event.target.currentTime;
        let videoTime = event.target.duration;
        let percentage = currentTime / videoTime;

        //LAST HERE - TODO
        //check to make sure target video has been watched for at least 20 seconds or some percentage
        //add state variables for both variables watch status
        //state variable for both left and right being true --> enable buttons
    }

	const handleAnswerOptionClick = (videoPicked) => {
        //stop timer
        let selectedVideo;
        if(videoPicked == 'Left') {
            selectedVideo = leftVideo;
        } else {
            selectedVideo = rightVideo;
        }
        
        if(currentQuestion != 0) { //Which video do you think was more popular?
            if(leftVideoData.view_count > rightVideoData.view_count){
                if(videoPicked == 'Left') { //TODO: set button colors/coloring for whether correct or not
                    pairResponse.popular = 'correct';
                } else {
                    pairResponse.popular = 'wrong';
                }
            } else {
                if(videoPicked == 'Left') {
                    pairResponse.popular = 'wrong';
                } else {
                    pairResponse.popular = 'correct';
                }
            }
        } else { //Which video do you prefer?
            pairResponse.prefer = selectedVideo;
        }
        
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
            setCurrentQuestion(0);
            nextPair();
		}
	};

    const nextPair = (event) => {
        console.log("in nextPair" + currentPair)
        pushData(pairResponse); //TODO: write backend db for quiz results
        let nextPair = currentPair + 1;
        if (nextPair < pairs.length) {
            setButtonState(true)
            setCurrentPair(currentPair + 1);
            console.log("set new pair" + nextPair)
        } else {
            navigate('/survey', {
                pairdID: pairID,
                userID: userID,
                category: pair.category,
            });
        }
    }

	return (
        <div className='quiz-box container-fluid justify-content-center h-100'>
            <div style={{height: '10%',}} className='quiz-header row align-items-center'>
                <h3 className='col my-2'>Pair {currentPair +1}/{pairs.length}</h3>
            </div>
            <div style={{height: '75%',}} className='playback-section row'>
            <div className='h-100 video-block container-fluid d-flex justify-content-center align-items-center'>
                <div className='h-100 w-100 row justify-content-center align-items-center'>
                    <div className='embed-responsive embed-responsive-16by9 col h-100 d-flex align-items-center justify-content-center' style={{height: 'auto', width: '30%',}}>
                        {Video(leftVideo, 'mh-100 mw-100', () => {handlePlay(document.getElementById('video-player-1'))}, () => {handlePlay(document.getElementById('video-player-2'))}, "video-player-1")}
                    </div>
                    <div className='col-1'></div>
                    <div className='embed-responsive embed-responsive-16by9 col h-100 d-flex align-items-center justify-content-center' style={{height: 'auto', width: '30%',}}>
                        {Video(rightVideo, 'mh-100 mw-100', () => {}, () => {setButtonState(false)}, "video-player-2")}
                    </div>
                    
                </div>
            </div>
            </div>
            <div style={{height: '15%',}} className='row w-100 justify-content-center align-items-center'>
                <div className='col-12 mh-100'>
                    <div className='question-section row d-flex justify-content-center align-items-center py-2'>
                        <div className='question-text col'><h3 className='my-0'>{questions[currentQuestion]}</h3></div>
                    </div>
                    <div className='answer-section justify-content-center py-2 row'>
                        <button className='col-3 col-lg-2 my-2 mx-4 btn btn-primary justify-content-center' onClick={() => handleAnswerOptionClick('Left')} disabled={buttonState}>Left</button>
                        <button className='col-3 col-lg-2 my-2 mx-4 btn btn-primary justify-content-center' onClick={() => handleAnswerOptionClick('Right')} disabled={buttonState}>Right</button>
                    </div>
                </div>
            </div>
        </div>
	);
}

function pushData(respData) {
    let insertData = JSON.stringify(respData);
    console.log(insertData);
    let promise = fetch(postUrl, {
        method: "POST",
        body: insertData,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    promise
    .then(
        resp => {
            console.log(resp)
        }
    )
    .catch(err => console.log(err));
}