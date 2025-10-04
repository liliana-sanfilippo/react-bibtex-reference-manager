import {Entry, parseToEntry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {BibTexParseError, NoEntriesFoundInBibtexString} from "./Errors.js";

export function parseTex(bibtexSources: string[]): Entry[] {
    /**
     * Case 1: No list of bibtex strings given
     */
    if(!bibtexSources) {
        console.error("Expected string[]")
       throw new TypeError("Expected string[]")
    }
    /**
     * Case 2: List of bibtex strings given
     */
    const allEntries: Entry[] = [];
    try {

        bibtexSources.map(bibtex => {
            const clean = bibtex.replace(/-\s*\n\s*/g, "");
            const parsed = parseToEntry(clean);
            allEntries.push(...parsed);
        })
    } catch (error) {
        /**
         * Case 2.1: Error while parsing
         */
        console.error("Error parsing BibTeX: ", error);
        //alert("An error occurred while parsing the BibTeX entries. Please check the format." + bibtexSources);
        throw new BibTexParseError("Error parsing BibTeX: " +  error)
    }
    /**
     * Case 2.2: No Entries found
     */
    if( allEntries.length < 1) {
        console.warn("No entries. Unable to identify entries in the provided string(s)." +
            " Please" +
            " check.")
        throw new NoEntriesFoundInBibtexString("No entries. Unable to identify entries in the provided string(s)." +
            " Please" +
            " check.");
    } else {
        /**
         * Case 2.3: Entries found
         */
        return allEntries;
    }
}