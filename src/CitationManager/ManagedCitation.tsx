import React from "react";
import {CitationStylesEnum} from "../BibtexParser/types";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {AbstractCitation} from "../BibtexParser/AbstractCitation";
import {createCitationGenerator} from "../BibtexParser/citationFactory";


export interface Props {
    bibtexSources: Entry[];
    special?: string,
    start?: number,
    style?: CitationStylesEnum | string
}

export const ManagedCitation: React.FC<Props> = ({ bibtexSources , special, start, style}) => {
    let generator: AbstractCitation = createCitationGenerator({
        bibtexSources,
        special,
        start,
        style
    });

    if (!generator) {
        return <p>Loading citations...</p>;
    }


    if (!generator.hasEntries()) {
        return <p>No citations available.</p>;
    }


    return (
        <div>
            <ol start={generator.getStartNumber()}>
                {bibtexSources.map((entry, index) =>
                    generator.renderCitation(entry, index)
                )}
            </ol>
        </div>
    );

};