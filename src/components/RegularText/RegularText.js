import React, { Text, View } from 'react-native'
import styles from './RegularTextStyles'

class RegularText extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

RegularText.propTypes = {
  text: React.PropTypes.string.isRequired,
}

export default RegularText
