const BASE_API_URL = 'http://localhost:3001';

export const checkAuthentication = async () => {
    try {
        const res = await fetch(BASE_API_URL + '/api/users/auth-check', {
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
        const res = await fetch(BASE_API_URL + '/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        })

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

// try {
//     const res = await fetch('http://localhost:3001/api/logout', {
//       method: 'POST',
//       credentials: 'include'
//     });

//     if (!res.ok) {
//       console.error(res.text());
//       return;
//     }

//     axeDebounce();
//     dispatch(setAuth(false));
//     dispatch(setUser({ id: null, username: null }));
//     dispatch(init());
//     navigate('/login');

//   } catch (err) {
//     console.error('Error on logout: ', err);
//   }

export const signup = async (signupData, setSignupError) => {
    try {
        const res = await fetch(BASE_API_URL + '/api/users/signup', {
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
