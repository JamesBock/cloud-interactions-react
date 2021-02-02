import { URL } from "url";

export interface IDrugInteraction {
    Severity: string;
    Description: string;
    tupList: [string, URL][];//TODO: See if TS is using these the same wasy as C#
}