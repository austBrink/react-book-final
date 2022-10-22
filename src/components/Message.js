import { react } from 'react';

const Message = ({ type }) => {
    const messages = {
        saved: 'Your post was Saved!',
        updated: 'Your post was Updated!',
        deleted: 'Your post was Deleted!'
    };
    return(
        <div className = {`App-message ${type}`}>
            <p className = {'container'}> 
                <strong>{messages[type]}</strong> 
            </p>
        </div>
    );
};

export default Message;