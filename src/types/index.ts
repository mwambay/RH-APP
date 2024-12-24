export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
}

export interface Leave {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'hr' | 'employee';
  employeeId?: string;
}