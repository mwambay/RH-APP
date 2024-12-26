import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import { api } from '../services/api';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleStartBot = async () => {
    setIsLoading(true);
    fetchPresences();
    setTimeout(() => setIsLoading(false), 2000);

  };

  const fetchPresences = async () => {
    try {
      const response = await api.getPresences(); // Récupère les données de l'API
      console.log('Données reçues:', response); // Vérifiez la structure exacte
      setAttendance(response.data); // Accède au tableau des présences via `data`
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des présences:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresences();
  }, []);

  const columns = [
    { key: 'employee', label: 'Employé' },
    { key: 'arrival_time', label: 'Arrivée' },
    { key: 'departure_time', label: 'Départ' },
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
              <div>
        {/* Ajoutez votre contenu ici */}
          <button onClick={handleStartBot} style={buttonStyle}>
            {isLoading ? 'Actualisation...' : 'Actualiser'}
            </button>
        </div>
      <div className="mt-6">
        {loading ? (
          <p>Chargement des données...</p>
        ) : (
          <DataTable columns={columns} data={attendance} />
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#3f51b5',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};