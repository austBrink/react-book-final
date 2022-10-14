import { react } from 'react';

const Messages = ({ message }) => {
    const messages = {
        saved: 'Your post was Saved!',
        updated: 'Your post was Updated!',
        deleted: 'Your post was Deleted!'
    };
    return(
        <div className = {`App-message ${type}`}>
            <p className = {'container'}> 
                <strong>{messages[message]}</strong> 
            </p>
        </div>
    );
};

export default Messages;