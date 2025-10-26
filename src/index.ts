// Приклад використання базових типів TypeScript

// Базові типи
let userName: string = "Іван";
let userAge: number = 25;
let isActive: boolean = true;

// Функція з типізацією параметрів та повернення
function greetUser(name: string, age: number, active: boolean): string {
    if (active) {
        return `Привіт, ${name}! Вам ${age} років і ви активний користувач.`;
    } else {
        return `Привіт, ${name}! Вам ${age} років.`;
    }
}

// Використання функції
const greeting: string = greetUser(userName, userAge, isActive);
console.log(greeting);

// Масиви з типізацією
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Анна", "Петро", "Марія"];

console.log("Числа:", numbers);
console.log("Імена:", names);

// Об'єкт з типізацією
interface User {
    id: number;
    name: string;
    email: string;
    isVerified: boolean;
}

const user: User = {
    id: 1,
    name: "Олексій",
    email: "oleksiy@example.com",
    isVerified: true
};

console.log("Користувач:", user);

// Union типи
let id: string | number = 123;
id = "abc123";
console.log("ID:", id);

// Функція з union типами
function processId(input: string | number): string {
    if (typeof input === "string") {
        return `Строковий ID: ${input.toUpperCase()}`;
    } else {
        return `Числовий ID: ${input.toString()}`;
    }
}

console.log(processId(456));
console.log(processId("xyz789"));
