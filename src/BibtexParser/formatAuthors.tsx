// Helper function to render AUTHORS
export function formatAuthors(authors: string): string {
    //console.log("Original input:", authors);

    // Bereinigen des Eingabestrings und Ersetzen von "and" durch "|"
    const cleanedAuthors = authors
        .replace(/\s*and\s*/g, "|") // "and" durch "|" ersetzen
        .replace(/\{|\}/g, "")      // geschweifte Klammern entfernen
        .trim();

    //console.log("Cleaned authors string:", cleanedAuthors);

    // Autoren in ein Array aufteilen
    const authorList = cleanedAuthors.split("|").map(author => author.trim());
    //console.log("Split author list:", authorList);

    // Maximale Anzahl der anzuzeigenden Autoren
    const maxAuthors = 7;

    // Formatiere jeden Autor
    const formattedAuthors = authorList.map((author, _index) => {
        //console.log(`Processing author #${index + 1}:`, author);

        // Nachname und Vornamen aufteilen
        const [last, firstNames] = author.includes(",") ?
            author.split(",").map(part => part.trim()) :
            ['', author]; // Wenn kein Komma vorhanden ist, wird der gesamte Name als Vorname behandelt

        // console.log(`Last name: "${last}", First names: "${firstNames}"`);

        // Initialen für Vornamen erstellen
        const initials = firstNames.split(' ').map(n => n[0] + '.').join(' ');
        //console.log(`Initials for "${firstNames}": "${initials}"`);

        return `${last}, ${initials}`.trim(); // Rückgabe des formatierten Namens

    });

    //console.log("Formatted authors before adding et al.:", formattedAuthors);

    // Kombiniere die formatierten Autoren mit korrekter Interpunktion
    return formattedAuthors.slice(0, maxAuthors).join('; ') +
        (formattedAuthors.length > maxAuthors ? ' et al.' : '');

};
