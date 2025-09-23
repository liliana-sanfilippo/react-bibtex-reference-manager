import {getLinksAndIds} from "./getLinksAndIds";
import {getListofReferencedCitations} from "./getListofReferencedCitations";
import {CitationLinkContext} from "./CitationContext";

export function createCitationLinkContext(references: string | string[], maintenanceMode: boolean,): CitationLinkContext{
    if (typeof references == "string") {
        return {links: getLinksAndIds(), citations: getListofReferencedCitations([references]), maintenanceMode: maintenanceMode}
    } else {
        return {links: getLinksAndIds(), citations: getListofReferencedCitations(references), maintenanceMode: maintenanceMode}
    }

}