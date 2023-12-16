const BASE_API_URL = 'http://localhost:3001';

export const checkAuthentication = async () => {
    try {
        const res = await fetch(BASE_API_URL + '/api/users/auth-check', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await res.json();

        if (res.status === 401) console.error(res.status + ': ' + data.message);
        else console.log(res.status + ': ' + data.message);

        return data;
    } catch (error) {
        console.error('Authentication error:', error);
    }
};

export const login = async (loginData, setLoginError) => {
    try {
        const res = await fetch(BASE_API_URL + '/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
            const errMsg =
                res.status === 500
                    ? 'Internal Server Error. Please try again.'
                    : 'Incorrect username or password.';
            setLoginError({ errorMessage: errMsg, errorFlag: Date.now() });
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
    }
};
