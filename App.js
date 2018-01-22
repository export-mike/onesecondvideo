import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import Recording from './components/Recording';
import RNVideoEditor from 'react-native-video-editor';

class App extends Component {
  state = {
    videos: [],
    video: null,
    recording: false
  }
  render() {
    if (!this.state.previewVideo) {
      return <View style={styles.container}>
        {this.state.recording && <Recording />}
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.button} onPress={this.record}>Record</Text>
          {this.state.videos.length > 0 && <Text onPress={this.play} style={styles.button}>
            Library {this.state.videos.length}
          </Text>}
        </Camera>
      </View>
    }
    if (this.state.loadingVideo) {
      return <View style={styles.container}>
        <Text>Please Wait...</Text>
      </View>;
    }
    if (this.state.errorMergingVideos) {
      return <View style={styles.container}>
          <Text>Error Merging Videos... :(</Text>
      </View>
    }
    if (this.state.video) {
      return <View style={styles.container}>
        <Video source={this.state.video.path} resizeMode="cover"/>
      </View>
    }

    return <View style={styles.container}>
      <Text onPress={this.play} style={styles.button}>
        Library {this.state.videos.length}
      </Text>
    </View>
  }
  play = () => {
    this.setState({
      ...this.state,
      previewVideo: true,
      loadingVideo: true
    });

    RNVideoEditor.merge(
      this.state.videos.map(video => video.path),
      (results) => {
        this.setState({
          ...this.state,
          loadingVideo: false,
          errorMergingVideos: true
        })
        console.error(results);
      },
      (results, file) => {
        console.log('Got File!', file)
        this.setState({
          loadingVideo: false,
          video: file
        })
      }
    );
  }
  record = async () => {
    const options = {};
    try {
      this.setState({
        ...this.state,
        recording: true
      })
      const data = await this.camera.capture({
        metadata:options,
        mode: Camera.constants.CaptureMode.video,
        audio: true,
        // captureTarget: Camera.constants.CaptureTarget.memory,
        orientation: Camera.constants.Orientation.landscapeRight,
        playSoundOnCapture: false,
        totalSeconds: 1
      })
      console.log('recorded!', data)
      this.setState({
        ...this.state,
        recording: false,
        videos: [...this.state.videos, data]
      });
    } catch (e) {
      this.setState({
        ...this.state,
        errorRecording: true
      });
      console.error(e);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default App
