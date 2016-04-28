'use strict'

import React from 'react-native'
import NavigationBarRouteMapper from './NavigationBarRouteMapper'

import styles from './NavigationBarStyles'

const NavigationBar = <React.Navigator.NavigationBar
          routeMapper={NavigationBarRouteMapper}
          style={styles.navBar} />

export default NavigationBar
