import React, {
  View,
  Image,
  Text,
} from 'react-native'
import TrackModel from '../../models/Track'
import styles from './TrackStyles'


class Track extends React.Component {
  render() {
    const image = this.props.album.images[2]
    const artist = this.props.artists[0]

    return (
      <View style={styles.container}>
        <Image
          source={{uri: image.url}}
          style={styles.image}
          />
        <View style={styles.rightContainer}>
          <Text style={styles.artist}>{artist.name}</Text>
          <Text style={styles.name}>{this.props.name}</Text>
        </View>
      </View>
    )
  }
}

Track.propTypes = TrackModel.propTypes
export default Track
