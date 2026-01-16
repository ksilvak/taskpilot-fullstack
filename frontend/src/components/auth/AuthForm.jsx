import Loader from "../common/Loader";


function  AuthForm ({
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChande,
    onSubmit,
    onRegister,
}) {

    return (
        <form onSubmit={onSubmit}>
            <input
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => onPasswordChande(e.target.value)}
                placeholder="Password"
            />
             <button type="submit" disabled={loading}>
                Login
            </button>
            <button
                type="button"
                onClick={onRegister}
                disabled={loading}
            >
                Create account
            </button>
        </form>

    );
}

export default AuthForm;