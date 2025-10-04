import React from "react";
import {CitationContext, CitationLinkContext} from "./CitationContext";
import {createCitationLinkContext} from "./createCitationLinkContext";
import {isBibTexParseError, isNoEntriesFoundInBibtexString} from "./ErrorGuards";
import {getLinksAndIds} from "./getLinksAndIds";


export function CitationProvider({bibtex, children, maintenanceMode}:{bibtex: string[] | string, children: React.ReactNode, maintenanceMode?: boolean,}) {
    let maintenanceMessages: {title: string, message: string}[] = new Array<{title: string, message: string}>;
    try {
        let context: CitationLinkContext =  createCitationLinkContext(bibtex, (maintenanceMode ?? false));
        return <CitationContext.Provider value={context}>{children}</CitationContext.Provider>;
    } catch (error: unknown) {
        if (isNoEntriesFoundInBibtexString(error)) {
           console.warn("NoEntriesFoundInBibtexString, activate maintenance mode for more info")
            maintenanceMessages.push({title: "NoEntriesFoundInBibtexString", message: "Because an empty bibtex string" +
                    " was" +
                    " provided to the CitationProvider."})
        } else if (isBibTexParseError(error)) {
            console.warn("BibTexParseError, activate maintenance mode for more info")
            maintenanceMessages.push({title: "BibTexParseError", message: "Because there was an error while parsing" +
                    " the bibtex"})
        } else {
            maintenanceMessages.push({title: "Unknown", message: "for unknown reason, please contact developer"})
        }
        return <CitationContext.Provider value={{links: getLinksAndIds(), citations: [], maintenanceMode: (maintenanceMode ?? false), maintenanceMessages: maintenanceMessages}}>{children}</CitationContext.Provider>;
    }

}