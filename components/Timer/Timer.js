import React from 'react';
import { View, Button, StyleSheet, Text} from 'react-native';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      timerStopped: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }
  static navigationOptions = {
    title: 'Irankiai',
  };

  startTimerHandler = (e) => {
    e.preventDefault();
    if(this.state.timerStopped) {
    this.timer = setInterval(() => {   
    this.setState({timerStarted: true, timerStopped: false});
    if(this.state.timerStarted) {
        if(this.state.seconds >= 60) {
            this.setState((prevState) => ({ minutes: prevState.minutes + 1, seconds: 0 }))
        }
        if (this.state.minutes >= 60) {
            this.setState((prevState) => ({ hours: prevState.hours + 1, minutes:0, seconds: 0 }))
        }
        this.setState((prevState) => ({ seconds: prevState.seconds +1 }))
    }
    }, 1000);
  }
}

    stopTimerHandler = (e) => {
        e.preventDefault();
        this.setState({timerStarted: false, timerStopped: true});
        clearInterval(this.timer);
    }

    resetTimerHandler = (e) => {
        e.preventDefault();
        this.setState({timerStarted: false, timerStopped: true});
        clearInterval(this.timer);
        this.setState({hours: 0, minutes: 0, seconds: 0});
    }

  render() {
    
    let startStopButton;
    if (this.state.timerStarted) {
        startStopButton = <Button title="Sustabdyti" onPress={this.stopTimerHandler.bind(this)}/>
    } 
    if (this.state.timerStopped && this.state.hours === 0 && this.state.minutes === 0 && this.state.seconds === 0) {
       startStopButton =  <Button title="Pradėti" onPress={this.startTimerHandler.bind(this)} />
    }
    if (this.state.timerStopped && (this.state.hours !== 0 || this.state.minutes !== 0 || this.state.seconds !== 0)) {
        startStopButton =  <Button title="Tęsti" onPress={this.startTimerHandler.bind(this)} />
    }

    return (
      <View style={styles.content}>
        <Text style={styles.timerText}>
             {this.state.hours < 10 ? "0" : null}
             {this.state.hours}: 
             {this.state.minutes < 10 ? "0" : null}
             {this.state.minutes}: 
             {this.state.seconds < 10 ? "0" : null}
             {this.state.seconds}</Text>
        <View style={styles.buttonContainer}>
        <View style={styles.startStopButtonContainer}>
        {startStopButton}
        </View>
        <View style={styles.resetButtonContainer}>
        <Button title="Istrinti" onPress={this.resetTimerHandler.bind(this)}/>
        </View>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
    content: {
      height: 120,
      alignItems: "center",
      paddingTop: 15,
      backgroundColor: "#fafafa"
    },
    timerText: {
        fontSize: 42,
        fontWeight:"100"
    },
    buttonContainer: {
        flex: 1, 
        flexDirection: "row",
    },
    startStopButtonContainer: {
        marginRight: 10,
        width:100
    },
    resetButtonContainer: {
        marginLeft: 10,
        width:100
    },
  });