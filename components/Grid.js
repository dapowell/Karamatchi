import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Row from './Row.js';

export default class Grid extends Component {
    constructor(props) {
        super(props);

        this.changeColor = this.changeColor.bind(this)
    }

    changeColor(rowIndex, cellIndex) {
        const newGrid = JSON.parse(JSON.stringify(this.props.grid));

        this.setColor(newGrid, rowIndex, cellIndex);

        if (cellIndex > 0) { this.setColor(newGrid, rowIndex, cellIndex - 1); }
        if (cellIndex < 2) { this.setColor(newGrid, rowIndex, cellIndex + 1); }
        if (rowIndex > 0) { this.setColor(newGrid, rowIndex - 1, cellIndex); }
        if (rowIndex < 2) { this.setColor(newGrid, rowIndex + 1, cellIndex); }

        this.props.updateGrid(newGrid);
    }

    setColor(newGrid, rowIndex, cellIndex) {
        const cell = newGrid[rowIndex][cellIndex];
        const colorIndex = this.props.colors.findIndex(c => c === cell.color);
        const newColor = this.props.colors[colorIndex + 1 === this.props.colors.length ? 0 : colorIndex + 1];

        cell.color = newColor;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.grid.map((row, i) => (
                    <Row grid={this.props.grid} row={row} getImageTexture={this.props.getImageTexture} colors={this.props.colors} onChangeColor={this.changeColor} key={'row' + i} index={i} />
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    elevation: 4,
    width: '100%',
    bottom: 30
  }
})
