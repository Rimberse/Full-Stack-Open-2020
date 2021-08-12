import React from 'react';

// ex. 2.19
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: (message.toLowerCase().includes('added') || message.toLowerCase().includes('changed')) ? 'green' : 'red',
        borderColor: (message.toLowerCase().includes('added') || message.toLowerCase().includes('changed')) ? 'green' : 'red'
    };

    return (
        <div className="notification" style={notificationStyle} >{message}</div>
    )
};

export default Notification;
