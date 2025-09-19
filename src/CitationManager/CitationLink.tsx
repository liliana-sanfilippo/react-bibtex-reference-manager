import React, {useContext} from "react";
import {goTo} from "@liliana-sanfilippo/react-bibtex-reference-generator/dist/ScrollLink/scrollTo";
import {CitationContext} from "./CitationContext";

interface CitationlLinkProps {
    referenceID: string;
}


export const CitationlLink : React.FC<CitationlLinkProps> = ({referenceID}) => {
    const context = useContext(CitationContext);
    const handleClick = () => {
        const targetElement = document.getElementById(referenceID+"-reference");
        if (targetElement) {
            goTo(targetElement);
        }
    };

    return (
        <sup><a className="citationlink" onClick={handleClick} id={referenceID}>
            {(context!.links!.indexOf(referenceID)+1).toString()}
        </a>
        </sup>
    );
};