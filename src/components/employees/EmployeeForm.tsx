import React, { useState, useEffect } from 'react';
import { Employee } from '../../types';
import { api } from '../../services/api';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Partial<Employee>) => void;
  onCancel: () => void;
}

export default function EmployeeForm({ employee, onSubmit, onCancel }: EmployeeFormProps) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.getDepartements();
        setDepartments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des départements:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit  = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("kkkks")
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: Partial<Employee> = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      department: formData.get('department') as string,
      salary: Number(formData.get('salary')),
      
    };
    //onSubmit(data);

    //await api.addEmployee(data);
    try {
      api.addEmployee(data);
      onSubmit(data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'employé:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="firstName"
            defaultValue={employee?.firstName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="lastName"
            defaultValue={employee?.lastName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={employee?.email}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Département</label>
        <select
          name="contrat"
          defaultValue={employee?.department}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionner le type de contrat</option>
          <option value="IT">IT</option>
          <option value="RH">RH</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700">Poste</label>
        <input
          type="text"
          name="position"
          defaultValue={employee?.position}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Département</label>
        <select
          name="department"
          defaultValue={employee?.department}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionner un département</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.nom}>
              {dept.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Salaire</label>
        <input
          type="number"
          name="salary"
          defaultValue={employee?.salary}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {employee ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}