const BASE_API_URL = 'https://pencil.joepytlik.de/api';

export const sendMessage = async (message, setSendError) => {
    const requestData = {
        RecipientName: 'Joe',
        RecipientAddress: 'contact@joepytlik.de',
        Subject: 'Contact - Pencil App',
        Name: message.name,
        Address: message.address,
        Message: message.message,
    };

    try {
        const res = await fetch(BASE_API_URL + '/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(res.status + ': ' + data.message);
            setSendError({
                errorMessage:
                    "Sorry, we couldn't send your message. Please try again later",
                errorFlag: Date.now(),
            });
        } else {
            console.log(res.status + ': ' + data.message);
        }

        return { status: res.status, message: data.message };
    } catch (error) {
        console.error(error);
        setSendError({
            errorMessage:
                "Sorry, we couldn't send your message. Please try again later",
            errorFlag: Date.now(),
        });
    }
};
