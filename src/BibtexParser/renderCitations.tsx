// Helper function to render individual citations based on their type
import {formatPages} from "./formatPages";
import {formatAuthors} from "./formatAuthors";
import {BibEntry} from "./BibEntry";
import React from "react";

export function renderCitation (entry: BibEntry, index: number,  additionalname: string, start?: number): React.ReactNode {

    // Use the index as citation number
    let citationNumber = index +1;
    if(start){
        citationNumber += start -1;
    }
    const entryType = entry.entryType.toLowerCase(); // Convert to lowercase for consistent comparison
    const entryTags = entry.entryTags; // Adjust based on your data structure

    switch (entryType) {
        case "article":
            return (
                <li key={index} typeof="schema:ScholarlyArticle" role="doc-biblioentry" property="schema:citation" id={`desc-${citationNumber}${additionalname}`}>
                    {/* Citation number as comment */}
                    {/*<!-- Citation num ${citationNumber} --> */}
                    {formatAuthors(entryTags.AUTHOR || entryTags.EDITOR || "")}
                    &nbsp;<span property="schema:name">{entryTags.TITLE.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    &nbsp;<i property="schema:publisher" typeof="schema:Organization">{entryTags.JOURNAL}</i>
                    &nbsp;<b property="issueNumber" typeof="PublicationIssue">{entryTags.VOLUME}</b>
                    {formatPages(entryTags.PAGES) && <span>{formatPages(entryTags.PAGES)}</span>}
                    {entryTags.YEAR && (
                        <span>&nbsp;(<time property="schema:datePublished" datatype="xsd:gYear" dateTime={entryTags.YEAR}>{entryTags.YEAR}</time>).</span>
                    )}
                    {entryTags.DOI && (
                        <span>&nbsp;<a className="doi" href={`https://doi.org/${entryTags.DOI}`}>doi: {entryTags.DOI}</a></span>
                    )}
                </li>
            );

        case "book":
            return (
                <li key={index} typeof="schema:Book" role="doc-biblioentry" property="schema:citation" id={`desc-${citationNumber}`}>
                    {/* Render authors */}
                    {formatAuthors(entryTags.AUTHOR || entryTags.EDITOR || "")}
                    {/* Render title or booktitle */}
                    {entryTags.TITLE ? (
                        <span property="schema:name">&nbsp;{entryTags.TITLE.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    ) : entryTags.BOOKTITLE ? (
                        <span property="schema:name">&nbsp;{entryTags.BOOKTITLE.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    ) : (
                        console.warn(`No title or booktitle found for entry ${citationNumber}`)
                    )}
                    {/* Render publisher */}
                    {entryTags.PUBLISHER && (
                        <i property="schema:publisher" typeof="schema:Organization">
                            &nbsp;{entryTags.PUBLISHER}
                        </i>
                    )}
                    {/* Render year */}
                    {entryTags.YEAR && (
                        <span>
                &nbsp;(<time property="schema:datePublished" datatype="xsd:gYear" dateTime={entryTags.YEAR}>
                  {entryTags.YEAR}
                </time>).
              </span>
                    )}
                    {entryTags.ISBN && (
                        <span property="isbn">&nbsp;{entryTags.ISBN}</span>
                    )
                    }
                </li>
            );

        case "misc":
            return (
                <li key={index} typeof="schema:WebPage" role="doc-biblioentry" property="schema:citation" id={`desc-${citationNumber}`}>
                    {/* Render authors */}
                    {(entryTags.AUTHOR || entryTags.EDITOR || "")}
                    {/* Render title */}
                    {entryTags.TITLE && (
                        <span property="schema:name">.&nbsp;{entryTags.TITLE.replace(/[?!.]/g, '').replace(/\n/g, ' ').trim()}.</span>
                    )}
                    {/* Render howpublished */}
                    {entryTags.HOWPUBLISHED && (
                        <i property="schema:publisher" typeof="schema:Organization">&nbsp;{entryTags.HOWPUBLISHED}</i>
                    )}
                    {/* Render year */}
                    {entryTags.YEAR && (
                        <span>&nbsp;(<time property="schema:datePublished" datatype="xsd:gYear" dateTime={entryTags.YEAR}>{entryTags.YEAR}</time>).</span>
                    )}
                </li>
            );

        // Handle additional entry types here
        case "inproceedings":
            return (
                <li key={index}>
                    <span>{formatAuthors(entryTags.AUTHOR || "")}</span>&nbsp;
                    <span>{entryTags.TITLE}</span>. In <i>{entryTags.BOOKTITLE}</i>,&nbsp;
                    <b>{entryTags.editor}</b>, {entryTags.YEAR}.
                </li>
            );

        case "phdthesis":
            return (
                <li key={index}>
                    <span>{formatAuthors(entryTags.AUTHOR || "")}</span>&nbsp;
                    <span>{entryTags.TITLE}</span>, PhD thesis, {entryTags.SCHOOL}, {entryTags.YEAR}.
                </li>
            );

        default:
            console.warn(`Unknown entry type: ${entryType}`);
            return <li key={index}>Unknown entry type: {entryType}</li>;
    }
}