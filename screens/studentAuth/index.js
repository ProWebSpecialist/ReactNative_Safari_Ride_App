import { createStackNavigator } from 'react-navigation';
import SignUpStudent from './SignUpStudent';
import EnterAddress from './EnterAddress';
import PhoneInput from './PhoneInput';
import VerifyCode from './VerifyCode';
import StudentId from './StudentId';
import TermsAndConditions from './TermsAndConditions';
import SetPassword from './SetPassword';
import Welcome from './Welcome';

const StudentStack = createStackNavigator(
  {
    signUpStudent: SignUpStudent,
    enterAddress: EnterAddress,
    phoneInput: PhoneInput,
    verifyCode: VerifyCode,
    studentId: StudentId,
    terms: TermsAndConditions,
    setPassword: SetPassword,
    welcome: Welcome,
  },
  {
    headerMode: 'none',
  },
);

export default StudentStack;
