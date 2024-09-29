import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAppStore from '@/store';
import { Booking, deleteBooking, fetchBookings } from '@/api/schedule';
import { AvatarProfileImg } from '@/components/common/avatar-profile-img';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast.hook';

const BookedClasses: React.FC = () => {
  const personal = useAppStore((state) => state.user);
  const navigate = useNavigate();
  const { notify } = useToast();

  const { data: bookings, isLoading, isError, refetch } = useQuery({
    queryKey: ['bookings', personal?.id],
    queryFn: () => fetchBookings(personal?.id || ''),
    enabled: !!personal?.id,
  });

  const mutateDeleteBooking = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      console.log('Booking deleted');
      refetch();
    }
  })

  if (isLoading) {
    return <div>Loading booked classes...</div>;
  }

  if (isError) {
    return <div>Error fetching booked classes.</div>;
  }

  const handleChat = (booking: Booking) => {
    navigate('/message?id=' + booking.trainee.uid_chat)
  }
  const handleCancel = (booking: Booking) => {
    mutateDeleteBooking.mutate({
      booking_id: booking.id,
      requested_by: 'personal'
    });
    notify('success', 'Aula cancelada');
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Suas aulas agendadas</h2>
      {bookings && bookings.length === 0 ? (
        <div>Nenhuma aula agendada</div>
      ) : (
        <ul className="space-y-2">
          {bookings?.map((booking) => {
            if (booking.startDatetime < new Date().toISOString()) {
              return null;
            }
            return (<li key={booking.id} className="border p-4 rounded">
              <div className='space-y-2'>
                <div className='flex gap-2 items-center'>
                  <AvatarProfileImg src={booking.trainee.avatar} alt='Foto do usuário' size={64} />
                  <div>
                    <strong>Aluno:</strong> {booking.trainee.full_name}
                    <div>
                      <strong>Data:</strong>{' '}
                      {format(new Date(booking.startDatetime), 'dd/MM/yyyy')}
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-2'>
                  <div>
                    <strong>Estado:</strong>{' '}
                    {booking.trainee.state}
                  </div>
                  <div>
                    <strong>Cidade:</strong>{' '}
                    {booking.trainee.city}
                  </div>
                  <div>
                    <strong>Horário:</strong>{' '}
                    {format(new Date(booking.startDatetime), 'HH:mm')} -{' '}
                    {format(new Date(booking.endDatetime), 'HH:mm')}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Button variant="outline" onClick={() => handleCancel(booking)} size='sm'>Cancelar</Button>
                  <Button onClick={() => handleChat(booking)} size='sm'>Chat</Button>
                </div>
              </div>
            </li>)
          })}
        </ul>
      )}
    </div>
  );
};

export default BookedClasses;

