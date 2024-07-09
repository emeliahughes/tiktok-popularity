import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export default function Survey(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    let userID = data.userID;
    let pairs = data.pairData;
    let videoData = data.videoData;
    
    const handlePlay = async (event) => {
        event.preventDefault();

        console.log(pairs)
        
        navigate('/quiz', {state: {
            userID: userID,
            selectedPairs: pairs,
            videoData: videoData,
            playedAlready: false}
        });

    };

    const handleBack = async (event) => {
        event.preventDefault();
        
        navigate('/', {state: {} });

    };

    return (
        <div className='container-flex h-100'>
            <div className='row' style={{margin: "40px"}}>
                <div className='col'>
                    <h1 className='space-mono-bold'>TokOrNot</h1>
                    <h4>Rate the TikTok</h4>
                </div>
            </div>
            <div className='h-100 row align-items-center justify-content-center'>
                <div className='col-xl-8 col-l-9 col-md-10 col-sm-11 col-12 justify-contents-center'>
                    <div className='row p-4 text-start'>
                        <div className='col'>
                        <h2 className='space-mono-bold'>Informed Consent</h2>
                        <br/>
                        <h4>About This Research</h4>
                        <p>You are being invited to engage in a research study. The study endeavors to explore the factors influencing human users' perception of a video's popularity in comparison to another on TikTok. The following consent information aims to provide you with a comprehensive understanding of the study, aiding in your decision on participation. Prior to agreeing to participate, please read the information carefully.</p>
                        <br/>
                        <h4>Taking Part in This Study Is Voluntary</h4>
                        <p>You have the option to decline participation in the study or to withdraw from it at any point. Your decision to not take part or to withdraw will have no impact on your relationship with the University of Notre Dame. As an alternative to participating in the study, you may choose not to take part. The study is being conducted by Tim Weninger and Emelia Hughes at the University of Notre Dame (email: tweninger@nd.edu phone: 574-631-6770, email: ehughes8@nd.edu).</p>
                        <br/>
                        <h4>Why Is This Study Being Done</h4>
                        <p>In this study, we are aiming to assess whether a video's metrics (like and view count) align with true user preference.</p>
                        <br/>
                        <h4>What Will Happen During The Study?</h4>
                        <p>If you agree to participate in the study, you will be taken to a website developped by the researchers and asked to watch two TikToks side by side and answer questions about your preference. After you have completed the questions for a set, you will be shown two new TikToks. You will be presented with 5 sets of TikToks in total." </p>
                        <br/>
                        <h4>What Are The Risks Of Taking Part In The Study?</h4>
                        <p>We have collected the videos from TikTok. Some videos might have some offensive or inappropriate content, although it is unlikely. Some videos will include swearing/inappropriate language either in the background music or said by the video creator. There might be a small fatigue from completing the task.</p>
                        <br/>
                        <h4>How Long Will This Study Take?</h4>
                        <p>This study will take about 10-15 minutes to complete.</p>
                        <br/>
                        <h4>How Will My Information Be Protected?</h4>
                        <p>All your responses will likely be stored by Prolific (a platform used for crowdsourcing tasks and data collection for academic research). Likewise responses will be stored at Notre Dame. We will not collect any Personal Identifying Information (PII). Organizations that may inspect and/or copy your research records for quality assurance and data analysis include groups such as the study investigator and his/her research associates, the University of Notre Dame Institutional Review Board or its designees, and (as allowed by law) state or federal agencies, especially the Office for Human Research Protections (OHRP), who may need to access the research records.</p>
                        <br/>
                        <h4>Will I Be Paid?</h4>
                        <p>You will be compensated for the completion of this task. In the event of an incomplete task, you will not receive any compensation. This study contains a number of checks to make sure that participants are finishing the tasks honestly and completely. As long as you read the instructions and complete the tasks, your task will be approved. If you fail these checks, your task will be rejected and you will not receive any compensation.</p>
                        <br/>
                        <h4>Participant's Consent</h4>
                        <p>In consideration of all of the above, I give my consent to participate in this research study. By proceeding, I confirm that I am 18 years old, and agree to take part in this study.</p>
                        </div>
                        
                    </div>
                    <div className='row align-items-center justify-contents-center p-4'>
                        <button type="button" onClick={handleBack} className="col-sm col-12 btn btn-dark p-15 m-sm-3 my-3" id="info-button"><h4 className='m-2' aria-label="Back">Back</h4></button>
                        
                        <button type="button" onClick={handlePlay} className="col-sm col-12 btn btn-dark p-15 m-sm-3 my-3" id="play-button"><h4 className='m-2' aria-label="Play">I agree to participate in this study</h4></button>
                        
                    </div>
                </div>
            </div>
        </div>
    );


}

// 
// 