import React, {Component} from 'react';
import {  View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ExercisesListItem extends Component {

constructor(props) {
    super(props);
    this.state = {  
        expandExercise: false,
        exercises:this.props.exercises,
    }
}

toggleExpandExercise = () => {
    if (this.state.expandExercise) {
        this.setState({expandExercise:false});
    } else {
        this.setState({expandExercise:true});
    }
}

render(props){

    let content;
    if (this.state.expandExercise) {
        content = <View>
        <TouchableOpacity onPress={this.toggleExpandExercise}>
        <View style={styles.exerciseTitleContainer}>
        <Text style={styles.exerciseTitle}>
            {this.props.orderNumber} {" "}
            {this.props.exerciseName}</Text>
        </View>
        <View style={styles.exerciseContainer}>
        <View>
        <Image
        source={{uri:this.props.pictureMale}} style={{width: 200, height: 200}} />
        </View>
        <View style={styles.detailsContainer}>
        <View style={styles.textBorder1}>
        <Text style={styles.exerciseText}>Kartai: {this.props.reps}</Text>
        </View>
        <View style={styles.textBorder2}>
        <Text style={styles.exerciseText}>Setai: {this.props.sets}</Text>
        </View>
        <View style={styles.textBorder3}>
        <Text style={styles.exerciseText}>Ilsetis: {this.props.rest} m</Text>
        </View>
        <View style={styles.textBorder4}>
        <Text style={styles.exerciseText}>Svoris: {this.props.mass} kg</Text>
        </View>
        <View style={styles.textBorder5}>
        <Text style={styles.exerciseText}>Trukme: {this.props.duration} m</Text>
        </View>
        </View>
        </View>
        <View style={styles.bottomContainer}>
        <View style={styles.notesContainer}>
        <Text>{this.props.notes}</Text>
        </View>
        <View style={styles.completedContainer} >
        <Ionicons name="md-checkmark" size={32} color={this.props.completed ? "#aaf0d1" : "#eee"} />
        </View>
        </View>
        </TouchableOpacity>
        </View>
    } else {
        content = <View style={styles.content}>
        <TouchableOpacity onPress={this.toggleExpandExercise}>
        <View style={styles.exerciseTextWrap}>
        <View style={styles.textWrapTitle}>
        <Text style={styles.text1}>
        <Ionicons name="md-checkmark" size={14} color={this.props.completed ? "#aaf0d1" : "#fff"} />
        {" "} {this.props.exerciseName}</Text>
        </View>
        <View style={styles.textWrap1}>
        <Text style={styles.text2}>{this.props.mass} kg </Text>
       
        </View>
        <View style={styles.textWrap2}>
        <Text style={styles.text3}>{this.props.reps} </Text>
        </View>
        <View style={styles.textWrap3}>
        <Text style={styles.text4}>x {this.props.sets}</Text>
        </View>
        </View>
        </TouchableOpacity>
       </View>
    }

    return (
        <View>
        {content}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
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
    exerciseTitleContainer: {
        marginTop:10,
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
    exerciseTextWrap: {
        flex: 1,
        flexDirection:"row",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20
    },
    textWrapTitle: {
        width:"40%",
        paddingRight:10
    },
    textWrap1: {
        width:"30%",
        paddingRight:10,
        paddingLeft:5,
        borderLeftWidth: 5,
        borderColor:"#50bfe6" 
    },
    textWrap2: {
        width:"10%",
        paddingRight:10,
        paddingLeft:5,
        borderLeftWidth: 5,
        borderColor:"#c3cde6" 
    },
    textWrap3: {
        width:"10%",
        paddingLeft:5,
        borderLeftWidth: 5,
        borderColor:"#aaf0d1" 
    },
    text1: {
        fontWeight: "bold"
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

export default ExercisesListItem;
