export class Employee {
    EmployeeId: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Salary: number;
    DOB: Date;
    Gender: number;
    Hobbies: string;
    DeptId: number;
    DepartmentName: string;
    DesgnId: number;
    DesignationName: string;
  
    constructor(
      EmployeeId: number,
      FirstName: string,
      MiddleName: string,
      LastName: string,
      Salary: number,
      DOB: Date,
      Gender: number,
      Hobbies: string,
      DeptId: number,
      DepartmentName: string,
      DesgnId: number,
      DesignationName: string
    ) {
          this.EmployeeId = EmployeeId;
          this.FirstName = FirstName;
          this.MiddleName = MiddleName;
          this.LastName = LastName;
          this.Salary = Salary;
          this.DOB = DOB;
          this.Gender = Gender;
          this.Hobbies = Hobbies;
          this.DeptId = DeptId;
          this.DepartmentName = DepartmentName;
          this.DesgnId = DesgnId;
          this.DesignationName = DesignationName;
    }
  }
  