import React, {
  TouchableHighlight,
  Text,
} from 'react-native'


const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    } else {
      return (
        <TouchableHighlight onPress={() => {
          if (index > 0) {
            navigator.pop();
          }
        }} style={styles.navButtonLeft}>
         <Text style={styles.navBarText}>Back</Text>
       </TouchableHighlight>
      )
    }
  },

  RightButton() {
    <Text style={styles.navBarText}>
      RightButton
    </Text>
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={styles.navBarTitleText}>
        {(route.title) ? route.title : "Discover App"}
      </Text>
    )
  },
}


const styles = React.StyleSheet.create({
  navBarButtonText: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
  },
  navBarTitleText: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  navBarText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navButtonLeft: {
    marginTop: 10,
    marginLeft: 10,
  },
});


export default NavigationBarRouteMapper
