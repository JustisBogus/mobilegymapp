import React, {Component} from 'react';
import {View, Button, Text, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard, Image, TouchableOpacity} from 'react-native';
import fire from '../firebase/fire';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { FormLabel, FormInput } from 'react-native-elements';
import Logo from './../assets/images/logo.png';

import { connect } from 'react-redux';
import { addUser } from '../store/actions/index';

import {StackNavigator} from 'react-navigation';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            gender:'',
            email:'',
            password:'',
            error:'',
            loading:false,
            login:true,
            user: {
            },
            displayUser: false,
        }
    }

/*
        componentDidMount = () => {
            fire.auth().onAuthStateChanged((user) => {
                if (user) {
                 // this.setState({user});
   this.setState(prevState => {
                    return {
                       user
                    }
                 });
                } else {
                  this.setState({user: null});
                }
              });
        }
*/

        onAddUser = () => {
        let email = this.state.email
         this.props.onAddUser(email);
         //  this.setState(prevState => {
       //     return {
           //     loggedInUser: this.state.user,
         //   }
        //   });
          }

        onLoginPress = () => {
        this.setState({error:'', loading:true});
        const{email, password} = this.state;
        fire.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            this.setState({error:'',loading:false});
            this.props.navigation.navigate('Main',{ email: this.state.email});
            this.onAddUser();
        })
        .catch(() => {
            this.setState({error:'Authentication failed',loading:false});
        })
    
    }
        onSignUpPress = () => {
        this.setState({error:'', loading:true});
        const{email, password} = this.state;
        fire.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            this.setState({error:'',loading:false});
            this.props.navigation.navigate('Main',{ email: this.state.email});
            this.onAddUser();
            let newUser = {
                id: '',
                email: this.state.email.toLowerCase(),
                name: this.state.name,
                gender: this.state.gender,
             }
        
             fire.database().ref('users').push(newUser);
    
        })
        .catch(() => {
            this.setState({error:'Authentication failed',loading:false});
        })
    }

toggleLogin = () => {
    if(this.state.login) {
        this.setState({login:false});
    } else {
        this.setState({login:true});
    }
}


renderLoginButtonOrLoading = () => {
    if(this.state.loading) {
        return <Text> Loading </Text>
    }
    return <View>
        <Button title='Login' onPress={this.onLoginPress.bind(this)}/>
    </View>
}

renderSignUpButtonOrLoading = () => {
    if(this.state.loading) {
        return <Text> Loading </Text>
    }
    return <View>
        <Button title='Sign Up' onPress={this.onSignUpPress.bind(this)}/>
    </View>
}

validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    this.setState({email:text})
    return false;
      }
    else {
      this.setState({email:text})
    }
    }

switchToMale = () => {
    this.setState({gender:'male'});
}

switchToFemale = () => {
    this.setState({gender:'female'});
}

render() {
    if (this.state.login) {
        return (
            <View style={styles.container}>
              <View style={styles.imageContainer}>
              <Image source={Logo} style={{width: 100, height: 40}}/>
              </View>
                <Text>Email</Text>
                <View style={styles.inputContainer1}>
                <TextInput style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => this.validate(text)}
                onChangeText={email => this.setState({email})} />
                </View>
                <Text>Password</Text>
                <View style={styles.inputContainer3}>
                <TextInput style={styles.input}
                value = {this.state.password}
                autoCorrect={false}
                secureTextEntry
                onChangeText={password => this.setState({password})} />
                </View>
                <Text>{this.state.error}</Text>
                {this.renderLoginButtonOrLoading()}
                <TouchableOpacity>
                <Text onPress={this.toggleLogin}>Don't have an account? Sign Up</Text>
               <Text> {this.props.loggedInUser} </Text> 
                </TouchableOpacity>    
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
            <Text>Email</Text>
            <View style={styles.inputContainer1}>
            <TextInput
            style={styles.input}
            autoCapitalize = 'none'
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={email => this.setState({email})} />
            </View>
            <View style={styles.genderSwitchContainer}>
            <Button title='Male' onPress={() => this.switchToMale()}/>
            <Button title='Female' onPress={() => this.switchToFemale()}/>
            </View>
            <Text>Name</Text>
            <View style={styles.inputContainer2}>
            <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={name => this.setState({name})} />
            </View>
            <Text>Password</Text>
            <View style={styles.inputContainer3}>
            <TextInput
            style={styles.input}
            autoCorrect={false}
            value = {this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({password})} />
            </View>
            <Text>{this.state.error}</Text>
            {this.renderSignUpButtonOrLoading()}
            <TouchableOpacity>
            <Text onPress={this.toggleLogin}>Already have an account? Login </Text>
            </TouchableOpacity>     
        </View>
        )
    }
}

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:'40%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    genderSwitchContainer: {
        flexDirection: "row",
        justifyContent: "space-between" 
    },
    backgroundImage: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer1:{
      width:'80%',
      borderBottomWidth: 1,
      borderColor: "#50bfe6",
      marginBottom:20
    },
    inputContainer2: {
      width:'80%',
      borderBottomWidth: 1,
      borderColor: "#c3cde6",
      marginBottom:20
    },
    inputContainer3:{
      width:'80%',
      borderBottomWidth: 1,
      borderColor: "#aaf0d1",
    },
    imageContainer: {
      marginBottom:20
    },
    input: {
      backgroundColor:'#fff',
      borderColor: '#bbb',
      width:'100%',
      fontSize:14
    },
  
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    landscapePasswordContainer: {
      flexDirection: "row",
      justifyContent: "space-between" 
    },
    portraitPasswordContainer: {
      flexDirection: "column",
      justifyContent: "flex-start" 
    },
    landscaperPasswordWrapper: {
      width: "45%",
    },
    portraitPasswordWrapper: {
      width: "100%",
    }
  });

const mapStateToProps = state => {
    return {
        loggedInUser: state.exercises.loggedInUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
    onAddUser: (email) => dispatch(addUser(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);