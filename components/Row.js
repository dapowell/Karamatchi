import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import Cell from './Cell.js';

export default class Row extends Component {
    constructor(props) {
        super(props);

        this.changeColor = this.changeColor.bind(this)
    }
    
    changeColor(cellIndex) {
        this.props.onChangeColor(this.props.index, cellIndex);
    }

    render() {
        return (
        <View style={styles.container}>
            {this.props && this.props.row ? this.props.row.map((cell, i) => (
                <Cell cell={cell} colors={this.props.colors} getImageTexture={this.props.getImageTexture} color={cell.color} onChangeColor={this.changeColor} key={'cell' + i} index={i} />
            )) : null}
        </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: screenWidth / 3,
    margin: 2
  }
})
