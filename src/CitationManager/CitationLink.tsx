import React, {useContext} from "react";
import {goTo} from "@liliana-sanfilippo/react-bibtex-reference-generator/dist/ScrollLink/scrollTo";
import {CitationContext} from "./CitationContext";

interface CitationlLinkProps {
    referenceID: string | string[];
}


export const CitationlLink : React.FC<CitationlLinkProps> = ({referenceID}) => {
    const context = useContext(CitationContext);
    if (typeof referenceID === "string") {
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
    } else {
        return (
            <>
                {referenceID.flatMap((id, index) => {
                    const handleClickForThisId = () => {
                        const targetElement = document.getElementById(id+"-reference");
                        if (targetElement) {
                            goTo(targetElement);
                        }
                    };

                    return [
                        index > 0 && <sup key={`comma-${id}`}>,</sup>,
                        <sup key={`sup-${id}`}>
                            <a className="citationlink" onClick={handleClickForThisId} id={id}>
                                {(context!.links!.indexOf(id) + 1).toString()}
                            </a>
                        </sup>
                    ];
                })}
            </>
        )
    }

};