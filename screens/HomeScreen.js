import React from 'react';
import {
  Image,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addWorkouts, updateUser, uiStopLoading } from '../store/actions/index';
import fire from '../firebase/fire';
import altogymlogo from './../assets/images/gymlogo.png';

class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      user:"",
    }
  }
  static navigationOptions = {
    header: null,
  };

  componentWillMount(){
   
let exerciseRef = fire.database().ref("workouts").orderByKey().limitToLast(100);
exerciseRef.on('child_added', snapshot => {
let workouts = {
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
              if(workouts.email===this.props.loggedInUser) {;
                this.props.onAddWorkouts(workouts);
                if (workouts) {
                  this.props.onStopLoading();
                }
              }
});

let userRef = fire.database().ref("users").orderByKey().limitToLast(100);
userRef.on('child_added', snapshot => {
  let user = {
      name: snapshot.val().name,
      email: snapshot.val().email,
      workoutsCompleted: snapshot.val().workoutsCompleted,
      achievements: snapshot.val().achievements,
      gender: snapshot.val().gender,
      id: snapshot.key };
      if (user.email===this.props.loggedInUser) {
        this.props.onUpdateUser(user);
        this.setState({user:user});
      }
  });
  }

  componentDidMount = () => {
    
fire.database().ref('users').on('child_changed', snapshot => {
        if(this.state.user.id === snapshot.key) {
            user = {
              name: snapshot.val().name,
              email: snapshot.val().email,
              workoutsCompleted: snapshot.val().workoutsCompleted,
              achievements: snapshot.val().achievements,
              gender: snapshot.val().gender,
              id: snapshot.key
            };
     
        this.setState({user: user});
    }
});
}

  render() {

  let content;

  if (this.state.user) {
    content = <View style={styles.userContainer}>
      <View style={styles.iconContainer}> 
          <Ionicons name="md-trophy" size={64} color={"#fcd667"}/>
          <View style={styles.workoutsCompletedTextContainer}>
          <Text style={styles.workoutsCompletedText}>
          x {this.state.user.workoutsCompleted} </Text>
          </View>
          </View>
          <Text style={styles.userNameText}>{this.state.user.name}</Text>
    </View>
  } else {
    content = 
    <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator size="large" color="#50bfe6"/>
    </View>
  }

    return (
      <View style={styles.container}>
      <Image source={altogymlogo} style={{width: 100, height: 60}}/>
          {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      paddingTop:'20%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  activityIndicatorContainer: {
    paddingTop:100
  },
  iconContainer: {
        flexDirection: 'row',
  },
  userContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  workoutsCompletedTextContainer: {
    justifyContent: 'center',
  },
  workoutsCompletedText: {
    fontSize: 24
  },
  userNameText: {
    color: '#50bfe6'
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});

const mapStateToProps = state => {
  return {
    workouts: state.exercises.workouts,
    loggedInUser: state.exercises.loggedInUser,
    user: state.exercises.user
  };
};

const mapDispatchToProps = dispatch => {
      return {
        onAddWorkouts: (workouts) => dispatch(addWorkouts(workouts)),
        onStopLoading: () => dispatch(uiStopLoading()),
        onUpdateUser: (user) => dispatch(updateUser(user))
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);