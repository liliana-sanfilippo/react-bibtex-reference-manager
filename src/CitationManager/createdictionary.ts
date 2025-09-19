import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";

export function createdictionary(bibtexSources: Entry[] | undefined): Map<string, Entry>  | null {
    let dict: Map<string, Entry> = new Map();
    if (!bibtexSources) {
        return null;
    }
    bibtexSources.forEach((source) => {
        dict.set(source.id, source)
    })
    return dict
}