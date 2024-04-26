import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useVideo from "./useVideo";
import jsonData from './videoInfo.json';


export default function QuizSection(props) {
    const vidRef = useRef();
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let pairs = data.selectedPairs;
    const navigate = useNavigate();

    let loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;
    let pairData = loadData.pairs;

    const questions = ['Which video do you prefer?', 'Which video do you think has more views?', 'Which video do you think has more likes?'];
    let answerOptions = [];

    const [buttonState, setButtonState] = useState(true);

    const [currentPair, setCurrentPair] = useState(0);
    let pair = pairs[currentPair];
    let pairID = pair.pairID;

    let leftVideo = pair.video1;
    let rightVideo = pair.video2;


    const handlePlay = async (video) => {
        console.log('loaded')
        video.play();
    }

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
                        onCanPlayThrough={onCanPlayThrough}
                        onEnded={onEnded}
                        key = {key}>
                        <source src={Video} key={key} id={fileName} type="video/mp4"/>
                    </video>
                )}
            </>
        )
    }


    const nextPair = (event) => {
        console.log("in nextPair" + currentPair)
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

    //set up correct answers for pair
    // if(videoLeft.numViews > videoRight.numViews){
    //     answerOptions = ['Left', 'Left'];
    // } else {
    //     answerOptions = ['Right', 'Right'];
    // }

    // if(videoLeft.numLikes > videoRight.numLikes){
    //     answerOptions = [...answerOptions, 'Left'];
    // } else {
    //     answerOptions = [...answerOptions, 'Right'];
    // }

    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [responses, setResponses] = useState([]);

	const handleAnswerOptionClick = (videoPicked) => {
        //stop timer
        
        if(videoPicked == answerOptions[currentQuestion]){
            setResponses([...responses, 'TRUE'])
        } else {
            setResponses([...responses, 'FALSE'])
        }
        if(currentQuestion != 0) {
            if(responses[currentQuestion] == 'TRUE'){
                //TODO: set background of current button green for x seconds
            } else {
                //TODO: set background of current button red for x seconds
            }
        }
        
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			//TODO: push answer data - {pairID, category, user ID, timer, responses}
            //move onto next data set or survey
            setCurrentQuestion(0);
            nextPair();
		}
	};
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
