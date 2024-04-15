import React, { useState, useEffect } from 'react';
import jsonData from './videoInfo.json'
import Video from './Video';

const baseUrl = "http://127.0.0.1:5000/";
const postUrl = baseUrl + "updateCategories";

export default function Categorize(props) {
    let qName = "categoryQuestion"
    let quesAnswers = ["Comedy", "Singing", "Dancing", "Animals", "Random"];
    const loadData = JSON.parse(JSON.stringify(jsonData));
    let videoData = loadData.videos;
    let videoIDs = [];
    
    for (var video of videoData) {
        videoIDs.push(video.id)
    }

    const [currentVideo, setCurrentVideo] = useState(0);

    let currentVideoID = videoIDs[currentVideo];

    function findNameById(list, id) {
        return list.find((video) => video.id === id);
    }
    let currentVideoObject = findNameById(videoData, currentVideoID);

    const [questionValue, setQuestionValue] = useState('');

    const handleQuestion = (event) => {
        let newValue = {body: event.target.value};
        setQuestionValue(newValue);
    }

    let questionInner = [];
    let qIDs = [];

    for (let j = 0; j < quesAnswers.length; j++) {
        let qID = "c" + (j + 1);
        qIDs.push(qID);
        let qAnswer = quesAnswers[j];
        let qInner = (
            <div className="form-check form-check-inline"> 
                    <input className="form-check-input" type="radio" name={qName} id={qID} value={qAnswer} onChange={handleQuestion}/>
                    <label className="form-check-label" htmlFor={qID}>{qAnswer}</label>
            </div>
        )
        questionInner.push(qInner);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit")
        currentVideoObject.category = questionValue.body
        console.log(currentVideoObject)
        if (currentVideo < videoIDs.length - 1) {
            let newVideo = currentVideo + 1;
            setCurrentVideo(newVideo)
        } else {
            pushData(jsonData)
            console.log("finished")
        }
        
        for (let i = 0; i < qIDs.length; i++) {
            document.getElementById(qIDs[i]).checked = false;
        }
    };

    return (
        <div className='container-flex h-100'>
            <div className='h-100 row align-items-center'>
                <div className='col video-player'>
                    <div className='row'>
                        <div className='col-3'/>
                            {Video(currentVideoID)}
                        <div className='col-3'/>
                    </div>
                </div>
                <div className='col category-form form-inline w-100' onSubmit={handleSubmit} method="post">
                    <h5>{currentVideo + 1} / {videoIDs.length}</h5>
                    <div className='form-group form-row m-3 p-1'>
                        <label htmlFor="categoryAnswers" className='m-0'><strong>Video Category:</strong></label>
                        <div id="categoryAnswers" className='m-1'>
                            {questionInner}
                        </div>
                    </div>
                    <button type="submit" className="btn rounded-lg p-15" id="submit-button" onClick={handleSubmit}><h3 className='m-2'><strong aria-label="submit">Submit</strong></h3></button>
                </div>
            </div>
        </div>
    );
}


function pushData(respData) {
    let insertData = JSON.stringify(respData);
    console.log(insertData)
    let promise = fetch(postUrl, {
        method: "POST",
        body: insertData,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
        }
    })
    promise
    .then(
        resp => {
            let p = resp.text()
            p.then(res => {respData.id = res;})
        }
    )
    .catch(err => console.log(err));
}