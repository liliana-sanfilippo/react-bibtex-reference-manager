import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {getLinksAndIds} from "./getLinksAndIds.js";
import {createDictionary} from "./createDictionary.js";
import {parseTex} from "./parseTex.js";

export function getListofReferencedCitations(bibtexSources: string[]):Entry[]{
    let entries: Entry[] = [];
    /**
     * All entries are parsed.
     */
    entries = parseTex(bibtexSources!);
    /**
     * Case 1: Error in parseTex => Error gets passed on
     */
    const usedEntries: Entry[] = [];
    /**
     * Page is searched for citation links.
     */
    const existingLinks = getLinksAndIds();
    /**
     * Case 2: Error in getLinksAndIds => Error may get passed on
     * Should not occur in usage.
     */
    /**
     * All entries are mapped to ensure there are no duplicates and to ease parsing.
     */
    const dict: Map<string, Entry> = createDictionary(entries);
    /**
     * Case 3: Error in createDictionary => Error gets passed on
     * Should not occur in usage.
     */
    /**
     * If the reference is cited on the page, it gets pushed into the list of used links.
     */
    existingLinks.forEach((id) => {
        if (dict.has(id)) {
            usedEntries.push(dict.get(id)!);
        }
    })
    /**
     * Case 4: No links found or no entries found => Returns empty Map.
     */
    /**
     * Case 5: Links found, returns list.
     */
    return usedEntries;
}