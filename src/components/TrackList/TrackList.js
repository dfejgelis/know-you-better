import React from 'react-native'
import Track from '../Track'
import TrackModel from '../../models/Track'
import styles from './TrackListStyles.js'

class TrackList extends React.Component {
  constructor(props) {
    super(props)
    let ds = new React.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      tracksDataSource: ds.cloneWithRows(this.props.tracks),
    }
  }
  componentWillReceiveProps(props) {
    this.setState({tracksDataSource: this.state.tracksDataSource.cloneWithRows(props.tracks)})
  }

  _renderTrack(track) {
    return <Track {...track} />
  }

  render() {
    return (
      <React.ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.tracksDataSource}
        renderRow={this._renderTrack}
        />
    )
  }
}
TrackList.propTypes = {
  tracks: React.PropTypes.arrayOf(React.PropTypes.shape(TrackModel.propTypes)).isRequired,
}

export default TrackList
