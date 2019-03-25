import React, {Component} from 'react';
import {View, Button, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Keyboard, Image, TouchableOpacity} from 'react-native';
import fire from '../firebase/fire';
import Logo from './../assets/images/logo.png';

import { connect } from 'react-redux';
import { addUser } from '../store/actions/index';

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
            emailError:false,
            passwordError:false,
            passwordCount:""
        }
    }



        onAddUser = () => {
        let email = this.state.email
        this.props.onAddUser(email);
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
            this.setState({error:'Netinkamas prisijungimas',loading:false});
        })
    }

        onSignUpPress = () => {
          if (this.state.name) {
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
                workoutsCompleted: 0,
                achievements: " "
             }
        
             fire.database().ref('users').push(newUser);
    
        })
        .catch(() => {
            this.setState({error:'Prisiregistruoti nepavyko',loading:false});
        })
      }
        else {
          this.setState({error:"Iveskite varda"});
        }
    }

toggleLogin = () => {
    if(this.state.login) {
        this.setState({login:false});
        this.setState({
        error:"", 
        email:"", 
        emailError:false, 
        password:"", 
        passwordError:false,
        passwordCount:""
      });
        
    } else {
        this.setState({login:true});
        this.setState({
          error:"", 
          email:"", 
          emailError:false, 
          password:"", 
          passwordError:false,
          passwordCount:""
      });
    }
}


renderLoginButtonOrLoading = () => {
    if(this.state.loading) {
        return <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator />
        </View>
    }
    return <View>
        <Button title='Prisijungti' onPress={this.onLoginPress.bind(this)}/>
    </View>
}

renderSignUpButtonOrLoading = () => {
    if(this.state.loading) {
        return <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator />
        </View>
    }
    return <View>
        <Button title='Užsiregistruoti' onPress={this.onSignUpPress.bind(this)}/>
    </View>
}

validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false && text !== "")
    {
    this.setState({email:text})
    this.setState({emailError:true});
    return false;
      }
    else {
      this.setState({email:text})
      this.setState({emailError:false});
    }
    }

validatePassword = (text) => {
      if(text.length < 6 && text !== "") {
        this.setState({password:text});
        this.setState({passwordCount:text.length});
        this.setState({passwordError:true}); 
      } else {
        this.setState({password:text});
        this.setState({passwordCount:text.length});
        this.setState({passwordError:false});     
      }
  }


render() {

let loginText;

if (this.state.loading) {
  loginText = <Text onPress={this.toggleLogin}></Text>
} else {
  loginText = <Text onPress={this.toggleLogin}>Nesat užsiregistravę?</Text>
}

let signupText;

if (this.state.loading) {
  signupText = <Text onPress={this.toggleLogin}></Text>
} else {
  signupText = <Text onPress={this.toggleLogin}>Jau užsiregistravę? </Text>
}

    if (this.state.login) {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
              <View style={styles.imageContainer}>
              <Image source={Logo} style={{width: 100, height: 40}}/>
              </View>
                <Text>E-Paštas</Text>
                <View style={this.state.emailError ? styles.inputContainerError1 : styles.inputContainer1}>
                <TextInput style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => this.validateEmail(text)}
                 />
                </View>
                <Text>Slaptažodis</Text>
                <View style={this.state.passwordError ? styles.inputContainerError3 : styles.inputContainer3}>
                <TextInput style={styles.input}
                value = {this.state.password}
                autoCorrect={false}
                secureTextEntry
                onChangeText={(text) => this.validatePassword(text)}  />
                <Text style={this.state.passwordCount < 6 ? 
                styles.passwordCountTextRed :
                styles.passwordCountTextGreen}>{this.state.passwordCount}</Text>
                </View>
                <Text style={styles.errorText}>{this.state.error}</Text>
                {this.renderLoginButtonOrLoading()}
                <TouchableOpacity>
                {loginText}
               <Text> {this.props.loggedInUser} </Text> 
                </TouchableOpacity>    
            </KeyboardAvoidingView>
        );
    } else {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Text>E-Paštas</Text>
            <View style={this.state.emailError ? styles.inputContainerError1 : styles.inputContainer1}>
            <TextInput
            style={styles.input}
            autoCapitalize = 'none'
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => this.validateEmail(text)} />
            </View>
            <Text>Vardas</Text>
            <View style={styles.inputContainer2}>
            <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={name => this.setState({name})} />
            </View>
            <Text>Slaptažodis</Text>
            <View style={this.state.passwordError ? styles.inputContainerError3 : styles.inputContainer3}>
            <TextInput
            style={styles.input}
            autoCorrect={false}
            value = {this.state.password}
            secureTextEntry
            onChangeText={(text) => this.validatePassword(text)} />
            <Text style={this.state.passwordCount < 6 ? 
            styles.passwordCountTextRed :
            styles.passwordCountTextGreen}>{this.state.passwordCount}</Text>
            </View>
            <Text style={styles.errorText}>{this.state.error}</Text>
            {this.renderSignUpButtonOrLoading()}
            <TouchableOpacity>
            {signupText}
            </TouchableOpacity>     
        </KeyboardAvoidingView>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:'35%',
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
    inputContainerError1: {
      width:'80%',
      borderBottomWidth: 1,
      borderColor: "#d92121",
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
      flexDirection: "row",
        justifyContent: "space-between" 
    },
    inputContainerError3: {
      width:'80%',
      borderBottomWidth: 1,
      borderColor: "#d92121",
      flexDirection: "row",
      justifyContent: "space-between" 
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
    errorText: {
      color:"#d92121"
    },
    passwordCountTextGreen: {
      fontSize:12,
      color:"#aaf0d1"
    },
    passwordCountTextRed: {
      fontSize:12,
      color:"#d92121"
    },
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