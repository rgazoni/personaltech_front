import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isAfter, intervalToDuration, formatDuration } from 'date-fns';
import { pt } from 'date-fns/locale'; // Import Portuguese locale
import useAppStore from '@/store';
import { Booking, fetchBookings } from '@/api/schedule';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/utils/enums';

const NextClass: React.FC = () => {
  const personal = useAppStore((state) => state.user);
  const navigate = useNavigate();

  // State to hold the next class and time remaining
  const [nextClass, setNextClass] = useState<null | Booking>(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Fetch bookings
  const { data: bookings, isLoading, isError } = useQuery({
    queryKey: ['bookings', personal?.id],
    queryFn: () => fetchBookings(personal?.id || ''),
    enabled: !!personal?.id,
  });

  // Find the next class
  useEffect(() => {
    if (bookings) {
      const now = new Date();
      const upcomingClasses = bookings
        .filter((booking) => isAfter(new Date(booking.startDatetime), now))
        .sort(
          (a, b) =>
            new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime()
        );

      if (upcomingClasses.length > 0) {
        setNextClass(upcomingClasses[0]);
      } else {
        setNextClass(null);
      }
    }
  }, [bookings]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (nextClass) {
      const updateCountdown = () => {
        const now = new Date();
        const classStart = new Date(nextClass.startDatetime);

        if (isAfter(now, classStart)) {
          setTimeRemaining('A aula está começando!');
          clearInterval(timer);
        } else {
          const duration = intervalToDuration({ start: now, end: classStart });
          const formattedDuration = formatDuration(duration, {
            format: ['hours', 'minutes'],
            locale: pt, // Use Portuguese locale
          });

          setTimeRemaining(`em ${formattedDuration}`);
        }
      };

      updateCountdown();
      timer = setInterval(updateCountdown, 60000); // Update every minute
    } else {
      setTimeRemaining('');
    }

    return () => clearInterval(timer);
  }, [nextClass]);

  const handleNavigateToPlayClass = () => {
    navigate(Routes.PLAY_CLASS);
  };

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <></>;
  }

  if (!nextClass) {
    return <></>;
  }

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-xl font-semibold mb-2">Sua próxima aula</h2>
      <p>
        Sua próxima aula é {timeRemaining} em{' '}
        {new Date(nextClass.startDatetime).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
        .
      </p>
      <Button onClick={handleNavigateToPlayClass} className="mt-4">
        Ir para a aula
      </Button>
    </div>
  );
};

export default NextClass;

