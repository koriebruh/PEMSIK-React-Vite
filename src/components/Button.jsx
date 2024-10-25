import React from 'react';

function Button({ label, onClick, className }) {
    return (
        <button className={`${className} px-4 py-2 rounded`} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;
