import React, { useEffect, useState, useRef, Suspense } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import ReactPlayer from 'react-player';
import { useNavigate, useLocation } from "react-router-dom";
import video from '../Videos/Download.mp4';

export default function QuizSection(props) {
    const vidRef = useRef();
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let pairs = data.selectedPairs;
    //TODO: take in category selected in earlier page
    //TODO: filter pairs array for category
    const navigate = useNavigate();
    const questions = ['Which video do you prefer?', 'Which video do you think has more views?', 'Which video do you think has more likes?'];
    let answerOptions = [];

    // let idArray = [];

    // for (var i = 0; i < pairs.length; i++) {
    //     idArray.push(pairs[i].video1)
    //     idArray.push(pairs[i].video2)
    // }

    // const videos = require.context('./videos', true);
    // const videoList = videos.keys().map(video => videos(video));

    // for (var y = 0; i < idArray.length; i++) {
    //     console.log(idArray[i])
    //     idArray[i] = React.lazy(() => import("./videos/" + idArray[i] +".mp4"));
    // }

    const [buttonState, setButtonState] = useState(true);

    const [currentPair, setCurrentPair] = useState(0);
    let pair = pairs[currentPair];
    console.log(currentPair)
    //let videoBlock = showVideos(pair, setButtonState);
    let pairID = pair.pairID;

    let leftVideo = pair.video1;
    let rightVideo = pair.video2;


    const handlePlay = async (video) => {
        console.log('loaded')
        video.play();
    }

    // const video1 = (async () => {
    //       await import("../Videos/" + leftVideo + ".mp4");
    //   })();


    const useVideo = (fileName) => {
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const [Video, setVideo] = useState(null)

        console.log("in useVideo")
        useEffect(() => {
            const fetchVideo = async () => {
                try {
                    console.log("inside fetchVideo" + fileName)
                    const response = await import("./videos/" + fileName + ".mp4"); // change relative path to suit your needs
                    setVideo(response.default)
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
    
            fetchVideo()
        }, [fileName])
    
        return {
            loading,
            error,
            Video,
        }
    }

    const Video = ( fileName, className, onCanPlayThrough, onEnded, playerID) => {
        const { loading, error, Video } = useVideo(fileName)
    
        if (error) return (<div>{error}</div>)
    
        console.log("in video" + playerID + ", " + fileName)
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
                        key = {fileName}>
                        <source src={Video} key={fileName} type="video/mp4"/>
                    </video>
                )}
            </>
        )
    }


    const nextPair = (event) => {
        console.log("in nextPair" + currentPair)
        let nextPair = currentPair + 1;
        if (nextPair < pairs.length) {
            setCurrentPair(nextPair);
            console.log("set new pair" + currentPair)
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
                        {Video(rightVideo, 'mh-100 mw-100', () => {handlePlay(document.getElementById('video-player-2'))}, () => {setButtonState(false)}, "video-player-2")}
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
