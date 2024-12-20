import React from 'react';
import { FileText, Upload } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';

export default function Documents() {
  const documents = [
    {
      id: '1',
      name: 'Contrat de travail',
      type: 'PDF',
      uploadedBy: 'Admin RH',
      uploadDate: '2024-03-14',
    },
    // ... autres documents
  ];

  const columns = [
    { key: 'name', label: 'Nom du document' },
    { key: 'type', label: 'Type' },
    { key: 'uploadedBy', label: 'Ajouté par' },
    { key: 'uploadDate', label: 'Date d\'ajout' },
  ];

  const actions = (document: any) => (
    <button className="flex items-center text-blue-600 hover:text-blue-800">
      <FileText className="w-4 h-4 mr-1" />
      Télécharger
    </button>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Documents"
          description="Gérez les documents RH"
        />
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Ajouter un document
        </button>
      </div>
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={documents}
          actions={actions}
        />
      </div>
    </div>
  );
}