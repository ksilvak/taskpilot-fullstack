import styles from './AuthForm.module.scss';
import FormTextInput from '../common/Form/FormTextInput';
import Button from '../common/Button';
import type { FormEvent } from 'react';


type AuthFormProps = {
    email: string,
    password: string,
    loading: boolean,
    onEmailChange: (e: string) => void,
    onPasswordChande: (e: string) => void,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    onRegister: () => void,
};

function  AuthForm ({
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChande,
    onSubmit,
    onRegister,
}: AuthFormProps) {

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputsRow}>
                <FormTextInput 
                    value={email}
                    onChange={onEmailChange}
                    placeholder="Email"
                />
                <FormTextInput 
                    value={password}
                    onChange={onPasswordChande}
                    placeholder="Password"
                    type="password"
                />
            </div>
            <div className={styles.buttonsRow}>
                <Button 
                    buttonType="submit"
                    buttonName="Login"
                    disabled={loading}
                />
                <Button 
                    buttonType="button"
                    buttonName="Create account"
                    disabled={loading}
                    onClick={onRegister}
                />
            </div>
        </form>
    );
}

export default AuthForm;