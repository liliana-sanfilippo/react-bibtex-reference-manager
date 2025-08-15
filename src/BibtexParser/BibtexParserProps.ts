import {CitationStylesEnum} from "./types";

export interface BibtexParserProps {
    bibtexSources: string[];
    special?: string,
    start?: number,
    style?: CitationStylesEnum | string
}