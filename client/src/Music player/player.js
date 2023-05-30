import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './player.css';

const playlist = [
  {
    title: 'Song 1',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
  },
  {
    title: 'Song 2',
    url: 'https://dl.sndup.net/gtq9/spring.mp3',
  },
  // Add more songs to the playlist as needed
];

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTrackIndex: 0,
      isPlaying: false,
    };
  }

  playPause = () => {
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  };

  nextTrack = () => {
    this.setState((prevState) => ({
      currentTrackIndex:
        (prevState.currentTrackIndex + 1) % playlist.length,
        isPlaying: true,
    }));
  };

  render() {
    const { currentTrackIndex, isPlaying } = this.state;
    const currentTrack = playlist[currentTrackIndex];

    return (
      <div className="music-player">
        <H5AudioPlayer
          autoPlay
          src={currentTrack.url}
          onEnded={this.nextTrack}
          showSkipControls={false}
        />
      </div>
    );
  }
}

export default Player;

