import {getLinksAndIds} from "./getLinksAndIds.js";
import {getListofReferencedCitations} from "./getListofReferencedCitations.js";
import {CitationLinkContext} from "./CitationContext.js";

export function createCitationLinkContext(references: string | string[], maintenanceMode: boolean,): CitationLinkContext{
    if (typeof references == "string") {
        return {links: getLinksAndIds(), citations: getListofReferencedCitations([references]), maintenanceMode: maintenanceMode}
    } else {
        return {links: getLinksAndIds(), citations: getListofReferencedCitations(references), maintenanceMode: maintenanceMode}
    }

}