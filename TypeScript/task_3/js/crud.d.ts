import {RowId, RowElement} from "./interface";

// TypeScript declarations for the CRUD functions
declare module 'crud.js' {
    export function insertRow(row: RowElement): RowId;
    export function updateRow(rowId: RowId, row: RowElement): RowId;
    export function deleteRow(rowId: RowId, row: RowElement): RowElement;

}

