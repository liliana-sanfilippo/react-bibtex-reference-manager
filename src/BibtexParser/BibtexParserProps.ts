export interface BibtexParserProps {
    bibtexSources: string[]; // Accept an array of BibTeX strings
    special?: string,
    start?: number
}