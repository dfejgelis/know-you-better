import React from 'react-native'
import TrackModel from '../../models/Track'
import styles from './TrackStyles'


class Track extends React.Component {
  render() {
    const image = this.props.album.images[2]
    const artist = this.props.artists[0]

    return (
      <React.View style={styles.container}>
        <React.Image
          source={{uri: image.url}}
          style={styles.image}
          />
        <React.Text style={styles.name}>{artist.name}-{this.props.name}</React.Text>
      </React.View>
    )
  }
}

Track.propTypes = TrackModel.propTypes
export default Track
