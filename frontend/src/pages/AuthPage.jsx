import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../hooks/useAuth';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(null);

    const { loading, error: authError, handleLogin, handleRegister } = useAuth();
    const navigate = useNavigate();
    const error = formError || authError;

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleLoginSubmit = async (e) => {
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
        if (!isValidEmail(email)) {
            setFormError('Neplatný formát e-mailu');
            return;
        }

        const success = await handleRegister(email, password);
        if (success) navigate('/tasks');
    };

    return (
        <div>
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
