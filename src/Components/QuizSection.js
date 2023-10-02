import React, { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import ReactPlayer from 'react-player';
import { useNavigate } from "react-router-dom";

export default function QuizSection(props) {
    let userID = props.userID;
    //TODO: take in category selected in earlier page
    //TODO: filter pairs array for category
    const navigate = useNavigate();
    const questions = ['Which video do you prefer?', 'Which video do you think has more views?', 'Which video do you think has more likes?'];
    let answerOptions = [];

    const [selectedPairs, setSelectedPairs] = useState(null);
    useEffect(() => {
        let shuffled = pairs.sort(function(){ return 0.5 - Math.random() });
        setSelectedPairs(shuffled.slice(0,5));
    })

    const [currentPair, setCurrentPair] = useState(0);
    let pair = selectedPairs[currentPair];
    console.log(pair);
    let videoBlock = showVideos(pair);
    let pairID = pair.pairID;
    let videoLeft = pair.video1;
    let videoRight = pair.video2;

    
    console.log(pair);
    console.log(videoLeft);
    console.log(videoRight);

    const nextPair = (event) => {
        let nextPair = currentPair + 1;
        if (nextPair < selectedPairs.length) {
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
        <div className='quiz-box'>
            <div className='quiz-header'>
                <h3>Pair {currentPair +1}/{selectedPairs.length}</h3>
            </div>
            <div className='playback-section'>
                {videoBlock}
            </div>
            <div className='question-section'>
                <div className='question-text'>{questions[currentQuestion]}</div>
            </div>
            <div className='answer-section row justify-content-center'>
                <button className='col-2 m-2 btn btn-primary' onClick={() => handleAnswerOptionClick('Left')}>Left</button>
                <button className='col-2 m-2 btn btn-primary' onClick={() => handleAnswerOptionClick('Right')}>Right</button>
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


    return (
        <div className='video-block row-12'>
            <div className='left-video-block col-5 inline p-3' style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(leftHTML)}}>
            </div>
            <div className='right-video-block col-5 inline p-3' style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(rightHTML)}}>
            </div>
            <ReactPlayer url='https://www.tiktok.com/@sayyyydeeee/video/7208612613729701162?is_from_webapp=1&sender_device=pc&web_id=7283217475364652574' autoPlay={true}/>
        </div>
    );
}