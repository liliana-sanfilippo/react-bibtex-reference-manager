import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {
    accessed,
    authors,
    fromUrl,
    issue,
    journal,
    pages,
    publishedTime,
    publisher,
    school,
    title,
    volume
} from "../htmlUtils";

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
        if (entry.type == "article") {
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
        } else if (entry.type == "book") {
            return (
                <li key={index} typeof="schema:Book" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .
                    &nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;
                    &nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    .
                </li>
            )
        } else if (entry.type == "inbook" || entry.type == "incollection") {
            return (
                <li key={index} typeof="schema:Chapter" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    . In:
                    &nbsp;
                    <i>{title((entry.booktitle) ?? "NULL")}</i>
                    .
                    &nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;
                    &nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    :
                    {pages((entry.pages ?? "NULL"))}
                    .
                </li>
            )
        }else if (entry.type == "misc") {
            if ((entry.note).toLowerCase() == "ai") {
                return (
                    <li key={index}  role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                        {title((entry.title ?? "NULL"))}
                        .
                        &nbsp;
                        Version no.
                        &nbsp;
                        {volume((entry.volume) ?? entry.series ?? "NULL")}
                        .
                        &nbsp;
                        {publisher((entry.publisher ?? "NULL"))}
                        .
                        &nbsp;
                        {publishedTime((entry.year ?? "NULL"))}
                        .
                        &nbsp;
                        {fromUrl((entry.url ?? "NULL"))}
                    </li>
                )
            } else return (
                <li key={index} typeof="schema:WebSite" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors((entry.author ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    .
                    Published
                    &nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), "NULL", false, false, true)}
                    .
                    &nbsp;
                    {accessed((entry.note ?? "NULL"))}
                    .
                    &nbsp;
                    {fromUrl((entry.url ?? "NULL"))}
                </li>
            )
        } else if (entry.type == "mastersthesis") {
            return (
                <li key={index} typeof="schema:Thesis" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .
                    &nbsp;
                    Masters Thesis.
                    &nbsp;
                    {school(entry.school ?? "NULL")}
                    ;
                    &nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    .
                    &nbsp;
                    {entry.url && fromUrl(entry.url)}
                </li>
            )
        } else if (entry.type == "phdthesis") {
            return (
                <li key={index} typeof="schema:Thesis" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .
                    &nbsp;
                    Dissertation.
                    &nbsp;
                    {school(entry.school ?? "NULL")}
                    ;
                    &nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    .
                    &nbsp;
                    {entry.url && fromUrl(entry.url)}
                </li>
            )
        }
        else if (entry == "misc") {

        }
        else {
           return ( <li style={{color:  "orange"}}> Sorry, rendering {entry.type} not possible. </li>)
        }
    }
}