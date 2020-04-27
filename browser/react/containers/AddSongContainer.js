import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSong from '../components/AddSong';
import { addSongToPlaylist } from '../action-creators/playlists';
import { loadAllSongs } from '../action-creators/songs';

const mapStateToProps = state => {
  return {
    songs: state.songs,
    selectedPlaylist: state.playlists.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit (playlistId, songId) {
      return dispatch(addSongToPlaylist(playlistId, songId));
    }
  };
};

class AddSongContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      songId: 1,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {
    this.setState({
      songId: evt.target.value,
      error: false
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const playlistId = this.props.selectedPlaylist.id;
    const songId = this.state.songId;
    this.props.handleSubmit(playlistId, songId)
      .catch(err => {
        this.setState({ error: true })
      });
  }

  render() {

    const songs = this.props.songs;
    const error = this.state.error;
    const songId = this.state.songId;

    return (
      <AddSong
        {...this.props}
        songs={songs}
        error={error}
        songId={songId}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSongContainer);
