import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';

export default function Leaves() {
  const leaves = [
    {
      id: '1',
      employee: 'Marie Martin',
      type: 'Congé annuel',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      status: 'pending',
    },
    // ... autres congés
  ];

  const columns = [
    { key: 'employee', label: 'Employé' },
    { key: 'type', label: 'Type' },
    { key: 'startDate', label: 'Date de début' },
    { key: 'endDate', label: 'Date de fin' },
    {
      key: 'status',
      label: 'Statut',
      render: (status: string) => {
        const statusMap = {
          pending: { type: 'warning', text: 'En attente' },
          approved: { type: 'success', text: 'Approuvé' },
          rejected: { type: 'error', text: 'Refusé' },
        };
        const { type, text } = statusMap[status as keyof typeof statusMap];
        return <StatusBadge status={type as any} text={text} />;
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Gestion des congés"
          description="Gérez les demandes de congés"
        />
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Nouvelle demande
        </button>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={leaves} />
      </div>
    </div>
  );
}