import React from 'react';


function ButtonComponent(props) {

    const {name, styleClass, onClick, disabled} = props;

    return (
        <div>
            <button className={styleClass} onClick={onClick} disabled={disabled}>
                {name}
            </button>
        </div>
    );
}

export default ButtonComponent;