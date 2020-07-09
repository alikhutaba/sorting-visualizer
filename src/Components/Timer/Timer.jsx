
import React from 'react'
import { connect } from "react-redux";
import {setTimer} from '../../myRedux'

import './Timer.css'


class Timer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
      action: this.props.action
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  componentDidUpdate(){

    if(this.props.action === "start" && this.state.isOn === false)
      this.startTimer()
    
    if(this.props.action === "stop" && this.state.isOn === true)
      this.stopTimer()

    if(this.props.action === "reset" && this.state.isOn === false){
      this.resetTimer()
      this.props.setTimer("stop")
    }
  }


  resetTimer(){

    if(this.state.time > 0)
      this.setState({time:0})
  }


  startTimer() {

        this.setState({
            time: this.state.time,
            start: Date.now(),
            isOn: true
        })

        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 10);
         
    }

 
  stopTimer() {
    
    if(this.state.isOn === true){
      clearInterval(this.timer)
        this.setState({isOn: false})
    }
  }


  render() {

    let min = Math.floor((Math.floor(this.state.time/1000))/60) < 10 ? "0"+Math.floor((Math.floor(this.state.time/1000))/60) : Math.floor((Math.floor(this.state.time/1000))/60)
    let sec = Math.floor((Math.floor(this.state.time/1000))%60) < 10 ? "0"+Math.floor((Math.floor(this.state.time/1000))%60) : Math.floor((Math.floor(this.state.time/1000))%60)
    let milesec = Math.floor(Math.floor(this.state.time%1000)/10) < 10 ? "0"+Math.floor(Math.floor(this.state.time%1000)/10) : Math.floor(Math.floor(this.state.time%1000)/10)

    return(
      <div className="main-timer">
        <h1 className="black">Timer</h1>
        
        <span className="timer">{min+" : "+sec+" : "+ milesec}</span>
        <p className="black">This timer is   for the animation and not for implement of the algorithms</p>

        <hr></hr>

        <h6 className="developed">Developed by</h6>
        <h3>Ali Khutaba</h3>

        <div className="container">

          <div style={{display: "inline-block"}}>
            <div className="social-title">Linkedin :</div>
            <div className="cube">
              <a href="https://www.linkedin.com/in/ali-khutaba-843627173/" target="_blank" rel="noopener noreferrer">
              <img className="linkedin-img"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEUAd7f///8AcrUAbrMAdbbK3Ou30uaMttcAc7U/jcJ7rdKGsNN0pM2vy+IAbLIAa7L3+/0Le7ns9Pnh7fVZmcjY5/Kox+Aafrvy+fxIkcTA1+mbwNwzh7+0z+Td6vNspM2UvNrR4u9insoAZrAjhL6yZ374AAAHJklEQVR4nO2d6ZaqvBKGQxIxtJsgiuDc6uH+r/GAQ7fSDEVClMqX91+v1WAeMleqKsR70WI7TfKYYFWcJ9Pt4hWJPP9x2EhGBf90OTXEBWVy4zcQpjETny7hIBIyDmsIjzn7dMkGlNwvq4ShtKP+HhLs8Ep4ijD3vjrxaPdMeIo+XSADuiNeCUMbAQvEw4NwKW1rojdxtrgT7u0aZH7FgxthatM08SoZXgntbKJX8bgkDO2twqIS/YIwsLUXlhKJRxby06UwKrYmvs2NtCDckhn9dCGMip5IYnM3LDriN8ktnixIOekTvCYLkHj26RI4ORkQv+rTpTAkzqmM6D4I9jxCbnWsFWci2Z3XN+PHfJVeiCXGx7tEtA/nr8Zkb7uJ7GGUm4lXo9XFEhudENs6vlLnzIZ1LdtU2+ezvvFvv+Ssha9Qit1UF6XtgMWIg9vcynZdgJ53wIzIvroBPW+H11AgAgig512wjqg3uzhA80+XVFWsc5R5yMc5Z/AMCughNbv+nKMCNMFYiZzDAT0Po0mLTvsQ7hAOp/LYh3CBcNrvMc6U2qNrpuK7HyG+8wEKngxvOqBburHabX2zVugI+w00xVCDjjACrkkfWqOzL/Yl9Ag2QrnshkJO2LMfztEZ+/uOpfhGGhp2Uz3rjI+ww4pYFT7XI77vR/iNbw/M1r0I0Q2lBWGvjnhGuMkXmz6EX+i2FqTfnD9Ht2Yr1WeHeMJYhX2WNXOEvbAU1KhfTBU4qxB28lRqi7QKCbSdrinGYeYmHkOmfdTxDDxrO8S/KcDaCW8SWcdef44csEDkqzbAZYa5id4lWw4w0Hti3MTycz3fMcA7TbyK17p9rRKbIk+FzKcv/fF42tvEV4pTSZNp6G+3fji9FH9Y0QEr4pxSVoha6D/r5OTkZKd4OXgjtMJ2SxQzkowiSuIszzMaRZIZD+8QzWo+UuMtTzUuhiiTWXJKJ8enLdt6OQlPl1wyU7s0TtnmX6MSWn8gw1ne/NC/S1zzVPFD8Vc1RdCvFv4sNgLJ6a59l3+o6yo06bAmT6pPcZmdOo1Cq2k8/GJYnrt+dvGXkF66HvIWL7GdQibAA1k/GJgRcjzz91AmBhR1+9RQo6TVjlD5uWE3pSDntk3lq9IT5Kkff00aN8bk1Mvnw/VHCvPVr/wgzAXgcvsuPOrpQFdoPlzAFczHtOrSBiO8ncdx5nf/a91PDoQII6wmZuhBKHhft527jmSYAcc0Ie+yxjZrng+CaJhQgA4NjCKaJYSdijQjDrEsN0vY17GsquUA1jCjhP9TGkWfNUBgoEnCb9Bc2y59DxCThL3COZqkHchiknAQrXTb6egJtX0kxk+o60MwfkJdXyUEhJr+ZggIvalWJWIg1Euqh4HQ08rIhoJQy+cMBaGWAzYOQp1ZHwfhViMQAgehp7E4RUKoMZoiIdQIlX8v4XyxXC5VjG8r9fnifYTLNIkpux6GBrO+z2tEBr6LcLKJqLhPa5xTRkAnH79STzzyHsJFUs1tx2m/4ED1ZABvIfTr8hNy2X0G+Sv10MB3EDZdrkH33S7mD6knA3gD4a5xuqbw0LK58pxvntBvKRss09hVyotv44SLVkNSBH5R9Rh6PITtJeM59D3KMbqmCQ8dixFwqiplY41pwqyj+4DDrcOREnZPYxLohqJ8A4Jhwq4qhKfjUg60Nkt47p7FoFnxluMkhJz+AZPIKGflMEsIubYA6G6jnP/HKCFo3wrsiMo7RKOEINsDNO9BPEbCBFQo4FCjepGFUUJQ1+EUtodSPdA3SQg8MwIOpqpJDU0STmADPDujJUxhS0lgkw9GSAjcDjCYA7HqBtG4fymAEDblYyaEmRUdoSP8JCHMkIGZEDbSqB4h4iFU9TTFQ6h6NjMGQthI4wgdoSN0hI7QETpCR+gIHaEjdISO0BE6QkfoCB2hI3SEjtAROkJH6AgdoSN0hI7QETpCR+gIHaEjdISO0BE6QkfoCB2hI4QIdiXwn7z6oEAeYBoECrvt9Z+iJzvnkLdXo6pgF88DYyJ5AiJUjbAEfcE/CeG4AERF+tD4ctDl2coZBwiJOlvc8W96EkDwLjzbOM+7v5dW7nL51RrEuT7VfT267xhsgMGHV4ms6yunehn2qcyDRu2j+q/HWdz8UBCwXt+cM972sn2/t9X+QouUHupdoNaX2Xitl9N/S8oTJRJlJP90EQwrJ1qZoscvkRD1lIooRGdEYz2HQWxL9FK2j15yQTRymyJQsQMgXmpzM2VhQehZvazzSkKLK5GlV0L9C4XGKlEmXSwJj5YOp/xq/iDXHbL+3V5jVHQ1Q14JvZmNtRjdUoLfCL2ZdbXI74APQi+Vdg03Qj5yvjwIvWM21NWlIxBn+Y+N9YewvPvKEkbBxJMZ+4nQm6eBZC2XpSMQ54LJIH02pT4TFlqEX5sMklV0nIqzzdehYr/+PyJejj+qK5H5AAAAAElFTkSuQmCC" alt="Click her"></img></a>
            </div>
          </div>

          <div style={{display: "inline-block"}}>
            <div className="social-title">GitHub :</div>
            <div className="cube">
              <a href="https://github.com/alikhutaba" target="_blank" rel="noopener noreferrer">
              <img className="github-img"  src="data:image/png;base64,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" alt="Click her"></img></a>
            </div>
          </div>


        </div>    

      </div>
    )
  }
}


const mapStateToProps = state =>{
    return {
      action : state.timerReducer.timer,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      setTimer : timer => dispatch(setTimer(timer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
