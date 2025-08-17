import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {authors, doi, issue, journal, pages, publishedTime, title, volume} from "../htmlUtils";

export class NLMCitation extends AbstractCitation {
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
        if (entry.type == "article") {
        return (
            <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                &nbsp;
                {title(entry.title)}
                .&nbsp;
                {journal((entry.journal ?? "NULL"))}
                .&nbsp;
                {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), undefined, false, true)}
                ;
                {volume((entry.volume ?? "NULL"))}
                (
                {issue((entry.number?.toString() ?? "NULL"))}
                ):
                {pages((entry.pages ?? "NULL"))}
                .
                {doi((entry.doi ?? "NULL"))}.
            </li>
        );
        } else {
            return ( <li style={{color:  "orange"}}> Sorry, rendering {entry.type} not possible. </li>)
        }
    }
}

