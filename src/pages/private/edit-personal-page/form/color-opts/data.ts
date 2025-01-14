export const colors = [
  {
    id: 'red',
    hex: '#EF4444',
  },
  {
    id: 'yellow',
    hex: '#F59E0B',
  },
  {
    id: 'green',
    hex: '#10B981',
  },
  {
    id: 'blue',
    hex: '#3B82F6',
  },
  {
    id: 'indigo',
    hex: '#6366F1',
  },
  {
    id: 'purple',
    hex: '#8B5CF6',
  },
  {
    id: 'pink',
    hex: '#f7d2f6',
  },
];

export const colorsDarker = [
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#6366F1',
  '#8B5CF6',
];

export const isColorDarker = (color: string) => colorsDarker.includes(color);
