import fs from 'fs'
import path from 'path'
import babel from 'babel-core'
// var origJs = require.extensions['.js']

require.extensions['.js'] = function (module, fileName) {
  if (fileName === '/app/node_modules/react-native/Libraries/react-native/react-native.js') {
    fileName = path.resolve('./test/support/mocks/react-native.js')
  }
  // if (fileName.indexOf('node_modules/') >= 0) {
  //   return (origJs || require.extensions['.js'])(module, fileName)
  // }
  const src = fs.readFileSync(fileName, 'utf8')
  let output = babel.transform(src, {
    filename: fileName,
    sourceFileName: fileName,
    presets: ['react-native'],
  }).code

  return module._compile(output, fileName)
}
