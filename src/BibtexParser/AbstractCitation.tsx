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
    abstract formatAuthors(authors: string): string;


    getParsedEntries(): Entry[] {
        return this.parsedEntries;
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



}