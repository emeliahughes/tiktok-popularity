import React from 'react';
//import Signup from './Components/Signup';
import QuizSection from './Components/QuizSection';
import Survey from './Components/Survey';
import Landing from './Components/Landing';
import Consent from './Components/Consent';
import Categorize from './Components/Categorize';
import Ending from './Components/EndPage';
import './App.css';

import { Routes, Route, Outlet, BrowserRouter, useLocation} from "react-router-dom";

function App() {
    //navbar conditionals
        
    return (
        <div className="App container-fluid text-center justify-content-center mx-0 w-100 vh-100">
            <BrowserRouter>
                
                <Routes>
                    <Route path='/'
                        element= {
                            <div className='w-100 min-hw-100 mh-100 h-100 container-fluid d-flex flex-wrap justify-content-center'>
                                {/* <div style={{height: '10%',}} className='mh-0 align-items-center justify-content-center w-100'>
                                    <h1 className='p-2 pb-0'>TokOrNot: Rate the TikTok</h1>
                                </div> */}
                                <div style={{height: '100%',}} className='w-100'>
                                    <div className='col h-100'>
                                        <Outlet />
                                    </div>
                                </div>
                            </div>                        
                        }>
                        <Route path="/" element={<Landing/>} />
                        <Route path="/consent" element={<Consent/>} />
                        <Route path="/quiz" element={<QuizSection/>} />
                        <Route path="/survey" element={<Survey/>} />
                        <Route path="/categorize" element={<Categorize/>} />
                        <Route path="/endpage" element={<Ending/>} />
                    </Route>

                </Routes>
            </BrowserRouter>   
        </div>
    );
}
//<Survey pairID={1} userID={3} category={'rushTok'} />
export default App;

