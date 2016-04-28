'use strict'

import React from 'react-native'
import Navigator from './nav/Navigator'

const initialRoute = { id: 'home', title: "Discover App1" }

class App extends React.Component {
  render() {
    return (
      <Navigator initialRoute={initialRoute} />
    )
  }
}

export default App
// export default HomeSelf
