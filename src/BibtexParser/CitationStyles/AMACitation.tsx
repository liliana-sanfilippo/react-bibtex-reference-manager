import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";

export class AMACitation extends AbstractCitation {
    constructor(bibtexSources: string[] , special?: string, start?: number) {
        super(bibtexSources, special, start);
    }
    formatAuthors(authors: string): React.ReactNode {
        return allNames(authors).map(fullname => fullname.lastname + " " + (fullname.firstnames.replace("-", " ").split(" ").map(part => part.charAt(0)).join(""))).join(", ") + ".";

    }
    renderCitation(entry: Entry, index: number): React.ReactNode {
        return (
            <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                {this.formatAuthors(entry.author || entry.editor || "")}
                &nbsp;<span property="schema:name">{entry.title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                &nbsp;<i property="schema:publisher" typeof="schema:Organization">J. {entry.journal}</i>.
                <span>&nbsp;<time property="schema:datePublished" datatype="xsd:gYear" dateTime={(entry.year as string)}>{entry.year}</time>;</span>
                &nbsp;<span property="volumeNumber" typeof="PublicationVolume">{entry.volume}</span>
                &nbsp;(<span property="issueNumber" typeof="PublicationIssue">{entry.number}</span>)
                <span>:{super.formatPages(entry.pages)}</span>.
            </li>
        );
    }
}