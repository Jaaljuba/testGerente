import React from "react";
import "../../css/menuOptionsTable.css"

export const MenuOptionsTable = (props) => { 
    const {isOpen, options} = props; 

    return (
        <div className={isOpen ? "options" : "options hide"}>
            <ul className="fragment">
                {options.map(e => (
                    <li key={e.Name} onClick={`${e.Action}`} className="list">
                        <i className={`${e.Icon} list--icon`}></i>
                        <span>{e.Name}</span>
                    </li>
                ))} 
            </ul>
        </div>
    )
}
