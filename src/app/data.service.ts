import { Injectable } from '@angular/core';

export interface Contract {
  id: number;
  title: string;
  vendor: string;
  startDate: Date;
  endDate: Date;
  ceiling: number;
  spent: number;
  status: 'Active' | 'Expiring' | 'Expired';
}

export interface KpiData {
  totalCeiling: number;
  totalSpent: number;
  remaining: number;
}

export interface MonthlySpend {
  month: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private contracts: Contract[] = [
    {
      id: 1,
      title: 'Software Licensing Agreement',
      vendor: 'TechCorp Solutions',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2025-01-14'),
      ceiling: 250000,
      spent: 187500,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Cloud Infrastructure Services',
      vendor: 'CloudVendor Inc',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-02-28'),
      ceiling: 180000,
      spent: 145000,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Consulting Services',
      vendor: 'Expert Consultants LLC',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-01-31'),
      ceiling: 75000,
      spent: 68000,
      status: 'Expiring',
    },
    {
      id: 4,
      title: 'Marketing Platform',
      vendor: 'Marketing Solutions',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-03-15'),
      ceiling: 120000,
      spent: 95000,
      status: 'Active',
    },
    {
      id: 5,
      title: 'Security Audit Services',
      vendor: 'SecureIT Partners',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2025-01-15'),
      ceiling: 45000,
      spent: 42000,
      status: 'Expiring',
    },
  ];

  private monthlySpendData: MonthlySpend[] = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 38000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 47000 },
    { month: 'Jun', amount: 55000 },
    { month: 'Jul', amount: 43000 },
    { month: 'Aug', amount: 58000 },
    { month: 'Sep', amount: 49000 },
    { month: 'Oct', amount: 52000 },
    { month: 'Nov', amount: 46000 },
    { month: 'Dec', amount: 51000 },
  ];

  getKpiData(): KpiData {
    const totalCeiling = this.contracts.reduce((sum, contract) => sum + contract.ceiling, 0);
    const totalSpent = this.contracts.reduce((sum, contract) => sum + contract.spent, 0);
    const remaining = totalCeiling - totalSpent;

    return {
      totalCeiling,
      totalSpent,
      remaining,
    };
  }

  getMonthlySpendData(): MonthlySpend[] {
    return [...this.monthlySpendData];
  }

  getExpiringContracts(): Contract[] {
    return this.contracts.filter((contract) => contract.status === 'Expiring');
  }

  getAllContracts(): Contract[] {
    return [...this.contracts];
  }
}
