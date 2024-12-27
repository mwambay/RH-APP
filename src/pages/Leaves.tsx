import { useEffect, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
        const data = await api.getCongeInfo();
        console.log('Données des congés récupérées:', data); // Debug
        setLeaves(data);
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
      const normalizedStatus = status.toLowerCase() as keyof typeof statusMap;
      const { type, text } = statusMap[normalizedStatus];
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
const navigate = useNavigate();

const handleNewRequest = () => {
  navigate('/new-leave-request');
};
 return (
  <div>
    <div className="flex justify-between items-center">
      <PageHeader
        title="Gestion des congés"
        description="Gérez les demandes de congés"
      />
      <button
        onClick={handleNewRequest}
        className="btn btn-primary"
      >
        Nouvelle Demande
      </button>
    </div>
    <div className="mt-6">
      <DataTable columns={columns} data={leaves} />
    </div>
  </div>
  );
}






