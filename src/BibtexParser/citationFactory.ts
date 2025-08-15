import {AbstractCitation} from "./AbstractCitation";
import {ACSCitation} from "./CitationStyles/ACSCitation";
import {BibtexParserProps} from "./BibtexParserProps";
import {AMACitation} from "./CitationStyles/AMACitation";
import {IEEECitation} from "./CitationStyles/IEEECitation";
import {NLMCitation} from "./CitationStyles/NLMCitation";
import {VANCOUVERCitation} from "./CitationStyles/VANCOUVERCitation";

export function createCitationGenerator({bibtexSources , special, start, style}: BibtexParserProps): AbstractCitation {
    switch (style) {
        case "acs":
            return new ACSCitation(bibtexSources, special, start);
        case "ama":
            return new AMACitation(bibtexSources, special, start);
        case "ieee":
            return new IEEECitation(bibtexSources, special, start);
        case "nlm":
            return new NLMCitation(bibtexSources, special, start);
        case "vancouver":
            return new VANCOUVERCitation(bibtexSources, special, start);
        default:
            return new ACSCitation(bibtexSources, special, start);
    }
}