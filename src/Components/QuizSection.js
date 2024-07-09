import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useVideo from "./useVideo";
import Modal from './Modal';

const baseUrl = "http://127.0.0.1:5000/";
const postUrl = baseUrl + "submitquiz";

//TODO: generate userIDs on landing page (save to local storage?)

export default function QuizSection(props) {
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let pairs = data.selectedPairs;
    let numPairs = data.numPairs;
    let videoData = data.videoData;
    let playedAlready = data.playedAlready;
    const navigate = useNavigate();
    const questions = ['Which video do you prefer?', 'Which video do you think is more popular?'];
    const [isModalOpen, setModalOpen] = useState(false);
    const [popupChildren, setPopupChildren] = useState(true);
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
    const [pairResponseState, setPairResponseState] = useState(pairResponse);
    const [video1Played, setVideo1Played] = useState(false);
    const [video2Played, setVideo2Played] = useState(false);
    const [videosPlayed, setVideosPlayed] = useState(false);
    const [score, setScore] = useState(0);
    const [videoPick, setVideoPick] = useState('initial')
    const [pickAnswer, setPickAnswer] = useState('initial');
    const [leftVideoViewCount, setLeftVideoViewCount] = useState(0);
    const [rightVideoViewCount, setRightVideoViewCount] = useState(0);

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

    function closePopup() {
        setTimeout(() => setModalOpen(false), 5000)
    }

    //Check how much of each video has been watched and enable buttons once 90% of both videos have been watched
    function timeUpdate (event) {
        let currentTime = event.target.currentTime;
        let videoTime = event.target.duration;
        let percentage = currentTime / videoTime;

        if (percentage > 0.9 || (videoTime > 40 && currentTime > 30)) {
            if (event.target.id == "video-player-1") {
                setVideo1Played(true);
            } else {
                setVideo2Played(true);
            }
        }

        let bothWatched = (video1Played && video2Played);

        setVideosPlayed(bothWatched);

        if (videosPlayed) {
            setButtonState(false)
        }
    }

    //Once a question has been clicked, it deals with the response and moves on to the next question. For the preference question, a popup is triggered
	const handleAnswerOptionClick = (videoPicked) => {
        let selectedVideo;
        if(videoPicked == 'Left') {
            selectedVideo = leftVideo;
        } else {
            selectedVideo = rightVideo;
        }
        

        pairResponse = pairResponseState;

        if(currentQuestion != 0) { //Which video do you think was more popular?
            if(leftVideoData.view_count > rightVideoData.view_count){
                if(videoPicked == 'Left') { 
                    pairResponse.popular = 'correct';
                    setScore(score + 1);
                } else {
                    pairResponse.popular = 'wrong';
                }
            } else {
                if(videoPicked == 'Left') {
                    pairResponse.popular = 'wrong';
                } else {
                    pairResponse.popular = 'correct';
                    setScore(score + 1);
                }
            }
            setVideoPick(videoPicked);
            setPickAnswer(pairResponse.popular);
            setLeftVideoViewCount(leftVideoData.view_count);
            setRightVideoViewCount(rightVideoData.view_count);
            setPairResponseState(pairResponse)
            if(pairResponse.popular === 'correct') {
                //set children for correct popup
                setPopupChildren(true);
            } else {
                //set children wrong popup
                setPopupChildren(false);
            }
            setModalOpen(true);
            closePopup();

        } else { //Which video do you prefer?
            pairResponse.pairID = pair.pairID;
            pairResponse.video1 = pair.video1;
            pairResponse.video2 = pair.video2;
            pairResponse.prefer = selectedVideo;
            setPairResponseState(pairResponse)
            console.log(pairResponseState)
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
        console.log(pairResponse)
        pushData(pairResponse); //TODO: write backend db for quiz results
        let nextPair = currentPair + 1;
        if (nextPair < numPairs) {
            setButtonState(true)
            setVideo1Played(false)
            setVideo2Played(false)
            setVideosPlayed(false)
            setCurrentPair(currentPair + 1);
            console.log("set new pair" + nextPair)
        } else {
            if (playedAlready) {
                navigate('/endpage', {state: {
                    userID: userID,
                    numPairs: numPairs,
                    score: score}
                });
            } else {
                navigate('/survey', {state: {
                    userID: userID,
                    numPairs: numPairs,
                    score: score}
                });
            }
        }
    }

	return (
        <div className='quiz-box container-fluid justify-content-center h-100'>
            <div className='row align-items-center'>
                <div className='col-sm-1' />
                <div className='col p-sm-3 py-3'>
                    <h1 className='space-mono-bold'>TokOrNot</h1>
                    <h4>Rate the TikTok</h4>
                </div>
                <div className='col p-sm-3 py-2'>
                    <h4 className='col my-2'>Pair: {currentPair +1}/{numPairs}</h4>
                    <h4 className='col my-2'>Score: {score}/{numPairs}</h4>
                </div>
                <div className='col-sm-1' />
            </div>
            <div style={{height: '70%',}} className='playback-section row'>
                <div className='h-100 video-block container-fluid d-flex justify-content-center align-items-center'>
                    <div className='h-100 w-100 row justify-content-center align-items-center'>
                        <div className='col-sm-1' />
                        <div className='embed-responsive embed-responsive-16by9 col h-100 d-flex align-items-center justify-content-center p-sm-3 p-2' style={{height: 'auto', width: '30%',}}>
                            {Video(leftVideo, 'mh-100 mw-100', () => {handlePlay(document.getElementById('video-player-1'))}, () => {handlePlay(document.getElementById('video-player-2'))}, "video-player-1")}
                        </div>
                        <div className='embed-responsive embed-responsive-16by9 col h-100 d-flex align-items-center justify-content-center p-sm-3 p-2' style={{height: 'auto', width: '30%',}}>
                            {Video(rightVideo, 'mh-100 mw-100', () => {}, () => {setButtonState(false)}, "video-player-2")}
                        </div>
                        <div className='col-sm-1' />
                    </div>
                </div>
                {isModalOpen && (
                    <Modal inner={popupChildren} leftVideoViews={leftVideoViewCount} rightVideoViews={rightVideoViewCount} videoPicked={videoPick} answer={pickAnswer}></Modal>
                )}
            </div>
            <div style={{height: '15%',}} className='row w-95 justify-content-center  position-relative'>
                <div className='col-12 mh-100 p-0 position-relative bottom-0 start-50 translate-middle-x'>
                    <div className='question-section row d-flex justify-content-center position-absolute top-0 start-50 translate-middle-x w-100 mx-0 py-2'>
                        <div className='question-text col'><h4 className='my-0'>{questions[currentQuestion]}</h4></div>
                    </div>
                    <div className='answer-section justify-content-center row position-absolute bottom-0 start-50 translate-middle-x w-100 mx-0'>
                        <button className='col-sm-3 col-5 col-lg-2 my-2 mx-sm-4 mx-1 btn btn-dark justify-content-center' onClick={() => handleAnswerOptionClick('Left')} disabled={buttonState}><h4 className='mb-0 py-2 w-100'>Left</h4></button>
                        <button className='col-sm-3 col-5 col-lg-2 my-2 mx-sm-4 mx-1 btn btn-dark justify-content-center' onClick={() => handleAnswerOptionClick('Right')} disabled={buttonState}><h4 className='mb-0 py-2 w-100'>Right</h4></button>
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