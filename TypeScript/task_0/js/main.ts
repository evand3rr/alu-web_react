// Define the Student interface with the specified properties
interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

// create two student objects
const student1 = {
    firstName: 'Alice',
    lastName: 'Smith',
    age: 20,
    location: 'Kimironko'
};

const student2 = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 23,
    location: 'Iowa'
};

// create an array of students
const studentsList: Student[] = [student1, student2];

// create table header row
const table = document.createElement('table');
table.border = '1';

// create table header row
const headerRow = document.createElement('tr');
const nameHeader = document.createElement('th');
nameHeader.textContent ='First Name';
const locationHeader = document.createElement('th');
locationHeader.textContent = 'Location';

headerRow.appendChild(nameHeader);
headerRow.appendChild(locationHeader);
table.appendChild(headerRow);

// append one row per student
studentsList.forEach((student) => {
    const row = document.createElement('tr');
    const firstNameCell = document.createElement('td');
    const locationCell = document.createElement('td');
    firstNameCell.textContent = student.firstName;
    locationCell.textContent = student.location;

    row.appendChild(firstNameCell);
    row.appendChild(locationCell);
    table.appendChild(row);
});

// Add table to the page
document.body.appendChild(table);

