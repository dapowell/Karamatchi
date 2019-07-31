import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated
} from 'react-native';

export default class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: props.color
        }

        this.animatedValue = new Animated.Value(0);
        this.value = 0;

        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
            useNativeDriver: true,
            extrapolate: "clamp"
        })

        this.changeColor = this.changeColor.bind(this)
    }

    componentDidUpdate() {
        if (this.props.color !== this.state.color) {
            this.flipCard();
            setTimeout(() => {
                this.setState({
                    color: this.props.color
                });
            }, 100);
        }
    }

    flipCard() {
        if (this.value >= 90) {
          Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10
          }).start();
        } else {
          Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10
          }).start();
        }
    }

    changeColor() {
        this.flipCard();
        setTimeout(() => {
            this.props.onChangeColor(this.props.index);
        }, 100);
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate}
            ]
        }

        return (
            <View style={[styles.top]}>
                <TouchableOpacity onPress={this.changeColor} style={styles.top} activeOpacity={1}>
                    <Animated.View style={[styles.container, frontAnimatedStyle, {backgroundColor: this.state.color, shadowColor: this.state.color, borderColor: this.state.color}]}>
                        <Image style={styles.texture} source={this.props.getImageTexture(this.state.color)} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    margin: 2,
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: '#fff',
    opacity: 0.8
  },
  texture: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      borderRadius: 10
  }
})
