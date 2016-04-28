import React from 'react-native'
import NavigationBar from './NavigationBar'
import NavigationRenderScene from './RenderScene'

// const paddingTop = React.Navigator.NavigationBar.Styles.General.NavBarHeight
const paddingTop = 64


class Navigator extends React.Component {
  render() {
    return (
      <React.Navigator
          style={{flex:1}}
          initialRoute={this.props.initialRoute}
          renderScene={NavigationRenderScene}
          navigationBar={NavigationBar}
          sceneStyle={{paddingTop}}
      />
    )
  }
}

Navigator.propTypes = {
  initialRoute: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }).isRequired,
}

export default Navigator
