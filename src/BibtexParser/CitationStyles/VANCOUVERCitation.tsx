import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";

export class VANCOUVERCitation extends AbstractCitation {
    constructor(bibtexSources: string[] , special?: string, start?: number) {
        super(bibtexSources, special, start);
    }
    formatAuthors(authors: string): React.ReactNode {
        return allNames(authors).map(full_name => full_name.lastname + " " + (full_name.firstnames.replace("-", " ").split(" ").map(part => part.charAt(0)).join("")) + ".").join(", ") ;

    }
    renderCitation(entry: Entry, index: number): React.ReactNode {
        return (
            <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                {this.formatAuthors(entry.author || entry.editor || "")}
                &nbsp;<span property="schema:name">{entry.title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                &nbsp;<span property="schema:publisher" typeof="schema:Organization">{entry.journal}</span>.
                <span>&nbsp;<time property="schema:datePublished" dateTime={(entry.year as string)}>{entry.year}&nbsp;{entry.month}</time>;</span>
                &nbsp;<span property="volumeNumber" typeof="PublicationVolume">{entry.volume}</span>
                &nbsp;(<span property="issueNumber" typeof="PublicationIssue">{entry.number}</span>)
                <span>:{super.formatPages(entry.pages)}</span>. {entry.url && <span>Available from: <a property="url" datatype="url" href={entry.url}>{entry.url}</a></span>}
                {entry.doi && <span> doi: <span><a className="doi" href={entry.doi}>{entry.doi}</a></span></span>}
            </li>
        );
    }
}