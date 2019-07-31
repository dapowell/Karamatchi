import React, {Component} from 'react';
import {
    Modal,
    Text,
    Button,
    TouchableHighlight,
    View,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';

import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class CompleteModal extends Component {
  constructor() {
    super();

    this.facebookInstalled = true;
    if (Platform.OS === 'android') {
        Share.isPackageInstalled('com.facebook.katana').then(({ isInstalled }) => this.facebookInstalled = isInstalled)
    }
    this.share = this.share.bind(this)
  }
  share() {
    Share.shareSingle({
        url: 'http://karamatchi.com',
        title: this.props.level === 9 ? 'I finished all 9 levels of Karamatchi!' : `I beat level ${this.props.level} on Karamatchi!`,
        social: Share.Social.FACEBOOK
      })
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
        >
          <TouchableHighlight style={styles.close} onPress={this.props.hideModal}>
            <View style={styles.modal}>
                <Icon 
                    name='thumbs-up' 
                    style={styles.thumbsUp}
                />
                {this.props.level < 9 ? <Text style={styles.win}>You have completed level</Text> :  <Text style={styles.win}>You have completed all 9 levels! Congratulations!!!</Text> }
                {this.props.level < 9 ? <Text style={styles.level}>{this.props.level}</Text> : null}
                <View style={styles.buttons}>
                    {this.facebookInstalled ? <TouchableHighlight underlayColor='#999' style={styles.button} onPress={this.share}>
                        <Text style={styles.buttonText}>
                            <Icon name='facebook' style={styles.buttonIcon} /> Share
                        </Text>
                    </TouchableHighlight> : <Text style={[styles.button, styles.empty]}> </Text>
                    }
                        <TouchableHighlight underlayColor='#999' style={styles.button} onPress={this.props.hideModal} >
                            {this.props.level < 9 ?
                                <Text style={styles.buttonText}>
                                    Next Level <Icon name='arrow-circle-right' style={styles.buttonIcon} />
                                </Text>
                            :
                                <Text style={styles.buttonText}>
                                    Restart <Icon name='redo-alt' style={styles.buttonIcon} />
                                </Text>

                            }
                        </TouchableHighlight>
                </View>
            </View>
          </TouchableHighlight>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    close: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    modal: {
        flex: 1,
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 10,
        textAlign: 'center'
    },
    thumbsUp: {
        fontSize: 100,
        color: '#FFF',
        textAlign: 'center',
        margin: 20
    },
    win: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center'
    },
    level: {
        fontSize: 100,
        color: '#FFF',
        textAlign: 'center'
    },
    buttons: {
        position: 'absolute',
        bottom: 10,
        height: 160,
        width: '100%'
    },
    empty: {
        opacity: 0
    },
    button: {
        flex: 1,
        margin: 10,
        paddingTop: 10,
        borderRadius: 10,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 3,
        backgroundColor: '#333',
        opacity: 0.8,
        padding: 3
    },
    buttonText: {
        flex: 1,
        fontSize: 30,
        textAlign: 'center',
        color: '#FFF',
        width: '100%',
        height: '100%'
    },
    buttonIcon: {
        fontSize: 30
    }
});