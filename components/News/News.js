import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class News extends React.Component {
  render() {
    return (
     <View style={styles.newsMessageContainer}>
         <View style={styles.dateCreatredContainer}>
         <Text style={styles.newsDateCreatedText}>{this.props.dateCreated} </Text>
         </View>
         <Text style={styles.newsMessageText}>{this.props.newsMessage}</Text>
     </View>
    );
  }
}

const styles = StyleSheet.create({
    newsMessageContainer: {
      flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fafafa',
        marginTop:5,
        marginBottom:5
    },
    dateCreatredContainer: {
        flex: 1,
        flexDirection:'row',
        marginBottom:5
    },
    newsMessageText: {
       fontSize: 14
    },
    newsDateCreatedTexr: {
        fontWeight: '100'
    }
})