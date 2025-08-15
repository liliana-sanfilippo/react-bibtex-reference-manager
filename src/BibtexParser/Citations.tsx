import React, { useState, useEffect } from "react";
import { createCitationGenerator } from "./citationFactory";
import {BibtexParserProps} from "./BibtexParserProps";
import {AbstractCitation} from "./AbstractCitation";


export const Citations: React.FC<BibtexParserProps> = ({ bibtexSources , special, start, style}) => {
    const [citation, setCitation] = useState<AbstractCitation | null >(null);
    console.log("Mounting");
    useEffect(() => {
        try {
            const generator = createCitationGenerator({
                bibtexSources,
                special,
                start,
                style
            });
            setCitation(generator);
        } catch (error) {
            console.error("Error parsing BibTeX: ", error);
            alert(
                "An error occurred while parsing the BibTeX entries. Please check the format." +
                bibtexSources
            );
        }
    }, [bibtexSources, special, start, style]);

    if (!citation) {
        return <p>Loading citations...</p>;
    }

    const entries = citation.getParsedEntries();

    if (!citation.hasEntries()) {
        return <p>No citations available.</p>;
    }

    return (
        <div>
            <ol start={citation.getStartNumber()}>
                {entries.map((entry, index) =>
                    citation.renderCitation(entry, index)
                )}
            </ol>
        </div>
    );

};