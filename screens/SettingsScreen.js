import React from 'react';

import { View, } from 'react-native';
import Timer from '../components/Timer/Timer';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    title: 'Įrankiai',
  };

  render() {
   
    return (
      <View>
        <Timer/>
      </View>
    
    
      );
  }
}
