// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
  isTimeRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimeLimitImMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimeLimitImMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="container">
        <p className="limit-label">Set Timer limit</p>
        <div className="time-limit-controller">
          <button
            className="limit-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimeLimitImMinutes}
          >
            -
          </button>
          <div className="limit-label-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncrementTimeLimitImMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimeRunning,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimerController = () => {
    const {isTimeRunning} = this.state
    const startOrPauseImageUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="time-controller-container">
        <button
          className="time-controller-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            className="image"
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
          />
          <p className="label">{isTimeRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="time-controller-btn"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const labelText = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time-heading">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-start">{labelText}</p>
            </div>
          </div>
          <div className="controllers-container">
            {this.renderTimerController()}
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
