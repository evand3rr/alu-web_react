// Define the DirectorInterface and TeacherInterface
interface DirectorInterface {
    workFromHome(): string;
    getCoffeeBreak(): string;
    workDirectorTasks(): string;
}

interface TeacherInterface {
    workFromHome(): string;
    getCoffeeBreak(): string;
    workTeacherTasks(): string;
}

// Implement the Director class that adheres to the DirectorInterface
class Director implements DirectorInterface {
    workFromHome(): string {
        return 'Working from home';
    }
    getCoffeeBreak(): string {
        return 'Getting a coffee break';
    }
    workDirectorTasks(): string {
        return 'Getting to director tasks';
    }

}

// Implement the Teacher class that adheres to the TeacherInterface
class Teacher implements TeacherInterface {
    workFromHome(): string {
        return 'Cannot work from home';
    }
    getCoffeeBreak(): string {
        return 'Cannot catch a break';
    }
    workTeacherTasks(): string {
        return 'Getting to work';
    }
}

// Create an employee based on their salary
function createEmpployee(salary: number | string): Director | Teacher {
    if (typeof salary === 'number' && salary < 500) {
        return new Teacher();
    } else {
        return new Director();
    }
    }

    // function to check if the employee is a Director
function isDirector(employee: DirectorInterface | TeacherInterface): employee is DirectorInterface {
    return employee instanceof Director;
}

// function to execute work based on the employee type
function executeWork(employee: DirectorInterface | TeacherInterface): string {
    if (isDirector(employee)) {
        return employee.workDirectorTasks();
    } else {
        return employee.workTeacherTasks();
    }
}

// string literal type for subjects
type Subjects = "Math" | "History";

// function that returns a string according to the subject
function teachClass(todayClass: Subjects): string {
    if (todayClass === 'Math') {
        return 'Teaching Math'
    } else {
        return 'Teaching History'
    }
}