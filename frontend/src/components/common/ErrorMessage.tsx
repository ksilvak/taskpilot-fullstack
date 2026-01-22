type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage ({message}: ErrorMessageProps) {
    if (!message) return null;
    
    return (
        <>
            {message}
        </>
    );
}

export default ErrorMessage