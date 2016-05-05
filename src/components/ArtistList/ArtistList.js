import React from 'react-native'
import Artist from '../Artist'
import ArtistModel from '../../models/Artist'
import styles from './ArtistListStyles.js'

class ArtistList extends React.Component {
  constructor(props) {
    super(props)
    let ds = new React.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      artistsDataSource: ds.cloneWithRows(this.props.artists),
    }
  }
  componentWillReceiveProps(props) {
    this.setState({artistsDataSource: this.state.artistsDataSource.cloneWithRows(props.artists)})
  }

  _renderArtist(artist) {
    return <Artist {...artist} />
  }

  render() {
    return (
      <React.ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.artistsDataSource}
        renderRow={this._renderArtist}
        />
    )
  }
}
ArtistList.propTypes = {
  artists: React.PropTypes.arrayOf(React.PropTypes.shape(ArtistModel.propTypes)).isRequired,
}

export default ArtistList
