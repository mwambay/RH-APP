import { Calendar as CalendarIcon } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {api} from '../services/api';

type StatusType = 'warning' | 'success' | 'error';

interface Leave {
  full_name: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Leaves() {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.getCongeInfo();
        console.log('Données récupérées:', response.data); // Debug
        setLeaves(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Erreur lors de la récupération des congés:', error);
      }
    };

    fetchLeaves();
  }, []);

  const getStatusBadge = (status: Leave['status']) => {
    const statusMap = {
      pending: { type: 'warning', text: 'En attente' },
      approved: { type: 'success', text: 'Approuvé' },
      rejected: { type: 'error', text: 'Refusé' },
    };
    const { type, text } = statusMap[status];
    return <StatusBadge status={type as StatusType} text={text} />;
  };

  const columns = [
    { key: 'full_name', label: 'Employé' },
    { key: 'leave_type', label: 'Type' },
    { key: 'start_date', label: 'Date de début' },
    { key: 'end_date', label: 'Date de fin' },
    {
      key: 'status',
      label: 'Statut',
      render: (status: Leave['status']) => getStatusBadge(status),
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
