import Albums from '../components/Albums';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    albums: state.albums.list
  };
};

const AlbumsContainer = connect(
  mapStateToProps
)(Albums);

export default AlbumsContainer;
