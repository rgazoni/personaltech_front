import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAppStore from '@/store';
import { Checkbox } from '@/components/ui/checkbox';
import { createAvailabilityRule } from '@/api/schedule';
import { AvailabilityRule } from './types/availabilityRule';

const daysOfWeekMap = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda', value: 1 },
  { label: 'Terça', value: 2 },
  { label: 'Quarta', value: 3 },
  { label: 'Quinta', value: 4 },
  { label: 'Sexta', value: 5 },
  { label: 'Sábado', value: 6 },
];

const AvailabilitySettings: React.FC = () => {
  const personal = useAppStore((state) => state.user);
  const queryClient = useQueryClient();

  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const mutation = useMutation({
    mutationFn: createAvailabilityRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availabilityRules', personal?.id] });
    },
  });

  const handleDaySelection = (dayValue: number) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(dayValue)
        ? prevDays.filter((day) => day !== dayValue)
        : [...prevDays, dayValue]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!personal) return;

    // Format times to 'HH:MM:SS'
    const formattedStartTime = `${startTime}:00`;
    const formattedEndTime = `${endTime}:00`;

    const availabilityRule: AvailabilityRule = {
      personal_id: personal.id,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      daysOfWeek: selectedDays,
    };

    mutation.mutate(availabilityRule);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Ajuste suas disponibilidades durante a semana</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Days of the Week Selection */}
        <div>
          <label className="block font-medium mb-2">Selecione os dias da semana:</label>
          <div className="flex flex-wrap">
            {daysOfWeekMap.map((day) => (
              <div key={day.value} className="mr-4 mb-2">
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={selectedDays.includes(day.value)}
                    onCheckedChange={() => handleDaySelection(day.value)}
                  />
                  <span className="ml-2">{day.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Start Time */}
        <div>
          <label className="block font-medium mb-2">Hora de início</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block font-medium mb-2">Fim do expediente</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Salvando...' : 'Salvar disponibilidade'}
        </button>

        {/* Success/Error Messages */}
        {mutation.isError && (
          <div className="text-red-500 mt-2">Error: {(mutation.error as Error).message}</div>
        )}
        {mutation.isSuccess && (
          <div className="text-green-500 mt-2">Disponibilidade salva com sucesso!</div>
        )}
      </form>
    </div>
  );
};

export default AvailabilitySettings;

