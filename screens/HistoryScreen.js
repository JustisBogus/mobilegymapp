import React from 'react';
import { ScrollView, StyleSheet, FlatList, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { connect } from 'react-redux';
import fire from '../firebase/fire';
import ExercisesHistory from '../components/Exercises/ExercisesHistory';

class HistoryScreen extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      workouts: [ ],
      
      loggedInUser:{
        name:'',
        gender:'',
        email:'',
        id:'',
      }
    }
  }
  static navigationOptions = {
    title: 'Atliktos',
  };
/*
componentWillMount() {

let exerciseRef = fire.database().ref("workouts").orderByKey().limitToLast(100);
exerciseRef.on('child_added', snapshot => {
let exercise = {
              name:snapshot.val().name,
              email:snapshot.val().email,
              trainer:snapshot.val().trainer,
              gender:snapshot.val().gender,
              exercises:snapshot.val().exercises,
              dateCreated:snapshot.val().dateCreated,
              dateOfWorkout:snapshot.val().dateOfWorkout,
              id: snapshot.key };
              if(exercise.email===this.props.loggedInUser) {
              this.setState({ workouts: [exercise].concat(this.state.workouts) });
              }
});
  }
*/
  render() {

    return (
      <View style={styles.container}>
                <FlatList 
                   key={this.props.workouts.id}
                    data={this.props.workouts}
                    renderItem={({item}) => (  
                      <ExercisesHistory 
                       name={item.name}
                       gender={item.gender}
                       dateCreated={item.dateCreated}
                       dateOfWorkout={item.dateOfWorkout}
                       exercises={item.exercises}
                       id={item.id}
                       workoutCompleted={item.workoutCompleted}
                       />
        )}
        keyExtractor={(item) => item.id }
        />
        </View>
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

export default connect(mapStateToProps)(HistoryScreen);