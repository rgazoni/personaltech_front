import { PageInfo } from './page-info';
import { Modal } from '@/components/common/modal';
import { SigninInfo } from './signin-info';
import { PersonalInfo } from './personal-info';
import { useProgressContext } from '@/providers/signup-provider';
import { Progress } from '@/utils/enums/signup-progress.enum';

export const SignupProcess = () => {
  const { state } = useProgressContext();
  return (
    <Modal>
      {state.curr_stage === Progress.SIGNIN_INFO && <SigninInfo />}
      {state.curr_stage === Progress.PERSONAL_INFO && <PersonalInfo />}
      {state.curr_stage === Progress.PAGE_INFO && <PageInfo />}
    </Modal>
  );
};
