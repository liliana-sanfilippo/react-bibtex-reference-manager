import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {getLinksAndIds} from "./getLinksAndIds";
import {createdictionary} from "./createdictionary";
import {parseTex} from "./parseTex";

export function getListofReferencedCitations(bibtexSources: string[] | undefined):Entry[]{
    const entries = parseTex(bibtexSources!);
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