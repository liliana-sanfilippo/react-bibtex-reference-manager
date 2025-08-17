import {Entry, parseToEntry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React, {ReactElement} from "react";

export abstract class AbstractCitation {
    protected bibtexSources: string[];
    private parsedEntries: Entry[] = [];
    protected start_number: number;
    protected appendage: string;

    protected constructor(bibtexSources: string[] , special?: string, start?: number) {
        this.start_number = (start ?? 1);
        this.appendage = this.createAdditionalName(special);
        this.bibtexSources = bibtexSources;
        this.parse(this.bibtexSources);

    }

    getStartNumber(): number{
        return this.start_number;
    }

    abstract renderCitation(entry: Entry, index?: number): React.ReactNode;
    abstract formatAuthors(authors: string): React.ReactNode;


    getParsedEntries(): Entry[] {
        return this.parsedEntries;
    }


    protected formatPages(pages: string | undefined): ReactElement | null {
        if (pages && pages.length > 0) {
            const pageRangeRegex = /--|-|–|â€“/;
            if (pageRangeRegex.test(pages)) {
                const pag = pages.split(pageRangeRegex).map(p => p.trim());
                const begin = pag[0];
                const end = pag[1];

                return (
                    <>
                        &nbsp;<span property="schema:pageBegin">{begin}</span>-<span property="schema:pageEnd">{end}</span>
                    </>
                );
            } else if (/^\d+(-\d+)?$/.test(pages)) {
                return (
                    <>
                        &nbsp;<span property="schema:pageBegin">{pages}</span>
                    </>
                );
            } else {
                console.warn(`Non-numeric page information detected ('${pages}'). Treating as missing.`);
                return null;
            }
        } else {
            console.warn("Sorry, no page information.");
            return null;
        }
    }

    protected createAdditionalName(additional_name?: string): string {
        if (additional_name) {
           return  `#${additional_name}`;
        } else return ""
    }

    protected createEntryId(index: number): string{
        let citationNumber = index +1;
        citationNumber += this.start_number -1;
        return `desc-${citationNumber}${this.appendage}`
    }

    protected parse(bibtexSources: string[]){
        try {
            const allEntries: Entry[] = [];
            bibtexSources.map(bibtex => {
                const parsed = parseToEntry(bibtex);
                allEntries.push(...parsed);
            })
            this.parsedEntries = allEntries;
        } catch (error) {
            console.error("Error parsing BibTeX: ", error);
            alert("An error occurred while parsing the BibTeX entries. Please check the format." + bibtexSources);
        }
    }

    hasEntries(): boolean {
        return this.parsedEntries.length > 0;
    }

    protected fixDoiLink(doi: string): string {
        if (doi.includes("https")) {
            return doi;
        } else return "https://doi.org/" + doi;
    }



}