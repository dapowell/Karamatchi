import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Title extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.level, {backgroundColor: this.props.colors[this.props.level].color, borderColor: this.props.colors[this.props.level].color}]}>
            <Image style={styles.texture} source={this.props.getImageTexture(this.props.colors[this.props.level].color)} />
            <Text style={styles.text}>{this.props.level}</Text>
        </View>
        {this.props.colors.map((colors, i) => (
            <Text style={[styles.letter, {color: i < this.props.level + 1 ? colors.color : '#999'}]} key={i}>{colors.letter}</Text>
        ))}
        <TouchableOpacity style={styles.menuIconWrap} onPress={this.props.toggleMenu} activeOpacity={1}>
          <Icon 
              name='cog' 
              style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 4,
    width: '100%',
    top: 40
  },
  letter: {
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 4,
    textAlignVertical: 'center',
    marginRight: 2
  },
  level: {
    position: 'absolute',
    left: 10,
    top: 4,
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    width: 30,
    color: '#000',
    textAlign: 'center',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 2,
    flex: 1,
    justifyContent: 'center'
    
  },
  menuIconWrap: {
    position: 'absolute',
    right: 10,
    top: 4,
    width: 60,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  menuIcon: {
      fontSize: 30,
      textShadowColor: '#333',
      textShadowRadius: 4,
      color: '#DDD'
  },
  texture: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 2
  },
  text: {
    color: '#DDD',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 2,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '100%',
    textAlign: 'center'
  }
})
