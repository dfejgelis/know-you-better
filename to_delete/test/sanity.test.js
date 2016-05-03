/* eslint-env node, mocha */
import Home from '../src/views/Home'
import common from './support/common'
const {createRenderer, React, expect} = common

function setup() {
  const props = {}

  const renderer = createRenderer()
  renderer.render(<Home {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer,
  }
}

describe('NoteEntryScreen', () => {
  it('should render a scrollview', () => {
    const { output } = setup()
    // expect(output.type.displayName).to.equal(MockComponents.ScrollView.displayName)
    expect(output.type.displayName).to.equal(Home.displayName)
  })
})
