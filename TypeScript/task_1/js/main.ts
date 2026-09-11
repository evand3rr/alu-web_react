// Define the Teacher interface with the specified properties
interface Teacher {
    firstName: string;
    lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience: number;
    location: string;
    [key: string]: string | number | boolean;
}

// function to return the first letter of the firstName and the full lastName
function printTeacher(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}. ${lastName}`;
}

// Define the type for the printTeacher function
interface printTeacherFunction {
    (firstName: string, lastName: string): string;
    
}

// Define the StudentConstructor interface with the specified properties
interface StudentConstructor {
    firstName: string;
    lastName: string;
}

// Define the StudentClassInterface with the specified properties and methods
interface StudentClassInterface {
    firstName: string;
    lastName: string;
    workOnHomework(): string;
    displayName(): string
}

// Implement the StudentClass that adheres to the StudentClassInterface
class StudentClass implements StudentClassInterface {
    firstName: string;
    lastName: string;

    // Initialize the StudentClass with the provided firstName and lastName
    constructor({firstName, lastName }: StudentConstructor) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    workOnHomework(): string {
        return 'Currently working'
    }

    displayName(): string {
        return this.firstName;
    }
}
