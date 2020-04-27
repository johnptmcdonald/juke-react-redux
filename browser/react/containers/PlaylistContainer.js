import Playlist from '../components/Playlist';
import {toggleSong} from '../action-creators/player';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    selectedPlaylist: state.playlists.selected
  };
};

const PlaylistContainer = connect(
  mapStateToProps
)(Playlist);

export default PlaylistContainer;
