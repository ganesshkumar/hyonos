import React, { Component } from 'react'
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

import './App.css'

class App extends Component {

  constructor() {
    super()

    const now = new Date()
    this.state = {
      timeSet: [],
      sleepTimes: [],
      hours: now.getHours(),
      minutes: now.getMinutes(),
      dontClose: false
    }

    this.clicked = this.clicked.bind(this)
    this.computeSleepTime = this.computeSleepTime.bind(this)
  }

  clicked() {
    const current = new Date().getTime()

    const timeSet = [
      //current,
      //current + (15 * 60 * 1000); // +15 minutes  - Sleep time
      current + (105 * 60 * 1000), // +90 minutes - 1 REM
      current + (195 * 60 * 1000), // +90 minutes - 2 REMs
      current + (285 * 60 * 1000), // +90 minutes - 3 REMs
      current + (375 * 60 * 1000), // +90 minutes - 4 REMs
      current + (465 * 60 * 1000), // +90 minutes - 5 REMs
      current + (555 * 60 * 1000) // +90 minutes - 6 REMs
    ]

    this.setState({timeSet: timeSet})
  }

  computeSleepTime() {
    var wakeTime = new Date().setHours(this.state.hours)
    wakeTime = new Date(wakeTime).setMinutes(this.state.minutes)

    const sleepTimes = [
      //wakeTime
      //wakeTime - (15 * 60 * 1000); // -15 minutes  - Sleep time
      wakeTime - (105 * 60 * 1000), // -90 minutes - 1 REM
      wakeTime - (195 * 60 * 1000), // -90 minutes - 2 REMs
      wakeTime - (285 * 60 * 1000), // -90 minutes - 3 REMs
      wakeTime - (375 * 60 * 1000), // -90 minutes - 4 REMs
      wakeTime - (465 * 60 * 1000), // -90 minutes - 5 REMs
      wakeTime - (555 * 60 * 1000)  // -90 minutes - 6 REMs
    ]

    const current = new Date().getTime()
    return sleepTimes.filter(time => time > current)
  }

  onHourChange(hours) {
    this.setState({
      hours: hours,
      sleepTimes: this.computeSleepTime(),
      dontClose: true
    })
  }

  onMinuteChange(minutes) {
    this.setState({
      minutes: minutes,
      sleepTimes: this.computeSleepTime(),
      dontClose: false
    })
  }

  render() {
    const fmtOptions = {hour: '2-digit', minute: '2-digit'}
    const locale = navigator.language

    const times = this.state.timeSet
        .map(time => new Date(time).toLocaleString(locale, fmtOptions))
    const sleepTimes = this.state.sleepTimes
        .map(time => new Date(time).toLocaleString(locale, fmtOptions))

    var timer = new Date().setHours(this.state.hours)
    timer = new Date(timer).setMinutes(this.state.minutes)
    timer = new Date(timer).toLocaleString(locale, fmtOptions)

    return (
      <div className="App">
        <div className='button' onClick={this.clicked}>Click</div>
        <div className='rem1'>{times[0]}</div>
        <div className='rem2'>{times[1]}</div>
        <div className='rem3'>{times[2]}</div>
        <div className='rem4'>{times[3]}</div>
        <div className='rem5'>{times[4]}</div>
        <div className='rem6'>{times[5]}</div>

        <TimePicker
          focused={this.state.dontClose}
          time={timer}
          onHourChange={this.onHourChange.bind(this)}
          onMinuteChange={this.onMinuteChange.bind(this)}
        />

        <div className='rem1'>{sleepTimes[0] ? sleepTimes[0] : ''}</div>
        <div className='rem2'>{sleepTimes[1] ? sleepTimes[1] : ''}</div>
        <div className='rem3'>{sleepTimes[2] ? sleepTimes[2] : ''}</div>
        <div className='rem4'>{sleepTimes[3] ? sleepTimes[3] : ''}</div>
        <div className='rem5'>{sleepTimes[4] ? sleepTimes[4] : ''}</div>
        <div className='rem6'>{sleepTimes[5] ? sleepTimes[5] : ''}</div>

      </div>


    );
  }
}

export default App;
