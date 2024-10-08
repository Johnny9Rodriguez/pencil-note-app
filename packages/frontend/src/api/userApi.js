const BASE_API_URL = 'https://pencil.joepytlik.de/api';
// const BASE_API_URL = 'http://localhost:3001';

export const checkAuthentication = async () => {
    try {
        const res = await fetch(BASE_API_URL + '/users/auth-check', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return data;
    } catch (error) {
        console.error('Authentication error:', error);
    }
};

export const login = async (loginData, setLoginError) => {
    try {
        const res = await fetch(BASE_API_URL + '/users/login', {
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
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
    }
};

export const logout = async () => {
    try {
        const res = await fetch(BASE_API_URL + '/users/logout', {
            method: 'POST',
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return data;
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const signup = async (signupData, setSignupError) => {
    try {
        const res = await fetch(BASE_API_URL + '/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
            const errMsg =
                res.status === 500
                    ? 'Internal Server Error. Please try again.'
                    : 'Username already taken.';
            setSignupError({
                errorMessage: errMsg,
                errorFlag: Date.now(),
            });
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return data;
    } catch (error) {
        console.error('Signup error:', error);
    }
};

export const deleteUser = async (userId, setDeleteError) => {
    try {
        const res = await fetch(BASE_API_URL + '/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
            setDeleteError({
                errorMessage: 'Internal Server Error. Please try again.',
                errorFlag: Date.now(),
            });
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return data;
    } catch (error) {
        console.error('User delete error:', error);
    }
};
