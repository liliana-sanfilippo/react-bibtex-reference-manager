import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";

export function createDictionary(bibtexSources: Entry[]): Map<string, Entry>  {
    let dict: Map<string, Entry> = new Map();
    /**
     * Case 1: No bibtexSources given => TypeError
     * Should not occur in real usage due to typing.
     */
    if (!bibtexSources) {
        throw new TypeError("References undefined");
    }
    /**
     * Case 2: Empty bibtexSources given => Just a warning, can occur when nothing is entered yet.
     */
    if (bibtexSources.length < 1) {
        console.warn("No bibtex references given")
    }
    /**
     * Case 3: Returns dictionary.
     */
    bibtexSources.forEach((source) => {
        dict.set(source.id, source);
    })
    return dict;
}