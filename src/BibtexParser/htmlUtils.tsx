import React from "react";
import {Entry, parseToEntry} from "@liliana-sanfilippo/bibtex-ts-parser";

export function title(title:string): React.ReactNode {
    return (
      <><span property="schema:name">{title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}</span></>
    )
}

export function journal(journal: string, italic?: boolean, jot?: boolean): React.ReactNode {
    let warning = false;
    if (journal === "NULL") {
        warning = true;
        journal = "NO JOURNAL"
    }
    if (jot) {
        journal = "J. " + journal;
    }
    if (italic) return (<i style={warning ? { color: "red" } : {}} property="schema:publisher" typeof="schema:Organization">{journal}</i>)
    else return (<span style={warning ? { color: "red" } : {}} property="schema:publisher" typeof="schema:Organization">{journal}</span>)
}

export function issue(issue:string, no?: boolean): React.ReactNode {
    let warning = false;
    if (issue === "NULL") {
        warning = true;
        issue = "NO ISSUE"
    }
    if (no) {
        return (<span style={warning ? { color: "red" } : {}} property="issueNumber" typeof="PublicationIssue">no. {issue as string}</span>)
    } else  return (<span style={warning ? { color: "red" } : {}} property="issueNumber" typeof="PublicationIssue">{issue as string}</span>)
}

export function volume(volume:string | number, vol?: boolean): React.ReactNode {
    let warning = false;
    if (volume === "NULL") {
        warning = true;
        volume = "NO VOLUME"
    }
    if (vol) {
        return (<span style={warning ? { color: "red" } : {}} property="volumeNumber" typeof="PublicationVolume">vol. {volume as string}</span>)
    } else  return (<span style={warning ? { color: "red" } : {}} property="volumeNumber" typeof="PublicationVolume">{volume as string}</span>)
}

export function publishedTime(year: number | string, month?: string, day?: string, big?: boolean, yearFist?: boolean) {
    let warning = false;
    if (year === "NULL") {
        warning = true;
        year = "NO YEAR"
    }
    if(year != null) {
        if (month) {
            if (month === "NULL") {
                warning = true;
                month = "NO MONTH"
            }
            if (day) {
                if (day === "NULL") {
                    warning = true;
                    day = "NO DAY"
                }
               return (<span style={warning ? { color: "red" } : {}}><time property="schema:datePublished" dateTime={month + (year as string)}>{year} {month} {day}</time></span>)
            } else if (yearFist) {
                return (<span style={warning ? { color: "red" } : {}}><time property="schema:datePublished" dateTime={month + (year as string)}>{year} {month}</time></span>)
            }
            return (<span style={warning ? { color: "red" } : {}}><time property="schema:datePublished" dateTime={month + (year as string)}>{month} {year}</time></span>)
        }
        else if (big) {
            return (<b style={warning ? { color: "red" } : {}}><time property="schema:datePublished" dateTime={(year as string)}>{year}</time></b>)
        }
        else return (<span style={warning ? { color: "red" } : {}}><time property="schema:datePublished" dateTime={(year as string)}>{year}</time></span>)
    }
}

export function doi(doi: string): React.ReactNode {
    if (doi === "NULL") {
        return (<span style={{color: "red"}}> NO DOI </span>)
    } else {
        if (doi.includes("https")) {
            doi = "https://doi.org/" + doi;
        }
    }
    return (
        <span> doi: <span><a className="doi" href={doi}>{doi}</a></span></span>
    )
}

export function pages(pages: string | undefined): React.ReactNode {
    if(pages === "NULL") {
        return <span style={{color: "red"}}>NO PAGES</span>
    }
    if (pages && pages.length > 0) {
        const pageRangeRegex = /--|-|–|â€“/;
        if (pageRangeRegex.test(pages)) {
            const pag = pages.split(pageRangeRegex).map(p => p.trim());
            const begin = pag[0];
            const end = pag[1];

            return (
                <>
                    <span property="schema:pageBegin">{begin}</span>-<span property="schema:pageEnd">{end}</span>
                </>
            );
        } else if (/^\d+(-\d+)?$/.test(pages)) {
            return (
                <>
                    <span property="schema:pageBegin">{pages}</span>
                </>
            );
        } else {
            console.warn(`Non-numeric page information detected ('${pages}'). Treating as missing.`);
            return null;
        }
    } else {
        console.warn("Sorry, no page information.");
        return null;
    }
}


export function fromUrl(url: string): React.ReactNode {
    if (url === "NULL") {
        return (
            <span style={{color: "red"}}> NO URL </span>
        )
    }
    return (
        <span>Available from: <a property="url" datatype="url" href={url}>{url}</a></span>
    )
}

export function authors(authors: string): React.ReactNode {
    if (authors === "NULL") {
        return ( <span style={{color: "red"}}> NO AUTHORS </span>)
    }
    return (<span>{authors}</span>)
}
