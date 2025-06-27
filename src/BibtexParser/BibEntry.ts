export interface BibEntry {
    type: string;
    TITLE?: string;
    AUTHOR?: string;
    journal?: string;
    volume?: string;
    pages?: string;
    year?: string | number;
    doi?: string;
    [key: string]: any;
}