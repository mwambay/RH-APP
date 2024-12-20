import React from 'react';

type StatusType = 'success' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
}

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

export default function StatusBadge({ status, text }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {text}
    </span>
  );
}