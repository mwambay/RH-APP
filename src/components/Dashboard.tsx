import React from 'react';
import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard() {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [duree, setDuree] = React.useState(0)
  const [nombreEmploye, setNombreEmploye] = React.useState(0)
  const [congesAttente, setCongesAttente] = React.useState(0)
  const [tauxPresence, setTauxPresence] = React.useState(0)
  const [presents, setPresents] = React.useState(0)

  const fetchDashboardInfo = async () => {
    const response = await api.getDashBordInfo();
    setNombreEmploye(response.employe)
    setCongesAttente(response.conges)
    setPresents(response.present)
    setTauxPresence(response.taux)
  }
  React.useEffect(() => {
    fetchDashboardInfo();
  }, []);


  const handleStartBot = async () => {
    setIsLoading(true);
    const response = await api.getDashBordInfo();
    setTimeout(() => setIsLoading(false), 2000);
    setNombreEmploye(response.employe)
    setCongesAttente(response.conges)
    setPresents(response.present)
    setTauxPresence(response.taux)
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div key="Employés Total" className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`bg-blue-500 p-3 rounded-lg`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Employés Total</p>
                  <p className="text-2xl font-semibold text-gray-900">{nombreEmploye}</p>
                </div>
          </div>
        </div>
        
        <div key="Congés en attente" className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`bg-blue-500 p-3 rounded-lg`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Congés en attente</p>
                  <p className="text-2xl font-semibold text-gray-900">{congesAttente}</p>
                </div>
              </div>
        </div>
        <div key="Présents aujourd'hui" className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`bg-blue-500 p-3 rounded-lg`}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Présents aujourd'hui</p>
                  <p className="text-2xl font-semibold text-gray-900">{presents}</p>
                </div>
              </div>
        </div>
        <div key="Taux de présence" className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`bg-blue-500 p-3 rounded-lg`}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Taux de présence</p>
                  <p className="text-2xl font-semibold text-gray-900">{tauxPresence} %</p>
                </div>
              </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Dernières demandes de congés</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Marie Martin</p>
                  <p className="text-sm text-gray-600">Congé annuel - 5 jours</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  En attente
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
        {/* Ajoutez votre contenu ici */}
          <button onClick={handleStartBot} style={buttonStyle}>
            {isLoading ? 'Actualisation...' : 'Actualiser'}
            </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm">Nouveau document ajouté par <span className="font-medium">Pierre Dubois</span></p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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