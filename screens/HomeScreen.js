import React from 'react';
import {
  Image,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addWorkouts, updateUser, uiStopLoading } from '../store/actions/index';
import fire from '../firebase/fire';
import altogymlogo from './../assets/images/gymlogo.png';
import News from '../components/News/News';
import FontAwesome from '@expo/vector-icons/FontAwesome';

class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      user:"",
      news:[]
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

  let newsRef = fire.database().ref("news").orderByKey().limitToLast(10);
  newsRef.on('child_added', snapshot => {
    let news = {
      newsMessage: snapshot.val().newsMessage,
      dateCreated: snapshot.val().dateCreated,
      author: snapshot.val().author,
      id: snapshot.key };
      this.setState({news:[news].concat(this.state.news)});
  })
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
          <View style={styles.newsContainer}>
          <View style={styles.newsTitle}>
          <Text style={styles.newsTitleText} >Naujienos</Text>
          </View>
          <FlatList 
                 style={styles.newsFlatList}
                 data={this.state.news}
                 renderItem={({item}) => (  
                 <News
                 newsMessage={item.newsMessage}
                 dateCreated={item.dateCreated}
                 author={item.author}
                 />
        )}
        keyExtractor={(item) => item.id }
        />
        </View>
        <View style={styles.iconContainer}> 
          <Ionicons name="md-trophy" size={36} color={"#fcd667"}/>
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
    color: '#50bfe6',
    fontWeight: "100"
  },
  contentContainer: {
    paddingTop: 30,
  },
  newsContainer: {
    flex:1,
    alignItems: 'center',
    width:270,
    marginTop:20
  },
  newsTitle: {
    marginBottom: 20
  },
  newsTitleText: {
    fontSize: 18,
    fontWeight:'100'
  },
  newsFlatList: {
    width:'100%',
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