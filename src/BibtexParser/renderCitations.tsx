// Helper function to render individual citations based on their type
import {formatPages} from "./formatPages";
import {formatAuthors} from "./formatAuthors";
import React from "react";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";

export function renderCitation (entry: Entry, index: number,  additionalname: string, start?: number): React.ReactNode {

    // Use the index as citation number
    let citationNumber = index +1;
    if(start){
        citationNumber += start -1;
    }
    const entryType = entry.type.toLowerCase(); // Convert to lowercase for consistent comparisondjust based on your data structure

    switch (entryType) {
        case "article":
            return (
                <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={`desc-${citationNumber}${additionalname}`}>
                    {/* Citation number as comment */}
                    {/*<!-- Citation num ${citationNumber} --> */}
                    {formatAuthors(entry.author || entry.editor || "")}
                    &nbsp;<span property="schema:name">{entry.title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    &nbsp;<i property="schema:publisher" typeof="schema:Organization">{entry.journal}</i>
                    &nbsp;<b property="issueNumber" typeof="PublicationIssue">{entry.volume}</b>
                    {formatPages(entry.pages) && <span>{formatPages(entry.pages)}</span>}
                    {entry.year && (
                        <span>&nbsp;(<time property="schema:datePublished" datatype="xsd:gYear" dateTime={(entry.year as string)}>{entry.year}</time>).</span>
                    )}
                    {entry.doi && (
                        <span>&nbsp;<a className="doi" href={`https://doi.org/${entry.doi}`}>doi: {entry.doi}</a></span>
                    )}
                </li>
            );

        case "book":

            const authors: string = (entry.author ?? entry.editor ?? "") as string;
            const auts: string = formatAuthors(authors);
            return (
                <li key={index} typeof="schema:Book" role="doc-biblioentry" property="schema:citation" id={`desc-${citationNumber}`}>
                    {/* Render authors */}
                    {formatAuthors(entry.author || entry.editor || "")}
                    {/* Render title or booktitle */}
                    {entry.title ? (
                        <span property="schema:name">&nbsp;{entry.title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    ) : entry.booktitle ? (
                        <span property="schema:name">&nbsp;{entry.booktitle.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    ) : (
                        console.warn(`No title or booktitle found for entry ${citationNumber}`)
                    )}
                    {/* Render publisher */}
                    {entry.publisher && (
                        <i property="schema:publisher" typeof="schema:Organization">
                            &nbsp;{entry.publisher}
                        </i>
                    )}
                    {/* Render year */}
                    {entry.year && (
                        <span>
                &nbsp;(<time property="schema:datePublished" datatype="xsd:gYear" dateTime={entry.year as string}>
                  {entry.year}
                </time>).
              </span>
                    )}
                    {entry.issn && (
                        <span property="isbn">&nbsp;{entry.issn}</span>
                    )
                    }
                </li>
            );

        case "misc":
            return (
                <li key={index} typeof="schema:WebPage" role="doc-biblioentry" property="schema:citation" id={`desc-${citationNumber}`}>
                    {/* Render authors */}
                    {(entry.author || entry.editor || "")}
                    {/* Render title */}
                    {entry.title && (
                        <span property="schema:name">.&nbsp;{entry.title.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    )}
                    {/* Render howpublished */}
                    {entry.publisher && (
                        <i property="schema:publisher" typeof="schema:Organization">&nbsp;{entry.publisher}</i>
                    )}
                    {/* Render year */}
                    {entry.year && (
                        <span>&nbsp;(<time property="schema:datePublished" datatype="xsd:gYear" dateTime={entry.year as string}>{entry.year}</time>).</span>
                    )}
                </li>
            );

        // Handle additional entry types here
        case "inproceedings":
            return (
                <li key={index}>
                    <span>{formatAuthors(entry.author || "")}</span>&nbsp;
                    <span>{entry.title}</span>. In <i>{entry.booktitle}</i>,&nbsp;
                    <b>{entry.editor}</b>, {entry.year}.
                </li>
            );

        case "phdthesis":
            return (
                <li key={index}>
                    <span>{formatAuthors(entry.author || "")}</span>&nbsp;
                    <span>{entry.title}</span>, PhD thesis, {entry.school}, {entry.year}.
                </li>
            );

        default:
            console.warn(`Unknown entry type: ${entryType}`);
            return <li key={index}>Unknown entry type: {entryType}</li>;
    }
}