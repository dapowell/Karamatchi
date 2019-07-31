import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    ImageBackground,
    View,
    Animated,
    Dimensions,
    AppState,
    Platform
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import SideMenu from 'react-native-side-menu';
import Sound from 'react-native-sound';

import AsyncStorage from '@react-native-community/async-storage';

import backgroundAudio from '../assets/audio/background.mp3';
import flipAudio from '../assets/audio/flip.mp3';

import CompleteModal from './CompleteModal.js';
import Menu from './Menu.js';
import Title from './Title.js';
import Grid from './Grid.js';

const allcolors = [
    {letter: 'K', color: '#e6194b'},
    {letter: 'A', color: '#3cb44b'},
    {letter: 'R', color: '#0082c8'},
    {letter: 'A', color: '#ffe119'},
    {letter: 'M', color: '#f58231'},
    {letter: 'A', color: '#911eb4'},
    {letter: 'T', color: '#46f0f0'},
    {letter: 'C', color: '#f032e6'},
    {letter: 'H', color: '#d2f53c'},
    {letter: 'I', color: '#fabebe'}
];

const levels = [
    [{level: 1, color: '#3cb44b'},{level: 2, color: '#0082c8'},{level: 3, color: '#ffe119'}],
    [{level: 4, color: '#f58231'},{level: 5, color: '#911eb4'},{level: 6, color: '#46f0f0'}],
    [{level: 7, color: '#f032e6'},{level: 8, color: '#d2f53c'},{level: 9, color: '#fabebe'}]
]

const initialGrid = [
    [{color: '#e6194b'},{color: '#e6194b'},{color: '#e6194b'}],
    [{color: '#e6194b'},{color: '#e6194b'},{color: '#e6194b'}],
    [{color: '#e6194b'},{color: '#e6194b'},{color: '#e6194b'}]
];

export default class Karamatchi extends Component {
    constructor() {
        super();

        const level = 2;

        const colors = allcolors.slice(0, level).map(color => { return color.color });
    
        this.state = {
            level: level,
            maxLevel: level,
            colors: colors,
            backgroundColor: allcolors[level - 1].color,
            grid: initialGrid,
            menuOpen: false,
            musicOn: true,
            soundOn: true,
            completeModalVisible: false
        }

        this.backgroundMusic = new Sound(backgroundAudio, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            this.backgroundMusic.setNumberOfLoops(-1);
        });

        this.flipSound = new Sound(flipAudio, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
        });

        this.animateBackground =  new Animated.Value(0);

        this.updateGrid = this.updateGrid.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.toggleMusic = this.toggleMusic.bind(this)
        this.toggleAudio = this.toggleAudio.bind(this)
        this.playLevel = this.playLevel.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
    }

    getImageTexture(color) {
        switch(color) {
            case '#e6194b':
                return require('../assets/images/e6194b.png');
            case '#3cb44b':
                return require('../assets/images/3cb44b.png');
            case '#0082c8':
                return require('../assets/images/0082c8.png');
            case '#ffe119':
                return require('../assets/images/ffe119.png');
            case '#f58231':
                return require('../assets/images/f58231.png');
            case '#911eb4':
                return require('../assets/images/911eb4.png');
            case '#46f0f0':
                return require('../assets/images/46f0f0.png');
            case '#f032e6':
                return require('../assets/images/f032e6.png');
            case '#d2f53c':
                return require('../assets/images/d2f53c.png');
            case '#fabebe':
                return require('../assets/images/fabebe.png');
        }
    }

    randomizeGrid(grid, colors) {
        for(let x = 0; x < 1000; x++) {
            rowIndex = Math.floor(Math.random() * 3);
            cellIndex = Math.floor(Math.random() * 3);

            this.setColor(grid, rowIndex, cellIndex, colors);

            if (cellIndex > 0) { this.setColor(grid, rowIndex, cellIndex - 1, colors); }
            if (cellIndex < 2) { this.setColor(grid, rowIndex, cellIndex + 1, colors); }
            if (rowIndex > 0) { this.setColor(grid, rowIndex - 1, cellIndex, colors); }
            if (rowIndex < 2) { this.setColor(grid, rowIndex + 1, cellIndex, colors); }
        }

        if (this.levelComplete(grid)) {
            this.randomizeGrid(grid, colors);
        }
    }

    setColor(newGrid, rowIndex, cellIndex, colors) {
        const cell = newGrid[rowIndex][cellIndex];
        const colorIndex = colors.findIndex(c => c === cell.color);
        const newColor = colors[colorIndex + 1 === colors.length ? 0 : colorIndex + 1];

        cell.color = newColor;
    }

    updateGrid(newGrid) {
        if (this.state.soundOn) {
            this.flipSound.play();
        }

        this.setState({
            grid: newGrid
        });

        if (this.levelComplete(newGrid)) {
            this.setState({completeModalVisible: true});
        }
    }

    levelComplete(grid) {
        const color = grid[0][0].color;
        for (let x = 0; x <= 2; x++) {
            for (let y = 0; y <= 2; y++) {
                if (color !== grid[x][y].color) {
                    return false;
                }
            }
        }
        return true;
    }

    nextLevel() {
        let level = this.state.level;

        if (level < 10) {
            level = level + 1;       
        } else {
            level = 2;
        }

        this.setState({completeModalVisible: false})

        this.playLevel(level);
    }

    setLevel(level, maxLevel) {
        AsyncStorage.setItem('@Karamatchi:Level', JSON.stringify({level: level, maxLevel: maxLevel}))
    }

    playLevel(level) {
        const colors = allcolors.slice(0, level).map(color => { return color.color });

        const maxLevel = level > this.state.maxLevel ? level: this.state.maxLevel;
        this.setState({
            level: level,
            maxLevel: maxLevel,
            colors: colors,
            backgroundColor: allcolors[level - 1].color
        });

        this.setLevel(level, maxLevel);

        const grid = [
            [{color: '#e6194b'},{color: '#e6194b'},{color: '#e6194b'}],
            [{color: '#e6194b'},{color: '#e6194b'},{color: '#e6194b'}],
            [{color: '#e6194b'},{color: '#e6194b'},{color: '#e6194b'}]
        ]

        const newGrid = JSON.parse(JSON.stringify(grid));
        this.randomizeGrid(newGrid, colors);
        this.setState({
            grid: newGrid
        })
    }

    toggleAudio() {
        const soundOn = !this.state.soundOn;
        this.setState({
            soundOn: soundOn
        })

        AsyncStorage.setItem('@Karamatchi:Settings', JSON.stringify({musicOn: this.state.musicOn, soundOn: soundOn}))
    }

    toggleMusic() {
        const musicOn = !this.state.musicOn;
        this.setState({
            musicOn: musicOn
        })

        if (musicOn) {
            this.backgroundMusic.play();
        }else{
            this.backgroundMusic.stop();
        }

        AsyncStorage.setItem('@Karamatchi:Settings', JSON.stringify({musicOn: musicOn, soundOn: this.state.soundOn}))
    }

    toggleMenu() {
        this.updateMenuState(!this.state.menuOpen);
    }

    updateMenuState(menuOpen) {
        this.setState({ menuOpen });
    }

    componentDidMount() {
        AsyncStorage.getItem('@Karamatchi:Level', (err, data) => {
            if (err) {
                console.error('Error fecthing data', err);
            } else {
                const parsedData = JSON.parse(data);
                const level = parsedData ? parsedData.level : 2;
                const maxLevel = parsedData ? (parsedData.maxLevel ? parsedData.maxLevel : level) : 2;
                const colors = allcolors.slice(0, level).map(color => { return color.color });

                this.setState({
                    level: level,
                    maxLevel: maxLevel,
                    colors: colors,
                    backgroundColor: allcolors[level - 1].color,
                    grid: initialGrid
                })

                this.randomizeGrid(initialGrid, colors);
            }
        });

        AsyncStorage.getItem('@Karamatchi:Settings', (err, data) => {
            if (err) {
                console.error('Error fecthing data', err);
            } else {
                const parsedData = JSON.parse(data);

                const musicOn = parsedData ? parsedData.musicOn : true;
                const soundOn = parsedData ? parsedData.soundOn : true;
                this.setState({
                    musicOn: musicOn,
                    soundOn: soundOn
                })

                if (musicOn) {
                    setTimeout(() => {
                        this.backgroundMusic.play();
                    });
                }
            }
        });

        AppState.addEventListener('change', this._handleAppStateChange);
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            if (this.state.musicOn) {
                setTimeout(() => {
                    this.backgroundMusic.play();
                });
            }
        } else {
            this.backgroundMusic.stop();
        }
    };

    render() {
        const menu = <Menu
            getImageTexture={this.getImageTexture}
            levels={levels}
            level={this.state.level}
            maxLevel={this.state.maxLevel}
            soundOn={this.state.soundOn}
            musicOn={this.state.musicOn}
            toggleMusic={this.toggleMusic}
            toggleAudio={this.toggleAudio}
            playLevel={this.playLevel} 
        />;
        const {backgroundColor } = this.state;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.menuOpen}
                menuPosition="right"
                onChange={menuOpen => this.updateMenuState(menuOpen)}
            >
                <View style={styles.top}>
                    <StatusBar translucent={true} barStyle="light-content" />
                    <View style={[styles.main, {backgroundColor}]}>
                        <ImageBackground source={require('../assets/images/gradient.png')} resizeMode="stretch" style={styles.darken}></ImageBackground>
                        <ImageBackground source={this.getImageTexture(backgroundColor)} resizeMode="repeat" style={styles.backgroundImage}></ImageBackground>
                        <Title getImageTexture={this.getImageTexture} style={styles.title} colors={allcolors} level={this.state.level - 1} toggleMenu={this.toggleMenu} />
                        <Grid grid={this.state.grid} getImageTexture={this.getImageTexture} colors={this.state.colors} updateGrid={this.updateGrid} />
                    </View>
                </View>
                <CompleteModal modalVisible={this.state.completeModalVisible} hideModal={this.nextLevel} level={this.state.level - 1} />
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 40,
        paddingBottom: 40,
        elevation: 3
    },
    container: {
        flex: 1,
        width: '100%'
    },
    darken: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.8,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        elevation: 3
    },
    backgroundImage: {
        position: 'absolute',
        opacity: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        elevation: 2
    }
});
