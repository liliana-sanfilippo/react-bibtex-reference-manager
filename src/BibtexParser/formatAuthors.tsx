import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {CitationStylesEnum} from "./types";

export function formatAuthors(authors: string, type?: CitationStylesEnum): string {
    return allNames(authors).map(fullname => fullname.firstnames + " " + fullname.lastname).join(", ") + ".";
};


