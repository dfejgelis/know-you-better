import { PropTypes } from 'react-native'
import ArtistModel from './Artist'

export default {
  propTypes: {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(PropTypes.shape(ArtistModel.propTypes)).isRequired,
  },
}
