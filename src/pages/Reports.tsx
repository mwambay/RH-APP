import React from 'react';
import { BarChart2, PieChart, TrendingUp, Users } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Reports() {
  const reports = [
    {
      title: 'Effectifs par département',
      icon: Users,
      description: 'Répartition des employés par service',
    },
    {
      title: 'Analyse des congés',
      icon: PieChart,
      description: 'Statistiques sur les types de congés',
    },
    {
      title: 'Taux de présence',
      icon: TrendingUp,
      description: 'Évolution mensuelle des présences',
    },
    {
      title: 'Masse salariale',
      icon: BarChart2,
      description: 'Évolution des coûts salariaux',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Rapports"
        description="Consultez les statistiques et analyses RH"
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <report.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}