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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployeInfo();
      console.log(response);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setEmployees(response.data);
      } else {
        setError('Aucun employé trouvé.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
      setError('Erreur lors de la récupération des employés.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = (data: Partial<Employee>) => {
    console.log('Nouvel employé:', data);
    setIsAddModalOpen(false);
    fetchEmployees();
  };

  const handleEditEmployee = (data: Partial<Employee>) => {
    console.log('Mise à jour employé:', data);
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
    fetchEmployees();
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployee) {
      try {
        await api.deleteEmploye({ id: selectedEmployee.id });
        fetchEmployees();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
      } finally {
        setIsConfirmModalOpen(false);
        setSelectedEmployee(null);
      }
    }
  };

  const columns = [
    {
      key: 'fullName',
      label: 'Nom',
      render: (_: any, employee: Employee) => `${employee.nom} ${employee.lastName}`,
    },
    { key: 'email', label: 'Email', render: (_: any, employee: Employee) => employee.email },
    { key: 'department', label: 'Département', render: (_: any, employee: Employee) => employee.departement },
    { key: 'position', label: 'Poste', render: (_: any, employee: Employee) => employee.poste },
    { key: 'salaire', label: 'Salaire', render: (_: any, employee: Employee) => employee.salaire },
    { key: 'type_contrat', label: 'Contrat', render: (_: any, employee: Employee) => employee.contrat },
    {
      key: 'status',
      label: 'Statut',
      render: (_: any, employee: Employee) => (
        <StatusBadge
          status={employee.statut === 'Actif' ? 'success' : 'error'}
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
        onClick={() => {
          setSelectedEmployee(employee);
          setIsConfirmModalOpen(true);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader title="Gestion des employés" description="Gérez les informations de vos employés" />
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
          <p>Chargement des données...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DataTable columns={columns} data={employees} actions={actions} />
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

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmation"
      >
        <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleConfirmDelete}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
