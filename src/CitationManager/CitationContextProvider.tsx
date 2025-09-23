import React from "react";
import {CitationContext} from "./CitationContext";
import {createCitationLinkContext} from "./createCitationLinkContext";


export function CitationProvider({bibtex, children, maintenanceMode}:{bibtex: string[] | string, children: React.ReactNode, maintenanceMode?: boolean,}) {

    return <CitationContext.Provider value={createCitationLinkContext(bibtex, (maintenanceMode ?? false))}>{children}</CitationContext.Provider>;
}