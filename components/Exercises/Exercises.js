import React, {Component} from 'react';
import { ScrollView, View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem, withTheme } from 'react-native-elements';
import { benchpressmale } from '../../assets/images/benchpressmale.jpg';
import { bicepcurlmale } from '../../assets/images/bicepcurlmale.jpg';
import { Ionicons } from '@expo/vector-icons';
import fire from '../../firebase/fire';


class Exercises extends Component {

constructor(props) {
    super(props);
    this.state = {  
        exercises:this.props.exercises,
        workoutCompleted:this.props.workoutCompleted,
        completedCount:this.props.completedCount,
    }
}

completeHandler = (item) => {
    const id = item.orderNumber;
    let updates;
    if (this.state.exercises[id].completed) {
       updates = {
           "completed": false
       }
    let exercises = [...this.state.exercises];
    let exercise = {...exercises[id]};
    exercise.completed = false;
    exercises[id] = exercise;
    this.setState({exercises});
       fire.database().ref('workouts').child(this.props.id).child('exercises').child(id).update(updates);
       
       this.setState((prevState) => ({
        completedCount: prevState.completedCount - 1
    })); 
   
        let exercisesCompleted = this.state.exercises
    if (exercisesCompleted.length!==this.state.completedCount+1) {
        this.setState({workoutCompleted:false});
        let workoutCompleted = {
            "workoutCompleted": false,
        }
        fire.database().ref('workouts').child(this.props.id).update(workoutCompleted);
    }

        let completedCountUpdate = {
            "completedCount": this.state.completedCount - 1,
        }
        fire.database().ref('workouts').child(this.props.id).update(completedCountUpdate);
    } else {
        updates = {
            "completed": true
        }
    let exercises = [...this.state.exercises];
    let exercise = {...exercises[id]};
    exercise.completed = true;
    exercises[id] = exercise;
    this.setState({exercises});
        fire.database().ref('workouts').child(this.props.id).child('exercises').child(id).update(updates);
       
       let exercisesCompleted = this.state.exercises
       this.setState((prevState) => ({
        completedCount: prevState.completedCount + 1
    }));

    if (exercisesCompleted.length===this.state.completedCount+1) {
        this.setState({workoutCompleted:true});
        let workoutCompleted = {
            "workoutCompleted": true,
        }
        fire.database().ref('workouts').child(this.props.id).update(workoutCompleted);
    }

    let completedCountUpdate = {
        "completedCount": this.state.completedCount + 1,
    }
        fire.database().ref('workouts').child(this.props.id).update(completedCountUpdate);
       
    }
}

render(props){

 const exerciseList = <FlatList 
                    key={this.state.exercises.orderNumber}
                    data={this.state.exercises}
                    renderItem={({item}) => (  
                        <View>
                <View style={styles.exerciseTitleContainer}>
                <Text style={styles.exerciseTitle}>
                {item.exerciseName}</Text>
                </View>
                <View style={styles.exerciseContainer}>
                <View>
                <Image
                source={{uri:item.pictureMale}} style={{width: 200, height: 200}} />
                </View>
                <View style={styles.detailsContainer}>
                <View style={styles.textBorder1}>
                <Text style={styles.exerciseText}>Svoris: {item.mass} kg</Text>
                </View>
                <View style={styles.textBorder2}>
                <Text style={styles.exerciseText}>Kartai: {item.reps}</Text>
                </View>
                <View style={styles.textBorder3}>
                <Text style={styles.exerciseText}>Setai: {item.sets}</Text>
                </View>
                <View style={styles.textBorder4}>
                <Text style={styles.exerciseText}>Ilsetis: {item.rest} m</Text>
                </View>
                <View style={styles.textBorder5}>
                <Text style={styles.exerciseText}>Trukme: {item.duration} m</Text>
                </View>
                </View>
                </View>
                <View style={styles.bottomContainer}>
                <View style={styles.notesContainer}>
                <Text>{item.notes}</Text>
                </View>
                <TouchableOpacity style={styles.completedContainer} onPress={() => this.completeHandler(item)}>
                <Ionicons name="md-checkmark-circle" size={32} color={item.completed ? "#aaf0d1" : "#eee"} />
                </TouchableOpacity>
                </View>
                </View>
        )}
        keyExtractor={(item) => item.orderNumber }
        />;

    return (
        <ScrollView style={styles.content}>
        <Text style={styles.workoutTitle}> Naujausia Treniruote {this.props.dateOfWorkout}</Text>
        {exerciseList}
        <View style={styles.trophyIconContainer}>
        <Ionicons name="md-trophy" size={64} color={this.state.workoutCompleted ? "#fcd667" : "#eee"} />
        </View>
       </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      paddingTop: 15,
    },

    workoutTitle: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    paddingTop:5,
    paddingBottom: 5,
    backgroundColor: '#eee'
        },
    exerciseTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5, 
    },
    exerciseTitleContainer:{
        marginTop:10,
        backgroundColor:'#fafafa'
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
        marginLeft: "20%",
        paddingTop: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
        width: "60%"
    },
    completedContainer: {
        width: "20%",
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1, 
        flexDirection: 'row',
    },
    trophyIconContainer: {
        alignItems: 'center',
        marginTop:20,
        marginBottom:40,
    }
  });

export default Exercises;
