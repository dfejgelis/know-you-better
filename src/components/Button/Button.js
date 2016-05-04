import React from 'react-native'
import styles from './ButtonStyles'

// TODO :: Extend styles via receiving prop

class Button extends React.Component {
  _onPress() {
    this.props.onPress()
  }
  render() {
    return (
      <React.TouchableHighlight
          style={styles.container}
          onPress={this._onPress.bind(this)}>
        <React.Text style={styles.text}>{this.props.text}</React.Text>
      </React.TouchableHighlight>
    )
  }
}
Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
}

export default Button
