import {getLinksAndIds} from "./getLinksAndIds";
import {getListofReferencedCitations} from "./getListofReferencedCitations";

export function createCitationLinkContext(references: string | string[]){
    if (typeof references == "string") {
        return {links: getLinksAndIds(), citations: getListofReferencedCitations([references])}
    } else {
        return {links: getLinksAndIds(), citations: getListofReferencedCitations(references)}
    }

}