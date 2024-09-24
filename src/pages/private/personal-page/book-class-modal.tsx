import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchAvailableSlots, createBooking } from '@/api/schedule';
import useAppStore from '@/store';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast.hook';

interface BookClassModalProps {
  personal_id: string;
  isOpen: boolean;
  onClose: () => void;
}

const BookClassModal: React.FC<BookClassModalProps> = ({ personal_id, isOpen, onClose }) => {
  const trainee = useAppStore((state) => state.client);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
  const { notify } = useToast();

  const {
    data: availableSlots,
    isLoading: isLoadingSlots,
    isError: isErrorSlots,
    refetch,
  } = useQuery({
    queryKey: ['availableSlots', personal_id, selectedDate],
    queryFn: () => fetchAvailableSlots(personal_id, selectedDate),
    enabled: isOpen,
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      notify('success', 'Agendamento confirmado!');
      onClose();
    },
    onError: (error: any) => {
      notify('error', 'Erro ao agendar aula! ');
      console.error(error.message);
    },
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetch();
  };

  const handleSlotSelect = (slot: { start: string; end: string }) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !trainee) return;

    const bookingData = {
      personal_id,
      trainee_id: trainee.id,
      startDatetime: selectedSlot.start,
    };

    bookingMutation.mutate(bookingData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar Aula</DialogTitle>
          <DialogDescription>
            Selecione uma data e horário para agendar sua aula.
          </DialogDescription>
        </DialogHeader>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Selecione a Data</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Available Slots */}
        {isLoadingSlots ? (
          <div>Carregando horários disponíveis...</div>
        ) : isErrorSlots ? (
          <div>Erro ao buscar horários disponíveis.</div>
        ) : availableSlots && availableSlots.length === 0 ? (
          <div>Não há horários disponíveis nesta data.</div>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {availableSlots?.map((slot: { start: string; end: string }, index: number) => (
              <li
                key={index}
                className={`border p-4 rounded cursor-pointer ${selectedSlot?.start === slot.start ? 'bg-blue-100' : ''
                  }`}
                onClick={() => handleSlotSelect(slot)}
              >
                <div>
                  <strong>Horário:</strong>{' '}
                  {format(new Date(slot.start), 'HH:mm')} -{' '}
                  {format(new Date(slot.end), 'HH:mm')}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Confirm Booking Button */}
        <DialogFooter>
          <button
            onClick={handleConfirmBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={bookingMutation.isPending || !selectedSlot}
          >
            {bookingMutation.isPending ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookClassModal;

