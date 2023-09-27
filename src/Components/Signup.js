import React, { Component } from 'react'
import ParticipantInfo from './ParticipantInfo'
import Comparison from './QuizSection'
import Survey from './Survey'
import Success from './Success'

export default class Signup extends Component {

state = {
    step: 1,
    email: '',
    username: '', 
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    levelOfEducation: '',
}

// go back to previous step
prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
}

// proceed to the next step
nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
}

// Handle fields change
handleChange = input => e => {
    this.setState({ [input]: e.target.value });
}

render() {
    const { step } = this.state;
    const { email, username, password, firstName, lastName, country, levelOfEducation } = this.state;
    const values = { email, username, password, firstName, lastName, country, levelOfEducation }
    
    switch(step) {
    case 1: 
        return (
        <ParticipantInfo 
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
        />
        )
    case 2: 
        return (
        <Comparison 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
        />
        )
    case 3: 
        return (
        <Comparison 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
        />
        )
    case 4: 
        return (
        <Comparison 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
        />
        )
    case 5: 
        return (
        <Comparison 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
        />
        )
    case 6: 
        return (
        <Comparison 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
        />
        )
    case 7: 
        return (
            <Survey 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            values={ values }
            />
        )
    case 8: 
        return (
            <Success />
        )
    default: 
        // do nothing
    }
}
}
