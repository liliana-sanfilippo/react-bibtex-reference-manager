import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import {collectLinkIds} from "./collectLinkIds";
import {createdictionary} from "./createdictionary";

export function getListofReferencedCitations(bibtexSources: Entry[] | undefined):Entry[]{
    // const usedEntries: Map<string, Entry> = new Map<string, Entry>();
    const usedEntries: Entry[] = []
    const existingLinks = collectLinkIds();
    const dict: Map<string, Entry> | null = createdictionary(bibtexSources)
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