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

