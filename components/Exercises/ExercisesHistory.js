import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ExercisesListItem from '../Exercises/ExercisesListItem';

class ExercisesHistory extends Component {

constructor(props) {
    super(props);
    this.state = {  
        expandWorkout: false,
        exercises:this.props.exercises,
    }
}

toggleExpandWorkout = () => {
    if (this.state.expandWorkout) {
        this.setState({expandWorkout:false});
    } else {
        this.setState({expandWorkout:true});
    }
}

render(props){

   let exercises;
    if (this.state.expandWorkout) {
        exercises = this.props.exercises.map(exercise => {
            return <ExercisesListItem
                key={exercise.orderNumber}
                exerciseName={exercise.exerciseName}
                pictureMale={exercise.pictureMale}
                reps={exercise.reps}
                sets={exercise.sets}
                rest={exercise.rest}
                mass={exercise.mass}
                duration={exercise.duration}
                notes={exercise.notes}
                completed={exercise.completed}
               />   
      });
    }

    return (
        <View style={styles.content}>
        <TouchableOpacity onPress={this.toggleExpandWorkout}>
        <Text style={styles.workoutTitle}>
        {this.props.exercises.length } Pratimai 
        {"   "}
        {this.props.dateOfWorkout} 
        {"   "}
        <Ionicons name="md-trophy" size={24} color={this.props.workoutCompleted ? "#fcd667" : "#fafafa"} />
        </Text>
        </TouchableOpacity>
        {exercises}
       </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      borderBottomWidth:1,
      borderColor:"#50bfe6",
    },
    workoutTitle: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    paddingTop:7,
    paddingBottom: 7,
    backgroundColor: '#fafafa'
        },
    exerciseTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5, 
    },
    exerciseContainer: {
        flex: 1, 
        flexDirection: 'row',
    },
    detailsContainer: {
        flex: 1, 
        flexDirection: 'column',
    },
    exerciseText: {
        marginTop: 5,
        marginBottom: 5,  
    },
    textBorder1: {
        borderLeftWidth: 5,
        borderColor: "#50bfe6",
        paddingLeft: 5,
        marginTop: 30   
    },
    textBorder2: {
        borderLeftWidth: 5,
        borderColor: "#c3cde6",
        paddingLeft: 5,   
    },
    textBorder3: {
        borderLeftWidth: 5,
        borderColor: "#aaf0d1",
        paddingLeft: 5,   
    },
    textBorder4: {
        borderLeftWidth: 5,
        borderColor: "#fcd667",
        paddingLeft: 5,   
    },
    textBorder5: {
        borderLeftWidth: 5,
        borderColor: "#d92121",
        paddingLeft: 5,   
    },
    notesContainer: {
        paddingLeft: 20,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
        width: "80%"
    },
    completedContainer: {
        width: "20%",
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1, 
        flexDirection: 'row',
    }
  });

export default ExercisesHistory;
