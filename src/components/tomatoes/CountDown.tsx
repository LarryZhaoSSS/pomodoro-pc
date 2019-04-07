import * as React from 'react'
import './countdown.scss'
import { connect } from 'react-redux'
interface ICountDownProps {
  timer: number
  duration: number
  onFinish: () => void
}

interface ICountDownState {
  countDown: number
}

let timerId: NodeJS.Timeout
class CountDown extends React.Component<ICountDownProps, ICountDownState> {
  constructor(props) {
    super(props)
    this.state = {
      countDown: this.props.timer
    }
  }
  get countDown() {
    const min = Math.floor(this.state.countDown / 1000 / 60)
    const second = Math.floor((this.state.countDown / 1000) % 60)
    return `${min < 10 ? `0${min}` : min}:${
      second < 10 ? `0${second}` : second
    }`
  }

  componentDidMount() {
    timerId = setInterval(() => {
      document.title = `${this.countDown} - pomodora APP`
      const time = this.state.countDown
      this.setState({ countDown: time - 1000 })
      if (time < 1000) {
        document.title = ' pomodora APP'
        clearInterval(timerId)
      }
    }, 1000)
  }
  componentWillUnmount(){
		clearInterval(timerId)
	}
  public render() {
    const percent = 1 - this.state.countDown/this.props.duration
		return (
			<div className="CountDown" id="CountDown">
				<span className="restTime">{this.countDown}</span>
				<div className="progress" style={{width: `${percent*100}%`}}/>
			</div>
		);
  }
}
export default connect()(CountDown)
