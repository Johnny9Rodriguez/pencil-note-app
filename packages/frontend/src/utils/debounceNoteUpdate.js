let debounceTimer;
let updateNote;

export function debounce(note, delay = 3333) {
    clearTimeout(debounceTimer);

    updateNote = note;

    debounceTimer = setTimeout(() => {
        fetchNoteUpdate();
        debounceTimer = null;
    }, delay);
}

export function axeDebounce() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);

        fetchNoteUpdate();
    }
}

async function fetchNoteUpdate() {
    const response = await fetch('http://localhost:3001/api/note', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateNote),
        credentials: 'include'
    });

    if (response.status === 204) {
        console.log('Note updated successfully.');
    } else {
        console.log('Internal server error.');
    }
}