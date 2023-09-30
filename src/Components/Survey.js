import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Survey(props) {
    let userID = props.userID;
    let pairID = props.pairID;
    let category = props.category;

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
            pairID: pairID,
            category: category,
            q1: q1Value,
            q2: q2Value,
            q3: q3Value,
            q4: q4Value,
            q5: q5Value,
            q6: q6Value,
            q7: q7Value,
        };

        //push surveyResults to results database
        <Link to="/"></Link>
    };


    return (
    <div className='survey-block container-fluid d-flex'>
        <div className='survey-title'>

        </div>
        <form className='form-inline w-100'>
            <div className='question-one form-group form-row m-3 p-1'>
                <label htmlFor='q1-answers' className='m-0'><strong>Describe your average use of tiktok each month:</strong></label>
                <div id='q1-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q1a1" value="Every day" onChange={handleQ1}/>
                        <label className="form-check-label" htmlFor="q1a1">Every day</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q1a2" value="Most days" onChange={handleQ1}/>
                        <label className="form-check-label" htmlFor="q1a2">Most days</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q1a3" value="Several days" onChange={handleQ1}/>
                        <label className="form-check-label" htmlFor="q1a3">Several days</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q1a4" value="One day" onChange={handleQ1}/>
                        <label className="form-check-label" htmlFor="q1a4">One day</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q1a5" value="Not at all" onChange={handleQ1}/>
                        <label className="form-check-label" htmlFor="q1a5">Not at all</label>
                    </div>
                </div>
            </div>

            <div className='question-two form-group form-row m-3 p-1'>
                <label htmlFor='q2-answers' className='m-0'><strong>How long have you used tiktok?</strong></label>
                <div id='q2-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q2a1" value="Longer than 3 years" onChange={handleQ2}/>
                        <label className="form-check-label" htmlFor="q2a1">Longer than 3 years</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q2a2" value="1-3 years" onChange={handleQ2}/>
                        <label className="form-check-label" htmlFor="q2a2">1-3 years</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q2a3" value="3-12 months" onChange={handleQ2}/>
                        <label className="form-check-label" htmlFor="q2a3">3-12 months</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q2a4" value="0-3 months" onChange={handleQ2}/>
                        <label className="form-check-label" htmlFor="q2a4">0-3 months</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q2a5" value="I do not use TikTok" onChange={handleQ2}/>
                        <label className="form-check-label" htmlFor="q2a5">I do not use TikTok</label>
                    </div>
                </div>
            </div>

            <div className='question-three form-group form-row m-3 p-1'>
                <label htmlFor='q3-answers' className='m-0'><strong>Do you watch videos on {category} very often?</strong></label>
                <div id='q3-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q3a1" value="Frequently" onChange={handleQ3}/>
                        <label className="form-check-label" htmlFor="q3a1">Frequently</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q3a2" value="Sometimes" onChange={handleQ3}/>
                        <label className="form-check-label" htmlFor="q3a2">Sometimes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q3a3" value="Rarely" onChange={handleQ3}/>
                        <label className="form-check-label" htmlFor="q3a3">Rarely</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q3a4" value="Never" onChange={handleQ3}/>
                        <label className="form-check-label" htmlFor="q3a4">Never</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q3a5" value="I do not use TikTok" onChange={handleQ3}/>
                        <label className="form-check-label" htmlFor="q3a5">I do not use TikTok</label>
                    </div>
                </div>
            </div>

            <div className='question-four form-group form-row m-3 p-1'>
                <label htmlFor='q4-answers' className='m-0'><strong>Do you pay attention to how many likes a TikTok has?</strong></label>
                <div id='q4-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q4a1" value="Frequently" onChange={handleQ4}/>
                        <label className="form-check-label" htmlFor="q4a1">Frequently</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q4a2" value="Sometimes" onChange={handleQ4}/>
                        <label className="form-check-label" htmlFor="q4a2">Sometimes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q4a3" value="Rarely" onChange={handleQ4}/>
                        <label className="form-check-label" htmlFor="q4a3">Rarely</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q4a4" value="Never" onChange={handleQ4}/>
                        <label className="form-check-label" htmlFor="q4a4">Never</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q4a5" value="I do not use TikTok" onChange={handleQ4}/>
                        <label className="form-check-label" htmlFor="q4a5">I do not use TikTok</label>
                    </div>
                </div>
            </div>

            <div className='question-five form-group form-row m-3 p-1'>
                <label htmlFor='q5-answers' className='m-0'><strong>Do you pay attention to how many comments a TikTok has?</strong></label>
                <div id='q5-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q5a1" value="Frequently" onChange={handleQ5}/>
                        <label className="form-check-label" htmlFor="q5a1">Frequently</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q5a2" value="Sometimes" onChange={handleQ5}/>
                        <label className="form-check-label" htmlFor="q5a2">Sometimes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q5a3" value="Rarely" onChange={handleQ5}/>
                        <label className="form-check-label" htmlFor="q5a3">Rarely</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q5a4" value="Never" onChange={handleQ5}/>
                        <label className="form-check-label" htmlFor="q5a4">Never</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q5a5" value="I do not use TikTok" onChange={handleQ5}/>
                        <label className="form-check-label" htmlFor="q5a5">I do not use TikTok</label>
                    </div>
                </div>
            </div>

            <div className='question-six form-group form-row m-3 p-1'>
                <label htmlFor='q6-answers' className='m-0'><strong>Do you 'like' posts on TikTok?</strong></label>
                <div id='q6-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q6a1" value="Frequently" onChange={handleQ6}/>
                        <label className="form-check-label" htmlFor="q6a1">Frequently</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q6a2" value="Sometimes" onChange={handleQ6}/>
                        <label className="form-check-label" htmlFor="q6a2">Sometimes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q6a3" value="Rarely" onChange={handleQ6}/>
                        <label className="form-check-label" htmlFor="q6a3">Rarely</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q6a4" value="Never" onChange={handleQ6}/>
                        <label className="form-check-label" htmlFor="q6a4">Never</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q6a5" value="I do not use TikTok" onChange={handleQ6}/>
                        <label className="form-check-label" htmlFor="q6a5">I do not use TikTok</label>
                    </div>
                </div>
            </div>

            <div className='question-seven form-group form-row m-3 p-1'>
                <label htmlFor='q7-answers' className='m-0'><strong>Do you comment on posts on TikTok?</strong></label>
                <div id='q7-answers' className='m-1'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q7a1" value="Frequently" onChange={handleQ7}/>
                        <label className="form-check-label" htmlFor="q7a1">Frequently</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q7a2" value="Sometimes" onChange={handleQ7}/>
                        <label className="form-check-label" htmlFor="q7a2">Sometimes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q7a3" value="Rarely" onChange={handleQ7}/>
                        <label className="form-check-label" htmlFor="q7a3">Rarely</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q7a4" value="Never" onChange={handleQ7}/>
                        <label className="form-check-label" htmlFor="q7a4">Never</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="q7a5" value="I do not use TikTok" onChange={handleQ7}/>
                        <label className="form-check-label" htmlFor="q7a5">I do not use TikTok</label>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn rounded-lg p-15" id="submit-button"><h3 className='m-2'><strong aria-label="submit">Submit</strong></h3></button>
        </form>
    </div> 
    );
}