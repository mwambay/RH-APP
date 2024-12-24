import React from 'react';
import { DollarSign, Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';

export default function Payroll() {
  const payroll = [
    {
      id: '1',
      employee: 'Sophie Martin',
      period: 'Mars 2024',
      baseSalary: '45000',
      bonus: '1000',
      total: '46000',
    },
    // ... autres fiches de paie
  ];

  const columns = [
    { key: 'employee', label: 'Employé' },
    { key: 'period', label: 'Période' },
    {
      key: 'baseSalary',
      label: 'Salaire de base',
      render: (value: string) => `${value} €`,
    },
    {
      key: 'bonus',
      label: 'Prime',
      render: (value: string) => `${value} €`,
    },
    {
      key: 'total',
      label: 'Total',
      render: (value: string) => `${value} €`,
    },
  ];

  const actions = (item: any) => (
    <button className="flex items-center text-blue-600 hover:text-blue-800">
      <Download className="w-4 h-4 mr-1" />
      Fiche de paie
    </button>
  );

  return (
    <div>
      <PageHeader
        title="Gestion des paies"
        description="Gérez les salaires et les fiches de paie"
      />
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={payroll}
          actions={actions}
        />
      </div>
    </div>
  );
}