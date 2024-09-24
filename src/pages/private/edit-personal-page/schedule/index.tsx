import React, { useEffect } from 'react';
import AvailabilitySettings from './availability-settings';
import AvailableSchedules from './available-schedules';
import BookedClasses from './booked-classes';
import NextClass from './next-class';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { schedulePersonalPreference } from '@/api/user';
import useAppStore from '@/store';

const Schedule: React.FC = () => {
  const personal = useAppStore((state) => state.user);
  const [useSchedule, setUseSchedule] = React.useState(personal.scheduling_system);

  const mutateSchedule = useMutation({
    mutationFn: () => schedulePersonalPreference(personal.id, useSchedule),
    mutationKey: ['schedule'],
  });

  const handleScheduleSelection = () => {
    mutateSchedule.mutate();
  }

  useEffect(() => {
    if (useSchedule) {
      handleScheduleSelection();
    }
  }, [useSchedule]);


  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4 pb-5">
        <h1 className="text-2xl font-bold">Agendamento</h1>
        <p className='text-muted'>Os agendamentos são focados para treinadores que fazem aulas particulares com seus alunos. Caso você seja um caso, você pode configurar sua disponibilidade e seus alunos poderão agendar aulas com você.</p>
      </div>
      <div>
        <h3 className='font-bold'>Faz sentido para você usar o agendamento?</h3>
        <p className="text-muted pb-2">Caso você use, na sua página principal, terá um botão de agendamento.</p>
        <RadioGroup className='flex gap-10 pb-5' onValueChange={(value) => setUseSchedule(value)} defaultValue={useSchedule}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="Yes" />
            <Label htmlFor="Yes" className='font-light'>Sim, quero usar o agendamento</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="No" />
            <Label htmlFor="No" className='font-light'>Não, não quero usar o agendamento</Label>
          </div>
        </RadioGroup>
      </div>
      {/* Sections */}
      {useSchedule === 'Yes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AvailabilitySettings />
            <AvailableSchedules />
          </div>

          {/* Right Column */}
          <div>
            <NextClass />
            <BookedClasses />
          </div>
        </div>
      )}
    </div >
  );
};

export default Schedule;

