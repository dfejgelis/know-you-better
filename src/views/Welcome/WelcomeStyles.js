'use strict'

import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  bullets: {
    color: 'white',
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
});
