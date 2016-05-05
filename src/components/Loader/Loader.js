import React, {
  ActivityIndicatorIOS,
  Text,
  View,
} from 'react-native'
import styles from './LoaderStyles'

class Loader extends React.Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{this.props.text}</Text>
        <ActivityIndicatorIOS style={styles.loader}/>
      </View>
    )
  }
}

Loader.propTypes = {
  text: React.PropTypes.string.isRequired,
}

export default Loader
