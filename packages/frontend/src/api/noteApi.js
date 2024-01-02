const BASE_API_URL = 'http://localhost:3001';

export const fetchNotes = async (userId) => {
    try {
        const res = await fetch(BASE_API_URL + `/api/notes/${userId}`, {
            method: 'GET',
            credentials: 'include',
        });

        // .notes .lastUpdated .message
        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return data;
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
};

export const storeNotes = async (noteData) => {
    try {
        console.log(noteData)
        const res = await fetch(BASE_API_URL + '/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
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
        console.error('Error storing notes:', error);
    }
};
