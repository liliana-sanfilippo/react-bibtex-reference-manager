import {AbstractCitation} from "../AbstractCitation";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";
import React from "react";
import {allNames} from "@liliana-sanfilippo/author-name-parser";
import {
    accessed, address,
    authors, conference, doi, edition,
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
                .&nbsp;
                <i>J</i>
                &nbsp;
                {journal((entry.journal ?? "NULL"), true, false)}
                .&nbsp;
                {publishedTime((entry.year ?? "NULL"))}
                ;
                {volume((entry.volume ?? "NULL"))}
                (
                {issue((entry.number?.toString() ?? "NULL"))}
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
                    .&nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;&nbsp;
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
                    . In:&nbsp;
                    <i>{title((entry.booktitle) ?? "NULL")}</i>
                    .&nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;&nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    :
                    {pages((entry.pages ?? "NULL"))}
                    .
                </li>
            )
        } else if (entry.type == "online" || entry.type == "misc") {
            return (
                <li key={index} typeof="schema:WebSite" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors((entry.author ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    . Published&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), "NULL", false, false, true)}
                    .&nbsp;
                    {accessed((entry.note ?? "NULL"))}
                    .&nbsp;
                    {fromUrl((entry.url ?? "NULL"))}
                </li>
            )
        }
        else if (entry.type == "software") {
            // TODO add version at edition
            return (
                <li key={index} typeof="schema:Software" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {title(entry.title)}
                    &nbsp;[Computer Software].&nbsp;
                    {edition((entry.edition ?? "NULL"))}
                    .&nbsp;
                    {address((entry.address ?? "NULL"))}
                    :&nbsp;
                    {publisher((entry.publisher ?? this.formatAuthors(entry.author ?? "NULL") ?? entry.organization ??  "NULL"))}
                    ;&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), "NULL", false, false, true)}
                    .
                </li>
            )
        }
        else if (entry.type == "genai") {
                return (
                    <li key={index}  role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                        {title((entry.title ?? "NULL"))}
                        .&nbsp;Version no.&nbsp;
                        {volume((entry.volume) ?? entry.series ?? "NULL")}
                        .&nbsp;
                        {publisher((entry.publisher ?? "NULL"))}
                        .&nbsp;
                        {publishedTime((entry.year ?? "NULL"))}
                        .&nbsp;
                        {fromUrl((entry.url ?? "NULL"))}
                    </li>
                )
        } else if (entry.type == "mastersthesis") {
            return (
                <li key={index} typeof="schema:Thesis" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .&nbsp;Masters Thesis.&nbsp;
                    {school(entry.school ?? "NULL")}
                    ;&nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    .&nbsp;
                    {entry.url && fromUrl(entry.url)}
                </li>
            )
        } else if (entry.type == "phdthesis") {
            return (
                <li key={index} typeof="schema:Thesis" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .&nbsp;Dissertation.&nbsp;
                    {school(entry.school ?? "NULL")}
                    ;&nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    .&nbsp;
                    {entry.url && fromUrl(entry.url)}
                </li>
            )
        }
        else if (entry.type == "unpublished") {
            return (
                <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    .&nbsp;
                    <i>{publisher((entry.journal ?? entry.publisher ?? "NULL"))}</i>
                    . Preprint. Posted online&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), ("NULL"), false, false, true)}
                    .&nbsp;
                    {entry.doi && doi((entry.doi ?? "NULL"))}
                </li>
            );
        }  else if (entry.type == "inproceedings" || entry.type == "proceedings" || entry.type == "conference") {
            // TODO add ?? "entry.event" to publisher
            return (
                <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    {title(entry.title)}
                    . Presented at:&nbsp;
                    {conference((entry.journal ?? entry.publisher ?? "NULL" ))}
                    ;&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), ("NULL"), false, false, true)}
                    ;&nbsp;
                    {address((entry.address ?? "NULL"))}
                    .
                    {entry.url && fromUrl(entry.url)}
                </li>
            );
        }  else if (entry.type == "booklet") {
            return (
                <li key={index} typeof="schema:Book" role="doc-biblioentry" property="schema:citation"
                    id={super.createEntryId(index)}>
                    {authors(this.formatAuthors(entry.author ?? entry.editor ?? "NULL"))}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .&nbsp;
                    {publishedTime((entry.year ?? "NULL"))}
                    .
                </li>
            );
        } else if (entry.type == "techreport") {
            return (
                <li key={index} typeof="schema:Report" role="doc-biblioentry" property="schema:citation"
                    id={super.createEntryId(index)}>
                    {(entry.author && authors(this.formatAuthors(entry.author))) || entry.organization || "NULL"}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    .&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), "NULL", false, false, true)}
                    .&nbsp;Accessed&nbsp;
                    {accessed((entry.note ?? "NULL"))}
                    .
                    {entry.url && fromUrl(entry.url)}
                </li>
            );
        } else if (entry.type == "manual") {
            return (
                <li key={index} typeof="schema:Manual" role="doc-biblioentry" property="schema:citation"
                    id={super.createEntryId(index)}>
                    {(entry.author && authors(this.formatAuthors(entry.author))) || entry.organization || "NULL"}
                    &nbsp;
                    <i>{title(entry.title)}</i>
                    &nbsp;
                    {edition((entry.edition ?? "NULL"))}
                    &nbsp;ed.&nbsp;
                    {address((entry.address ?? "NULL"))}
                    :&nbsp;
                    {publisher((entry.publisher ?? "NULL"))}
                    ;&nbsp;
                    {publishedTime((entry.year ?? "NULL"), (entry.month ?? "NULL"), "NULL", false, false, true)}
                    .
                </li>
            );
        }
        else {
           return ( <li style={{color:  "orange"}}> Sorry, rendering {entry.type} not possible. </li>)
        }
    }
}