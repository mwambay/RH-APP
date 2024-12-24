import React from 'react';
import { Clock } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';

export default function Attendance() {
  const attendance = [
    {
      id: '1',
      employee: 'Pierre Dubois',
      date: '2024-03-14',
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
    },
    // ... autres présences
  ];

  const columns = [
    { key: 'employee', label: 'Employé' },
    { key: 'date', label: 'Date' },
    { key: 'checkIn', label: 'Arrivée' },
    { key: 'checkOut', label: 'Départ' },
    {
      key: 'status',
      label: 'Statut',
      render: (status: string) => {
        const statusMap = {
          present: { type: 'success', text: 'Présent' },
          absent: { type: 'error', text: 'Absent' },
          late: { type: 'warning', text: 'En retard' },
        };
        const { type, text } = statusMap[status as keyof typeof statusMap];
        return <StatusBadge status={type as any} text={text} />;
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Suivi des présences"
        description="Consultez les présences et absences"
      />
      <div className="mt-6">
        <DataTable columns={columns} data={attendance} />
      </div>
    </div>
  );
}