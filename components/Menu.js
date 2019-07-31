import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import background from '../assets/images/glass_w.png';

const window = Dimensions.get('window');

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} source={background} />
        <ScrollView style={styles.content}>
            <TouchableHighlight style={styles.highlight} onPress={this.props.toggleMusic}>
              <View style={styles.item}>
                <Icon name='music' style={styles.itemIcon} />
                <Text style={styles.itemText}>{this.props.musicOn ? 'Turn Music Off' : 'Turn Music On'}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.highlight} onPress={this.props.toggleAudio}>
              <View style={styles.item}>
                <Icon name='volume-up' style={styles.itemIcon} />
                <Text style={styles.itemText}>{this.props.soundOn ? 'Turn Sounds Off' : 'Turn Sounds On'}</Text>
              </View>
            </TouchableHighlight>
            <View style={[styles.item, styles.hr]}></View>
            <TouchableHighlight style={styles.highlight} onPress={() => this.props.playLevel(this.props.level)}>
              <View style={styles.item}>
                <Icon name='redo-alt' style={styles.itemIcon} />
                <Text style={styles.itemText}>Restart Level</Text>
              </View>
            </TouchableHighlight>
            <View style={[styles.item, styles.heading]}>
                <Text style={styles.itemText}>Play Level:</Text>
            </View>
            <View style={styles.grid}>
              {this.props.levels.map((row, i) => (
                <View key={i} style={styles.row}>
                  {row.map((level) => (
                    <View key={level.level} style={[styles.cell]}>
                      <TouchableHighlight style={[styles.cell, {opacity: this.props.maxLevel - 1 < level.level ? 0.3 : 1}]} onPress={() => this.props.playLevel(level.level + 1)}>
                          <View style={[styles.contents, {backgroundColor: level.color, borderColor: level.color, shadowColor: level.color}]}>
                            <Image style={styles.texture} source={this.props.getImageTexture(level.color)} />
                            {this.props.maxLevel - 1 < level.level ? 
                              <Icon name='lock' style={[styles.levelText, styles.levelIcon]} /> :
                              <Text style={styles.levelText}>{level.level}</Text>
                            }
                          </View>
                      </TouchableHighlight>
                    </View>
                  ))}
                </View>
              ))}
            </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#000'
  },
  highlight: {
    paddingTop: 5,
    paddingBottom: 5
  },
  item: {
    flex: 1,
    flexDirection: 'row'
  },
  heading: {
    paddingTop: 15,
    marginBottom: 5,
  },
  hr: {
    paddingTop: 15,
    marginBottom: 15,
    width: 180,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
  },
  grid: {
    flex: 1,
    width: 166,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    margin: 2
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: 50
  },
  contents: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5
  },
  levelText: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    textAlignVertical: 'center'
  },
  levelIcon: {
    fontSize: 28,
    marginTop: 7
  },
  texture: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 5
  },
  itemIcon: {
    fontSize: 22,
    width: 24,
    marginTop: 3,
    marginRight: 6,
    color: '#FFF'
  },
  itemText: {
    fontSize: 24,
    color: '#FFF'
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 30,
    elevation: 2
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 1
  }
})
