import { useState } from "react";


function LoginPage() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const handleSubmit = async (event) => {
        event.preventDefault();

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

    const data = await response.json();
    console.log(data);
};


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit"> Login </button>
      </form>
    </div>
  );
}

export default LoginPage;
