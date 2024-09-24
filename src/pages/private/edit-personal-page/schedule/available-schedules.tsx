import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAppStore from '@/store';
import { fetchAvailableSlots } from '@/api/schedule';

const AvailableSchedules: React.FC = () => {
  const personal = useAppStore((state) => state.user);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const {
    data: availableSlots,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['availableSlots', personal?.id, selectedDate],
    queryFn: () => fetchAvailableSlots(personal?.id || '', selectedDate),
    enabled: !!selectedDate,
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetch();
  };

  if (isLoading) {
    return <div>Carregando agendamentos disponíveis...</div>;
  }

  if (isError) {
    return <div>Error ao carregar agendamentos.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Agendamentos disponíveis</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Selecione uma data</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded p-2"
        />
      </div>

      {/* Available Slots */}
      {availableSlots && availableSlots.length === 0 ? (
        <div>Não existe disponibilidades nesse dia.</div>
      ) : (
        <ul className="space-y-2">
          {availableSlots?.map((slot, index) => (
            <li key={index} className="border p-4 rounded">
              <div>
                <strong>Disponibilidade:</strong>{' '}
                {format(new Date(slot.start), 'HH:mm')} -{' '}
                {format(new Date(slot.end), 'HH:mm')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableSchedules;

