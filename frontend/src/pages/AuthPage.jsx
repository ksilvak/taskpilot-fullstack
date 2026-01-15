import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function AuthPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleLogin = async () => {
        setError(null);
        setSuccessMessage(null);

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json()

        if(!response.ok) {
            if(response.status === 404) {
                setError('Uživatel neexistuje. Můžeš se zaregistrovat.');
            } else if (response.status === 401) {
                setError('Špatné heslo.');
            } else {
                setError('Chyba při přihlášení.');
            } return;
        };

        localStorage.setItem('token', data.token);
        navigate('/tasks');

    };

    const handleRegister = async () => {
        setError(null);
        setSuccessMessage(null);

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            if (response.status === 409) {
                setError('Uživatel už existuje. Přihlas se.');
            } else {
                setError('Chyba při registraci.');
            } return;
        };

       const data = await response.json();

        localStorage.setItem('token', data.token);
        navigate('/tasks');
    };

    return (
        <div>
            <input 
                type="email"
                placeholder="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <div>
                <button onClick={handleLogin}> Login </button>
                <button onClick={handleRegister}> Register </button>
            </div>
        </div>
    );
}

export default AuthPage;
