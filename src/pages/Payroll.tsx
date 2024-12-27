import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import { api } from '../services/api';

interface PayrollData {
  employee: string;
  period: string;
  baseSalary: string;
  bonus: string;
  total: string;
}

export default function Payroll() {
  const [payroll, setPayroll] = useState<PayrollData[]>([]);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await api.getPayInfo();
        if (Array.isArray(response)) {
          const mappedResponse = response.map((item: any) => ({
            employee: item.employee_name,
            period: new Date(item.pay_period).toLocaleDateString(),
            baseSalary: item.base_salary,
            bonus: item.total_benefit,
            total: item.total_pay,
          }));
          setPayroll(mappedResponse);
          console.log(response);
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      }
    };

    fetchPayroll();
  }, []);

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

  const actions = () => (
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
