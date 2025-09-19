import React, {useContext} from "react";
import {Citations} from "@liliana-sanfilippo/react-bibtex-reference-generator";
import {CitationContext} from "./CitationContext";



export const ManagedCitation: React.FC<{}> = () => {
    const context = useContext(CitationContext);
    return (
        <Citations bibtexSources={context!.citations}></Citations>
    );

};