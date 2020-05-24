import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import PropTypes from 'prop-types';
import { NavIconView, ActionButtonView, PrimaryButton } from '../../components';
import { studentSelector } from '../../selectors';
import StudentAuthActions from '../../reducers/StudentAuthReducer';

import scale from '../../utils/scale';

const VerifyCode = ({ code, navigation }) => {
  const [value, setValue] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const [CodeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onNext = () => {
    navigation.navigate('studentId');
  };

  const onTextChange = v => {
    const text = v.toUpperCase();
    setValue(text);
    setIsEnable(text === code);
  };

  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  return (
    <NavIconView
      title="Verify Phone Number"
      icon={require('../../assets/checkmark.png')}
    >
      <CodeField
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...CodeFieldProps}
        value={value}
        onChangeText={onTextChange}
        cellCount={CELL_COUNT}
        rootStyle={{ height: scale(100), width: '80%' }}
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={styles.codeInput}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <ActionButtonView>
        {isEnable && <PrimaryButton text="Verify" onPress={onNext} />}
      </ActionButtonView>
    </NavIconView>
  );
};

function mapStateToProps(state) {
  return {
    code: studentSelector(state).code,
  };
}

const mapDispatchToProps = dispatch => ({
  requestVerifyPhone: (email, phone) => {
    dispatch(StudentAuthActions.requestVerifyPhone(email, phone));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);

VerifyCode.propTypes = {
  code: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  codeInput: {
    width: 40,
    height: 54,
    lineHeight: 54,
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 0,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 2,
  },
});
