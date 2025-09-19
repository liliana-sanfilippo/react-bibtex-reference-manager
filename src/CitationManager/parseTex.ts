import {Entry, parseToEntry} from "@liliana-sanfilippo/bibtex-ts-parser";

export function parseTex(bibtexSources: string[]) {
    if(!bibtexSources) {
        return undefined;
    }
        try {
            const allEntries: Entry[] = [];
            bibtexSources.map(bibtex => {
                const clean = bibtex.replace(/-\s*\n\s*/g, "");
                const parsed = parseToEntry(clean);
                allEntries.push(...parsed);
            })
           return  allEntries;
        } catch (error) {
            console.error("Error parsing BibTeX: ", error);
            alert("An error occurred while parsing the BibTeX entries. Please check the format." + bibtexSources);
        }
}