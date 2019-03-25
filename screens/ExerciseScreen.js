import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import Exercises from '../components/Exercises/Exercises';

import { connect } from 'react-redux';

class ExerciseScreen extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      workout: [ ],
      user:{
       
      },
      loggedInUser:{
        name:'',
        gender:'',
        email:'',
        id:'',
      },
      users:[]
    }
  }
  static navigationOptions = {
    title: 'Treniruote',
  };
  
  render() {

     if(this.props.isLoading) {
      content = <ActivityIndicator size="large" color="#50bfe6"/>;
    } else {
      content = <Exercises
      key={this.props.workouts[0].id}
      name={this.props.workouts[0].name}
      gender={this.props.workouts[0].gender}
      orderNumber={this.props.workouts[0].orderNumber}
      workoutCompleted={this.props.workouts[0].workoutCompleted}
      completedCount={this.props.workouts[0].completedCount}
      dateCreated={this.props.workouts[0].dateCreated}
      dateOfWorkout={this.props.workouts[0].dateOfWorkout}
      exercises={this.props.workouts[0].exercises}
      id={this.props.workouts[0].id}
      workoutsCompleted={this.props.user.workoutsCompleted}
      userId={this.props.user.id}
     />
    }


    return (
      <ScrollView style={styles.container}>
          {content}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => {
  return {
      loggedInUser: state.exercises.loggedInUser,
      user: state.exercises.user,
      workouts: state.exercises.workouts,
      isLoading: state.ui.isLoading
  };
};

export default connect(mapStateToProps)(ExerciseScreen);