import React, {useContext} from "react";
import {goTo} from "@liliana-sanfilippo/react-bibtex-reference-generator/dist/ScrollLink/scrollTo";
import {CitationContext} from "./CitationContext";

interface CitationlLinkProps {
    referenceID: string | string[];
}


export const CitationlLink : React.FC<CitationlLinkProps> = ({referenceID}) => {
    const context = useContext(CitationContext);
    const handleClick = () => {
        const targetElement = document.getElementById(referenceID+"-reference");
        if (targetElement) {
            goTo(targetElement);
        }
    };
    if (typeof referenceID === "string") {
        return (
            <sup><a className="citationlink" onClick={handleClick} id={referenceID}>
                {(context!.links!.indexOf(referenceID)+1).toString()}
            </a>
            </sup>
        );
    } else {
        return (
            <>
                {referenceID.flatMap((id, index) => [
                    index > 0 && <sup key={`sep-${id}`}>,</sup>,
                    <sup key={id}>
                        <a className="citationlink" onClick={handleClick} id={id}>
                            {(context!.links!.indexOf(id) + 1).toString()}
                        </a>
                    </sup>
                ])}
            </>
        )
    }

};