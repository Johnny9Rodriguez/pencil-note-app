const BASE_API_URL = 'http://localhost:3001';

// export const fetchNotes = async (userId) => {
//     try {
//         const res = await fetch(BASE_API_URL + `/api/notes/${userId}`, {
//             method: 'GET',
//             credentials: 'include',
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             console.error(res.status + ': ' + data.message);
//         } else {
//             console.log(res.status + ': ' + data.message);
//         }

//         return data.notes;
//     } catch (error) {
//         console.error('Error fetching notes:', error);
//     }
// };