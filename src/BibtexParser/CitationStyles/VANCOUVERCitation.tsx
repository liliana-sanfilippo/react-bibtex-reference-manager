import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {
    accessed,
    address,
    authors,
    doi,
    fromUrl,
    issue,
    journal,
    pages,
    publishedTime, publisher,
    title,
    volume
} from "../../utils/htmlUtils";

export class VANCOUVERCitation extends AbstractCitation {
    constructor(bibtexSources: string[] , special?: string, start?: number) {
        super(bibtexSources, special, start);
    }
    formatAuthors(authors: string): string{
        if (authors === "NULL" || authors === undefined || authors == "") {
            return "NULL"
        }
        return allNames(authors).map(full_name => full_name.lastname + " " + (full_name.firstnames.replace("-", " ").split(" ").map(part => part.charAt(0)).join("")) ).join(", ") + "." ;

    }
    renderCitation(entry: Entry, index: number): React.ReactNode {
        if (entry.type == "article") {
            return (
                <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation"
                    id={super.createEntryId(entry.id)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    .&nbsp;
                    {journal((entry.journal ?? "NULL"))}
                    .&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), (entry.month ?? "NULL"), false, true)}
                    ;&nbsp;
                    {volume((entry.volume ?? "NULL"))}
                    (
                    {issue((entry.number?.toString() ?? "NULL"))}
                    )
                    :
                    {pages((entry.pages ?? "NULL"))}
                    .&nbsp;
                    Available from:
                    &nbsp;
                    {fromUrl((entry.url ?? "NULL"))}
                    &nbsp;
                    {doi((entry.doi ?? "NULL"))}
                </li>
            );
        } else if (entry.type == "book") {
            return (
                <li key={index} typeof="schema:Book" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(entry.id)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    .&nbsp;
                    {volume((entry.volume ?? "NULL"))}.
                    &nbsp;
                    {address((entry.address ?? "NULL"))}
                    :&nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;
                    {doi((entry.doi ?? "NULL"))}.
                </li>
            )
        }  else if (entry.type == "inbook") {
            return (
                <li key={index} typeof="schema:Chapter" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(entry.id)}>
                    {authors(this.formatAuthors(entry.author ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    . In:&nbsp;
                    {authors(this.formatAuthors(entry.editor ?? "NULL"))}
                    , editors.&nbsp;
                    {title((entry.booktitle ?? "NULL"))}
                    .&nbsp;
                    {address((entry.address ?? "NULL"))}
                    :&nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;
                    {doi((entry.doi ?? "NULL"))}.
                    &nbsp;p.&nbsp;
                    {pages((entry.pages ?? "NULL"))}
                    .
                </li>
            )
        } else if (entry.type == "misc") {
            return (
                <li key={index} typeof="schema:WebSite" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(entry.id)}>
                    {authors((entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    &nbsp;[Internet].&nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    &nbsp;[cited&nbsp;
                    {accessed((entry.note ?? "NULL"))}
                    ].&nbsp;Available from:&nbsp;
                    {fromUrl((entry.url ?? "NULL"))}
                </li>
            )
        }
        else {
            return ( <li style={{color:  "orange"}}> Sorry, rendering {entry.type} not possible. </li>)
        }
    }
}