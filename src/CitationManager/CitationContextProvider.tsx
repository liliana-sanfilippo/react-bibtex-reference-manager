import React from "react";
import {CitationContext} from "./CitationContext";
import {createCitationLinkContext} from "./createCitationLinkContext";


export function CitationProvider({bibtex, children}:{bibtex: string[] | string, children: React.ReactNode}) {
    return <CitationContext.Provider value={createCitationLinkContext(bibtex)}>{children}</CitationContext.Provider>;
}