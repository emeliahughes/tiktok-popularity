import React, { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import ReactPlayer from 'react-player';
import { useNavigate } from "react-router-dom";
import video from '../Download.mp4';

export default function QuizSection(props) {
    let userID = props.userID;
    let pairs = props.selectedPairs;
    //TODO: take in category selected in earlier page
    //TODO: filter pairs array for category
    const navigate = useNavigate();
    const questions = ['Which video do you prefer?', 'Which video do you think has more views?', 'Which video do you think has more likes?'];
    let answerOptions = [];

    //const [selectedPairs, setSelectedPairs] = useState(null);
    //useEffect(() => {
    //    let shuffled = pairs.sort(function(){ return 0.5 - Math.random() });
    //    setSelectedPairs(shuffled.slice(0,5));
    //})

    const [currentPair, setCurrentPair] = useState(0);
    let pair = pairs[currentPair];
    console.log(pair);
    let videoBlock = showVideos(pair);
    let pairID = pair.pairID;
    let videoLeft = pair.video1;
    let videoRight = pair.video2;

    //import video
    // (async () => {
    //     if (somethingIsTrue) {
    //       // import module for side effects
    //       await import("/modules/my-module.js");
    //     }
    //   })();
    
    console.log(pair);
    console.log(videoLeft);
    console.log(videoRight);

    const nextPair = (event) => {
        let nextPair = currentPair + 1;
        if (nextPair < pairs.length) {
            setCurrentPair(nextPair);
        } else {
            navigate('/survey', {
                pairdID: pairID,
                userID: userID,
                category: pair.category,
            });
        }
    }

    //set up correct answers for pair
    if(videoLeft.numViews > videoRight.numViews){
        answerOptions = ['Left', 'Left'];
    } else {
        answerOptions = ['Right', 'Right'];
    }

    if(videoLeft.numLikes > videoRight.numLikes){
        answerOptions = [...answerOptions, 'Left'];
    } else {
        answerOptions = [...answerOptions, 'Right'];
    }

    console.log(answerOptions);

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
            <div className='quiz-header row mx-4 mb-auto'>
                <h3 className='col my-2'>Pair {currentPair +1}/{pairs.length}</h3>
            </div>
            <div className='playback-section mh-100 my-2 row'>
                {videoBlock}
            </div>
            <div className='row w-100 mt-3 justify-content-center'>
                <div className='col-12'>
                    <div className='question-section row justify-content-center'>
                        <div className='question-text col'>{questions[currentQuestion]}</div>
                    </div>
                    <div className='answer-section justify-content-center py-2 row'>
                        <button className='col-2 my-2 mx-3 btn btn-primary' onClick={() => handleAnswerOptionClick('Left')}>Left</button>
                        <button className='col-2 my-2 mx-3 btn btn-primary' onClick={() => handleAnswerOptionClick('Right')}>Right</button>
                    </div>
                </div>
            </div>
        </div>
	);
}

function showVideos(pair){
    let leftVideo = pair.video1;
    let rightVideo = pair.video2;
    const parser = new DOMParser();
    let leftHTML = parser.parseFromString(leftVideo.embedCode.replace(" style=\"max-width: 605px;min-width: 325px;\"", " style=\"max-height: 900px !important\""), 'text/html');
    leftHTML = leftHTML.getElementsByTagName('body')[0].innerHTML;
    console.log(leftHTML);
    let rightHTML = parser.parseFromString(rightVideo.embedCode.replace(" style=\"max-width: 605px;min-width: 325px;\"", " style=\"max-width: 605px;min-width: 100px;\""), 'text/html');
    rightHTML = rightHTML.getElementsByTagName('body')[0].innerHTML;


    //old video player code
    // <div className='left-video-block col-5 inline p-3' style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(leftHTML)}}>
    // </div>
    // <div className='right-video-block col-5 inline p-3' style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(rightHTML)}}>
    // </div>

    return (
        <div className='video-block container-fluid justify-content-center'>
            <div className='row justify-content-center align-items-center'>
                <video controls className='col-3'>
                    <source src={video} type="video/mp4"/>
                </video>
                <div className='col-1'></div>
                <video controls className='col-3'>
                    <source src={video} type="video/mp4"/>
                </video>
            </div>
        </div>
    );
}