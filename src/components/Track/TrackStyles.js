'use strict'

import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
    // width: 100,
    height: 50,
    // backgroundColor: '#F6F6F6',
    borderTopWidth: 1,
    // borderRadius: 5,
    borderColor: '#CCC',
  },
  image: {
    width: 50,
    height: 50,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 8,
    marginTop: 5,
    // textAlign: 'center',
  },
})
