import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Button, StyleSheet, Text} from 'react-native';
import Timer from '../components/Timer/Timer';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    title: 'Irankiai',
  };

  render() {
   
    return (
      <View>
        <Timer/>
      </View>
    
    
      );
  }
}
