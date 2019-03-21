import React from 'react';
import { ScrollView, StyleSheet, Text} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import fire from '../firebase/fire';
import Exercises from '../components/Exercises/Exercises';

import { connect } from 'react-redux';
import { addUser } from '../store/actions/index';

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
    /*
  componentWillMount(){

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    });
    
    fire.database().ref('users').on('child_added', snapshot => {
            
      let user = { email: snapshot.val().email,
                  name: snapshot.val().name,
                  gender: snapshot.val().gender,
                  id: snapshot.key };
    this.setState({ users: [user].concat(this.state.users)});

      const useremail = this.state.user.email;
      const userlogin = this.state.users;
      for(var i=0; i < userlogin.length; i++ ){
          if(userlogin[i].email === useremail ) {

           this.setState({loggedInUser:userlogin[i]});    
          }
      }
      
      this.setState({users: userlogin});

});

let exerciseRef = fire.database().ref("workouts").orderByKey().limitToLast(100);
exerciseRef.on('child_added', snapshot => {
let exercise = {
              name:snapshot.val().name,
              email:snapshot.val().email,
              trainer:snapshot.val().trainer,
              gender:snapshot.val().gender,
              workoutCompleted:snapshot.val().workoutCompleted,
              completedCount:snapshot.val().completedCount,
              exercises:snapshot.val().exercises,
              dateCreated:snapshot.val().dateCreated,
              dateOfWorkout:snapshot.val().dateOfWorkout,
              id: snapshot.key };
              if(exercise.email===this.props.loggedInUser) {
              this.setState({ workout: [exercise].concat(this.state.workout) });
              }
});
  }
*/
  render() {
/*
    let workout = this.state.workout.map(workout => {
          return <Exercises
              key={workout.id}
              name={workout.name}
              gender={workout.gender}
              orderNumber={workout.orderNumber}
              dateCreated={workout.dateCreated}
              dateOfWorkout={workout.dateOfWorkout}
              exercises={workout.exercises}
             />                    
    });
*/
    let exercises;
    if (this.props.workouts.length!==0){
      exercises = <Exercises
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
     />
    }

    return (
      <ScrollView style={styles.container}>
      {exercises}
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
      workouts: state.exercises.workouts,
  };
};

export default connect(mapStateToProps)(ExerciseScreen);