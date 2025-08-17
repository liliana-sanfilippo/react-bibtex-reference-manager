import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {authors, journal, pages, publishedTime, title, volume} from "../htmlUtils";

export class ACSCitation extends AbstractCitation {
    constructor(bibtexSources: string[] , special?: string, start?: number) {
        super(bibtexSources, special, start);
    }

    formatAuthors(authors: string): string{
        if (authors === "NULL" || authors === undefined || authors == "") {
            return "NULL"
        } else return allNames(authors).map(full_name =>  full_name.lastname + ", " + full_name.firstnames.charAt(0) + ".").join("; ");
    }

    renderCitation(entry: Entry, index: number): React.ReactNode {
        return (
            <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={this.createEntryId(index)}>
                {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                &nbsp;
                {title(entry.title)}.
                &nbsp;
                {journal((entry.journal ?? "NULL"), true, true)}
                .
                &nbsp;
                {publishedTime((entry.year ?? "NULL"), null, null, true)}
                ,
                &nbsp;
                {volume((entry.volume ?? "NULL"))}
                ,
                &nbsp;
                {pages((entry.pages ?? "NULL"))}
                .
            </li>
        );
    }
}