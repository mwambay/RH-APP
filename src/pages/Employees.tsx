import { useState, useEffect } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import EmployeeForm from '../components/employees/EmployeeForm';
import { Employee } from '../types';
import { api } from '../services/api';

export default function Employees() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);  // Initialisation de l'état pour les employés
  const [isLoading, setIsLoading] = useState(true); // Pour gérer le chargement des données
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs

  // Fonction pour récupérer les employés via l'API
  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployeInfo(); // Appel de l'API
      console.log('Réponse de l\'API:', response);  // Vérification de la réponse
  
      // Vérification si les données sont présentes et contiennent des employés
      if (Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setEmployees(response.data);  // Mise à jour de l'état avec les employés
        } else {
          setError('Aucun employé trouvé');  // Message d'erreur si aucun employé n'est trouvé
        }
      } else {
        setError('Les données des employés sont mal formatées.');  // Affichage d'une erreur détaillée
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des employés:', error);
      setError('Erreur lors de la récupération des employés');  // Affichage d'une erreur générique
    } finally {
      setIsLoading(false);  // Fin du chargement, qu'il y ait ou non une erreur
    }
  };
  
  // Utilisation de useEffect pour charger les données au montage du composant
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = (data: Partial<Employee>) => {
    console.log('Nouvel employé:', data);
    setIsAddModalOpen(false);
  };

  const handleEditEmployee = (data: Partial<Employee>) => {
    console.log('Mise à jour employé:', data);
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      console.log('Suppression employé:', employee);
    }
  };
  console
  // Définition des colonnes de la table
  console.log(employees)
  const columns = [
    { 
      key: 'fullName',
      label: 'Nom',
      render: (_: any, employee: Employee) => `${employee.nom}`  // Affichage du nom de l'employé
    },
    { key: 'email', label: 'Email', render: (_: any, employee: Employee) => employee.email },
    { key: 'department', label: 'Département', render: (_: any, employee: Employee) => employee.departement },
    { key: 'position', label: 'Poste', render: (_: any, employee: Employee) => employee.poste },
    { key: 'salaire', label: 'Salaire',  render: (_: any, employee: Employee) => employee.salaire},
    { key: 'type_contrat', label: 'Contrat',  render: (_: any, employee: Employee) => employee.contrat},

    {
      key: 'status',
      label: 'Statut',
      render: (_: any, employee: Employee) => (
        <StatusBadge
          status={employee.statut === 'Actif' ? 'success' : 'error'}  // Statut 'Actif' ou 'Inactif'
          text={employee.statut === 'Actif' ? 'Actif' : 'Inactif'}
        />
      ),
    },
  ];

  const actions = (employee: Employee) => (
    <div className="flex space-x-2">
      <button 
        className="p-1 text-blue-600 hover:text-blue-800"
        onClick={() => {
          setSelectedEmployee(employee);
          setIsEditModalOpen(true);
        }}
      >
        <Edit className="w-4 h-4" />
      </button>
      <button 
        className="p-1 text-red-600 hover:text-red-800"
        onClick={() => handleDeleteEmployee(employee)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Gestion des employés"
          description="Gérez les informations de vos employés"
        />
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un employé
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p>Chargement des données...</p>  // Affichage d'un message de chargement
        ) : error ? (
          <p className="text-red-500">{error}</p>  // Affichage de l'erreur s'il y en a
        ) : (
          <DataTable
            columns={columns}
            data={employees}  // Utilisation des données récupérées de l'API
            actions={actions}
          />
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un employé"
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEmployee(null);
        }}
        title="Modifier un employé"
      >
        <EmployeeForm
          employee={selectedEmployee || undefined}
          onSubmit={handleEditEmployee}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedEmployee(null);
          }}
        />
      </Modal>
    </div>
  );
}
