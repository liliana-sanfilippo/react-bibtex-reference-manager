import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";

export class IEEECitation extends AbstractCitation {
    constructor(bibtexSources: string[] , special?: string, start?: number) {
        super(bibtexSources, special, start);
    }
    formatAuthors(authors: string): React.ReactNode {
        return allNames(authors).map(full_name => (full_name.firstnames.replace("-", " ").split(" ").map(part => part.charAt(0)).join("")) + "." + " " +  full_name.lastname ).join("; ") + ",";
    }

    renderCitation(entry: Entry, index: number): React.ReactNode {
        return (
            <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={this.createEntryId(index)}>
                {this.formatAuthors(entry.author || entry.editor || "")}&nbsp;
                "<span property="schema:name">{entry.title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()},</span>"
                <span property="schema:publisher" typeof="schema:Organization"> {entry.journal}</span>., <span property="volumeNumber" typeof="PublicationVolume">vol. {entry.volume}</span>,
                <span property="issueNumber" typeof="PublicationIssue"> no. {entry.number}</span>
                <span>, pp.{super.formatPages(entry.pages)}</span>,&nbsp;
                 <span><time property="schema:datePublished" dateTime={(entry.year as string)}>{entry.month} {entry.year}</time></span>,
                {entry.doi && <span> doi: <span><a className="doi" href={entry.doi}>{entry.doi}</a></span></span>}
            </li>
        );
    }
}