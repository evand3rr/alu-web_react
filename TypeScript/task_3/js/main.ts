/// <reference path="./crud.d.ts"/>

import type {RowId, RowElement} from './interface';
// crud.js does not provide TypeScript declarations; its declarations are supplied by crud.d.ts.
// @ts-ignore
import * as CRUD from 'crud.js';

// Insert a new row
const row: RowElement = {
    firstName: 'Guillaume',
    lastName: 'Salva',
};

// Insert the new row into the database
const newRowID: RowId = CRUD.insertRow (row);

// Update the new row
const updatedRow: RowElement = {
    ...row,
    age: 23
}

// Update the row in the database
CRUD.updateRow (newRowID, updatedRow);
CRUD.deleteRow(newRowID);