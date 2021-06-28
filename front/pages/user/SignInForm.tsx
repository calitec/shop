import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from 'thunks/users';
import { showModal } from 'slices/cores';
import useInputs from 'lib/hooks/useInputs';
import LabelInput from 'components/common/LabelInput';
import Button from 'components/common/Button';
import { backUrl } from 'config/config';
import { selectUsers } from 'selectors/user';

interface ISignInFormProps {
}

const SignInForm: React.FunctionComponent<ISignInFormProps> = () => {
    const { isSigningIn, error } = useSelector(selectUsers());
    const dispatch = useDispatch();
    const [value, onChange] = useInputs({
        id: '',
        password: ''
    })
    const { id, password } = value;

    useEffect(() => {
        if (isSigningIn == false && error && Object.values(error).toString().includes('401')) {
            alert('아이디 혹은 비밀번호가 틀렸습니다.');
        }
        dispatch(showModal({ visible: true, mode: 'LOGIN' }));
    }, [isSigningIn, error])

    const onLogin = useCallback((e) => {
        e.preventDefault();
        if (!id || !password) return alert('empty!');
        const data = {
            signinId: id, password: password
        }
        dispatch(signInUser(data));
        dispatch(showModal({ visible: false, mode: 'LOGIN' }));
    }, [id, password])

    const onClickToggle = () => dispatch(showModal({ visible: true, mode: 'JOIN' }));

    return (
        <div className="sign__container signin">
            <form action="" onSubmit={onLogin}>
                <LabelInput
                    label="id"
                    name="id"
                    value={id}
                    placeholder="아이디"
                    onChange={onChange}
                />

                <LabelInput
                    label="password"
                    name="password"
                    value={password}
                    placeholder="패스워드"
                    onChange={onChange}
                    type="password"
                />
                {/* <a href={`${backUrl}/api/google/`}>
                    <img src="https://www.leocom.kr/images/sign-in-with-google.png" alt="" />
                </a> */}
                <div className="sign__buttons">
                    <Button>로그인</Button>
                    <div>아직 회원이 아니신가요?
                        <span className="toggle" onClick={onClickToggle}> 회원가입</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {

    return {
        props: {
            pathname: '/SignInForm',
        }
    };
}

export default SignInForm;