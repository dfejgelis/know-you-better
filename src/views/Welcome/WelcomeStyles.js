'use strict'

import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 50,
  },
  bullets: {
    // flex:1,
    // color: 'white',
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 40,
    padding: 40,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  logo: {
    width: 300,
    height: 210,
  },
})
