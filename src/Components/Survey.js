import React, { useState } from 'react';
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:5000/";
const postUrl = baseUrl + "submitsurvey";

export default function Survey(props) {
    let userID = '2';
    let pairID = '3';
    let category = props.category;

    //Survey Questions
    let qText = [
        'Describe your average use of tiktok each month:',
        'How long have you used tiktok?',
        'Do you watch videos on {category} very often?',
        'Do you pay attention to how many likes a TikTok has?',
        'Do you pay attention to how many comments a TikTok has?',
        'Do you \'like\' posts on TikTok?',
        'Do you comment on posts on TikTok?',
    ];
    let qAnswers = [
        ['Every day', 'Most days', 'Several days', 'One day', 'Not at all'],
        ['Longer than 3 years', '1-3 years', '3-12 months', '0-3 months', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok'],
        ['Frequently', 'Sometimes', 'Rarely', 'Never', 'I do not use TikTok']
    ];

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
            pairID: pairID,
            category: category,
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
                <div className="form-check form-check-inline"> 
                        <input className="form-check-input" type="radio" name={qName} id={qID} value={qAnswer} onChange={quesHandle}/>
                        <label className="form-check-label" htmlFor={qID}>{qAnswer}</label>
                </div>
            )
            questionInner.push(qInner);
        }

        let question = (
            <div className='form-group form-row m-3 p-1'>
                <label htmlFor={sectionID} className='m-0'><strong>{qText[i]}</strong></label>
                <div id={sectionID} className='m-1'>
                    {questionInner}
                </div>
            </div>
        );

        qHTML.push(question);
    }


    return (
    <div className='survey-block container-fluid d-flex'>
        <div className='survey-title'>

        </div>
        <form className='form-inline w-100' onSubmit={handleSubmit} method="post">
            {qHTML}
            <button type="submit" className="btn rounded-lg p-15" id="submit-button"><h3 className='m-2'><strong aria-label="submit">Submit</strong></h3></button>
        </form>
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