import { useEffect, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import LeaveForm from '../components/employees/leaveForm';
import { Leave } from '../types';
import Modal from '../components/common/Modal';

type StatusType = 'warning' | 'success' | 'error';

export default function Leaves() {
  const [leaves, setLeaves] = useState<LocalLeave[]>([]);

  const fetchLeaves = async () => {
    try {
      const data = await api.getCongeInfo();
      console.log('Données des congés récupérées:', data); // Debug
      setLeaves(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const getStatusBadge = (status: LocalLeave['status']) => {
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
      render: (status: LocalLeave['status']) => getStatusBadge(status),
    },
  ];
const navigate = useNavigate();

const handleNewRequest = (data:Partial<LocalLeave>) => {
  console.log('Nouvelle demande de congé:', data);
  setIsAddModalOpen(false);
  fetchLeaves();
};
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

 return (
  <div>
    <div className="flex justify-between items-center">
        <PageHeader title="Gestion des employés" description="Gérez les informations de vos employés" />
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          Nouvelle demande
        </button>
      </div>
    <div className="mt-6">
      <DataTable columns={columns} data={leaves} />
    </div>
    <Modal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      title="Nouvelle demande de congé">  
      <LeaveForm onCancel={() => setIsAddModalOpen(false)} 
        onSubmit={(leave: Partial<Leave>) => handleNewRequest(leave)}/>
      </Modal>
  </div>  
  );
}






