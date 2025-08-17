import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {authors, issue, journal, pages, publishedTime, title, volume} from "../htmlUtils";

export class AMACitation extends AbstractCitation {
    constructor(bibtexSources: string[] , special?: string, start?: number) {
        super(bibtexSources, special, start);
    }
    formatAuthors(authors: string): string{
        if (authors === "NULL" || authors === undefined || authors == "") {
            return "NULL"
        }
        return allNames(authors).map(full_name => full_name.lastname + " " + (full_name.firstnames.replace("-", " ").split(" ").map(part => part.charAt(0)).join(""))).join(", ") + ".";

    }
    renderCitation(entry: Entry, index: number): React.ReactNode {
        return (
            <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                &nbsp;
                {title(entry.title)}
                .
                &nbsp;
                <i>J</i>
                &nbsp;
                {journal((entry.journal ?? "NULL"), true, false)}
                .
                &nbsp;
                {publishedTime((entry.year ?? "NULL"))}
                ;
                {volume((entry.volume ?? "NULL"))}
                (
                {issue((entry.number ?? "NULL"))}
                ):
                {pages((entry.pages ?? "NULL"))}
                .
            </li>
        );
    }
}