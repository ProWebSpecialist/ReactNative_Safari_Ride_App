import { showMessage } from 'react-native-flash-message';

const unKnowError = 'Unknow Error';
export const showError = error => {
  showMessage({
    message: error || unKnowError,
    type: 'danger',
  });
};

export const showInfo = msg => {
  showMessage({
    message: msg,
    type: 'info',
  });
};
