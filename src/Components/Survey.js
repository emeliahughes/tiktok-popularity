import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const baseUrl = "http://127.0.0.1:5000/";
const postUrl = baseUrl + "submitsurvey";

export default function Survey(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let score = data.score;
    let numPairs = data.numPairs;

    //Survey Questions
    let qText = [
        'Describe your average use of tiktok each month:',
        'How long have you used tiktok?',
        'Do you think the like or view count is more important in determining popularity?',
        'Do you pay attention to how many likes a TikTok has?',
        'Do you pay attention to how many comments a TikTok has?',
        'Do you \'like\' posts on TikTok?',
        'Do you comment on posts on TikTok?',
    ];
    let qAnswers = [
        ['Every day', 'Most days', 'Several days', 'One day', 'Not at all'],
        ['3+ years', '1-3 years', '3-12 months', '0-3 months', 'I do not use TikTok'],
        ['Like Count', 'View Count'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok']
    ];

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    let qTextStyle = {borderBottom: "2px solid", borderRight: "2px solid"};

    if (width < 576) {
        qTextStyle = {borderBottom: "2px solid"}
    } else {
        qTextStyle = {borderBottom: "2px solid", borderRight: "2px solid"};
    }

    const [q1Value, setQ1Value] = useState('');

    const handleQ1 = (event) => {
        let newValue = {body: event.target.value};
        setQ1Value(newValue);
    }

    const [q2Value, setQ2Value] = useState('');

    const handleQ2 = (event) => {
        let newValue = {body: event.target.value};
        setQ2Value(newValue);
    }

    const [q3Value, setQ3Value] = useState('');

    const handleQ3 = (event) => {
        let newValue = {body: event.target.value};
        setQ3Value(newValue);
    }

    const [q4Value, setQ4Value] = useState('');

    const handleQ4 = (event) => {
        let newValue = {body: event.target.value};
        setQ4Value(newValue);
    }

    const [q5Value, setQ5Value] = useState('');

    const handleQ5 = (event) => {
        let newValue = {body: event.target.value};
        setQ5Value(newValue);
    }

    const [q6Value, setQ6Value] = useState('');

    const handleQ6 = (event) => {
        let newValue = {body: event.target.value};
        setQ6Value(newValue);
    }

    const [q7Value, setQ7Value] = useState('');

    const handleQ7 = (event) => {
        let newValue = {body: event.target.value};
        setQ7Value(newValue);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let surveyResults = {
            userID: userID,
            q1: q1Value['body'],
            q2: q2Value['body'],
            q3: q3Value['body'],
            q4: q4Value['body'],
            q5: q5Value['body'],
            q6: q6Value['body'],
            q7: q7Value['body'],
        };
        console.log(surveyResults)

        //push surveyResults to results database
        pushData(surveyResults);
        
        for (let i = 0; i < qIDs.length; i++) {
            document.getElementById(qIDs[i]).checked = false;
        }

        navigate('/endpage', {state: {
            userID: userID,
            numPairs: numPairs,
            score: score}
        });
    };

    let qHandle = [handleQ1, handleQ2, handleQ3, handleQ4, handleQ5, handleQ6, handleQ7];
    let qHTML = [];
    let qIDs = [];

    for (let i = 0; i < qText.length; i++) {
        let qNum = 'q' + (i + 1);
        let quesAnswers = qAnswers[i];
        let quesHandle = qHandle[i];
        let sectionID = qNum + '-answers';
        let qName = qNum + 'RadioOptions';
        let questionInner = [];

        for (let j = 0; j < quesAnswers.length; j++) {
            let qID = qNum + 'a' + (j + 1);
            qIDs.push(qID);
            let qAnswer = quesAnswers[j];
            let qInner = (
                <div className="form-check form-check-inline py-3"> 
                        <input className="form-check-input" type="radio" name={qName} id={qID} value={qAnswer} onChange={quesHandle}/>
                        <label className="form-check-label" htmlFor={qID}>{qAnswer}</label>
                </div>
            )
            questionInner.push(qInner);
        }

        let question = (
            <div className='form-group form-row row m-0 p-0'>
                <label htmlFor={sectionID} className='col-12 col-sm-5 m-0 py-3 text-center text-sm-end' style={qTextStyle}><strong>{qText[i]}</strong></label>
                <div id={sectionID} className='col-12 col-sm-7 text-start' style={{borderBottom: "2px solid"}}>
                    {questionInner}
                </div>
            </div>
        );

        qHTML.push(question);
    }


    return (
    <div className='survey-block container-fluid row justify-content-center mb-5'>
        <div className='survey-title'>
            <div className='col m-5 pb-3'>
                <h1 className='space-mono-bold'>TokOrNot</h1>
                <h4>Rate the TikTok</h4>
            </div>
        </div>
        <div className='row justify-content-center pb-5'>
            <form className='form-inline w-100 col-sm-6 col-10 px-0' onSubmit={handleSubmit} method="post" style={{border: "2px solid", borderRadius: "10px"}}>
                {qHTML}
                <div>
                    <button type="submit" className="btn rounded-lg p-15" id="submit-button" ><h3 className='m-2'><strong aria-label="submit">Submit</strong></h3></button>
                </div>
            </form>
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
            'no-cors': true,
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