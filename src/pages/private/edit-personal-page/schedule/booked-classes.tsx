import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAppStore from '@/store';
import { fetchBookings } from '@/api/schedule';

const BookedClasses: React.FC = () => {
  const personal = useAppStore((state) => state.user);

  const { data: bookings, isLoading, isError } = useQuery({
    queryKey: ['bookings', personal?.id],
    queryFn: () => fetchBookings(personal?.id || ''),
    enabled: !!personal?.id,
  });

  if (isLoading) {
    return <div>Loading booked classes...</div>;
  }

  if (isError) {
    return <div>Error fetching booked classes.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Booked Classes</h2>
      {bookings && bookings.length === 0 ? (
        <div>No booked classes.</div>
      ) : (
        <ul className="space-y-2">
          {bookings?.map((booking) => (
            <li key={booking.id} className="border p-4 rounded">
              <div>
                <strong>Trainee:</strong> {booking.trainee.name}
              </div>
              <div>
                <strong>Date:</strong>{' '}
                {format(new Date(booking.startDatetime), 'yyyy-MM-dd')}
              </div>
              <div>
                <strong>Time:</strong>{' '}
                {format(new Date(booking.startDatetime), 'HH:mm')} -{' '}
                {format(new Date(booking.endDatetime), 'HH:mm')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedClasses;

