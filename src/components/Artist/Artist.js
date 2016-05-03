import React from 'react-native'
import ArtistModel from '../../models/Artist'
import styles from './ArtistStyles'


class Artist extends React.Component {
  render() {
    const image = this.props.images[2]

    return (
      <React.View style={styles.container}>
        <React.Image
          source={{uri: image.url}}
          style={styles.image}
        />
        <React.Text style={styles.name}>{this.props.name}</React.Text>
      </React.View>
    )
  }
}

Artist.propTypes = ArtistModel.propTypes
export default Artist
