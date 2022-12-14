/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'

const Message = (props) => {
    const { type, message }  = props;
    const messages = {
        saved: 'Your post was Saved!',
        updated: 'Your post was Updated!',
        deleted: 'Your post was Deleted!',
        error: `We've encountered an error: ${message}`,
    };

    return(
        <div className = {`App-message ${type}`}>
            <p className = {'container'}> 
                <strong>{messages[type]}</strong> 
            </p>
        </div>
    );

};

// props types as good practice. Although the short circuit operator works on assignment / destructure from props works too.
Message.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
}

export default Message;