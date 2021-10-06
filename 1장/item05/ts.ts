let age: number;
age = "12";
age = "12" as any;
age += 1;

function calculateAge(birthDate: Date): number {
  // ...
}

let birthDate: any = "1990-01-19";
calculateAge(birthDate);
