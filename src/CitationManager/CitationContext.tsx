import { createContext } from "react";
import {Entry} from "@liliana-sanfilippo/bibtex-ts-parser";

export type CitationLinkContext = {
    links: string[];
    citations: Entry[];
    maintenanceMode: boolean;
};

    export const CitationContext = createContext<CitationLinkContext | null>(null);

