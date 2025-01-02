import React from 'react';
import { Leave } from '../../types';
import { api } from '../../services/api';

interface LeaveFormProps {
    leave?: Leave;
    onSubmit: (data: Partial<Leave>) => void;
    onCancel: () => void;
}

export default function LeaveForm({ leave, onSubmit, onCancel }: LeaveFormProps) {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data: Partial<Leave> = {
            employeeId: formData.get('email') as string,
            type: formData.get('type') as 'vacation' | 'sick' | 'other',
            startDate: formData.get('dateStart') as string,
            endDate: formData.get('dateEnd') as string,
            status: formData.get('statut') as 'pending' | 'approved' | 'rejected',
        };

        try {
            if (leave) {
                // Si une demande de congé est fournie, mettre à jour la demande existante
                await api.postUpdateConge({ id: leave.id, data });
                
            } else {
                // Ajouter une nouvelle demande de congé si aucune demande n'est fournie
                await api.postDemandeConge(data);
            }
            onSubmit(data);
        } catch (error) {
            console.error(
                leave
                    ? 'Erreur lors de la mise à jour de la demande de congé:'
                    : 'Erreur lors de l\'ajout de la demande de congé:',
                error
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={leave?.employeeId || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Type de congé</label>
                <select
                    name="type"
                    defaultValue={leave?.type || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                >
                    <option value="">Sélectionner le type de congé</option>
                    <option value="sick">Sick</option>
                    <option value="vacation">Vacation</option>
                    <option value="marriage">Marriage</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Date de début</label>
                <input
                    type="date"
                    name="dateStart"
                    defaultValue={leave?.startDate || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Date de fin</label>
                <input
                    type="date"
                    name="dateEnd"
                    defaultValue={leave?.endDate || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <select
                    name="statut"
                    defaultValue={leave?.status || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                >
                    <option value="">Sélectionner le statut</option>
                    <option value="En attente">En attente</option>
                    <option value="Approuvé">Approuvé</option>
                    <option value="Rejeté">Rejeté</option>
                </select>
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
                    {leave ? 'Mettre à jour' : 'Ajouter'}
                </button>
            </div>
        </form>
    );
}
