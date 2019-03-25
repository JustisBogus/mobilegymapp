import React from 'react';
import { ActivityIndicator, Text, StyleSheet, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
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

  render() {

    let content = <FlatList 
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
/>;

    if(this.props.isLoading) {
      content = <ActivityIndicator size="large" color="#50bfe6" />;
    } 


    return (
      <View style={styles.container}>
                {content}
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
      isLoading: state.ui.isLoading
  };
};

export default connect(mapStateToProps)(HistoryScreen);