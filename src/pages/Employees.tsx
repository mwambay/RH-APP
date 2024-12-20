import React, { useState } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import EmployeeForm from '../components/employees/EmployeeForm';
import { Employee } from '../types';

export default function Employees() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees = [
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      department: 'IT',
      position: 'Développeur Senior',
      status: 'active',
      salary: 45000,
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@example.com',
      department: 'RH',
      position: 'Responsable RH',
      status: 'active',
      salary: 48000,
    },
  ];

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

  const columns = [
    { 
      key: 'fullName',
      label: 'Nom',
      render: (_, employee: Employee) => `${employee.firstName} ${employee.lastName}`
    },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Département' },
    { key: 'position', label: 'Poste' },
    {
      key: 'status',
      label: 'Statut',
      render: (status: string) => (
        <StatusBadge
          status={status === 'active' ? 'success' : 'error'}
          text={status === 'active' ? 'Actif' : 'Inactif'}
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
        <DataTable
          columns={columns}
          data={employees}
          actions={actions}
        />
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