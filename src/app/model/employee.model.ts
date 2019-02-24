export class Employee {
    id: number;
    name: string;
    gender: string;
    email?: string; /* ? indicates that the value for this variable is optional */
    alternateEmail?: string;
    phoneNumber?: number;
    contactPreference: string;
    dateOfBirth: Date;
    department: number;
    education: number;
    // password: string;
    // confirmPassword: string;
    isActive: boolean;
    photoPath?: string;
}
