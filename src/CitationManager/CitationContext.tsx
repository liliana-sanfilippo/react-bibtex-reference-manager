import { createContext } from "react";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";

export type CitationLinkContext = {
    links: string[];
    citations: Entry[];
    maintenanceMode: boolean;
    maintenanceMessages?: {title: string, message: string}[]
};

    export const CitationContext = createContext<CitationLinkContext | null>(null);

