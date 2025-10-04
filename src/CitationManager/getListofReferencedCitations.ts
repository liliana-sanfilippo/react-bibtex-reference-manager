import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {getLinksAndIds} from "./getLinksAndIds";
import {createdictionary} from "./createdictionary";
import {parseTex} from "./parseTex";

export function getListofReferencedCitations(bibtexSources: string[]):Entry[]{
    let entries: Entry[] = []
    try {
        entries = parseTex(bibtexSources!);
    } catch (error) {
        console.warn("No entries cited in text can be referenced in the list.")
        //TODO für maintenante mode erst irgendwo ganz am Ende abfangen???
    }
    const usedEntries: Entry[] = []
    const existingLinks = getLinksAndIds();
    const dict: Map<string, Entry> | null = createdictionary(entries)
    if (!dict) {
        return []
    }
    existingLinks.forEach((id) => {
        if (dict.has(id)) {
            usedEntries.push(dict.get(id)!);
        }
    })
    return usedEntries;
}