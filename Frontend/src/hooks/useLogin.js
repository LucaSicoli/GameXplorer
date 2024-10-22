import { useState } from 'react';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLogin = async () => {
        console.log(email, password);
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            setSuccess(true);
        } catch (error) {
            setError(error.response.data.error);
        }
        setLoading(false);
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        success,
        handleLogin,
    }
}

export default useLogin;