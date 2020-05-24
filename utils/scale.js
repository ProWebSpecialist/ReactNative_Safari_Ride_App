import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scale = size => (width / 375) * size;

export default scale;
