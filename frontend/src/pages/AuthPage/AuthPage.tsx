import styles from './AuthPage.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';

function AuthPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);

    const { loading, error: authError, handleLogin, handleRegister } = useAuth();
    const navigate = useNavigate();
    const error = formError || authError;

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!isValidEmail(email)) {
            setFormError('Neplatný formát e-mailu');
            return;
        }

        const success = await handleLogin(email, password);
        if (success) navigate('/tasks');
    };

    const handleRegisterSubmit = async () => {
        setFormError(null);
            
        if (!isValidEmail(email)) {
            setFormError('Neplatný formát e-mailu');
            return;
        }

        const success = await handleRegister(email, password);
        if (success) navigate('/tasks');
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <AuthForm 
                email={email}
                password={password}
                loading={loading}
                onEmailChange={setEmail}
                onPasswordChande={setPassword}
                onSubmit={handleLoginSubmit}
                onRegister={handleRegisterSubmit}
            />
            {error && <ErrorMessage message={error} />}           
        </div>
    );
}

export default AuthPage;
