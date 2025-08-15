import React, { useState, useEffect } from "react";
import {renderCitation} from "./renderCitations";
import {BibtexParserProps} from "./BibtexParserProps";
import {Entry, parseToEntry} from "@liliana-sanfilippo/bibtex-ts-parser";




export const BibtexParser: React.FC<BibtexParserProps> = ({ bibtexSources , special, start}) => {
    const [parsedEntries, setParsedEntries] = useState<Entry[]>([]);
    console.log("Mounting");
    // Parse BibTeX on component mount or when sources change
    useEffect(() => {
        try {
            const allEntries: Entry[] = [];
            console.log("Now for each entrie", bibtexSources);
            bibtexSources.forEach((bibtex) => {
                // console.log(`Parsing BibTeX entry #${index + 1}: `, bibtex);
                const parsed = parseToEntry(bibtex);
                console.log("parsed " + parsed[0].id);
                // console.log(`Parsed entry: `, parsed);
                allEntries.push(...parsed);
            });
            setParsedEntries(allEntries);
            allEntries.forEach(entry => console.log(entry.id));
            //console.log("All parsed entries: ", allEntries);
        } catch (error) {
            console.error("Error parsing BibTeX: ", error);
            alert("An error occurred while parsing the BibTeX entries. Please check the format." + bibtexSources);
        }
    }, [bibtexSources]);


    let additionalname = "";
    if (special) {
        additionalname = `#${special}`;
    }
    let startnumber = 1;
    if(start) {
        startnumber = start;
    }
    return (
        <div>
            {parsedEntries.length === 0 ? (
                <p>No citations available.</p>
            ) : (
                <ol start={startnumber}>
                    {parsedEntries.map((entry, index) => renderCitation(entry, index, additionalname))}
                </ol>
            )}
        </div>
    );
};

