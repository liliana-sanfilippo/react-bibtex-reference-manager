import { goTo } from "./scrollTo";
import React from "react";

interface SupScrollLinkProps {
    label: string;
    special?: string;
}


export const SupScrollLink : React.FC<SupScrollLinkProps> = ({label, special}) => {
    let targetId = "desc-" + label
    if (special) {
        targetId += "#" + special
    }
    const handleClick = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            goTo(targetElement);
        }
    };

    return (
        <sup><a onClick={handleClick} id={`at${targetId}`}>
            {label}
        </a>
        </sup>
    );
};