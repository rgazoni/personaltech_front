import { AvailabilityRule } from "@/pages/private/edit-personal-page/schedule/types/availabilityRule";
import { api } from ".";

export const createAvailabilityRule = async (newAvailability: AvailabilityRule) => {
  console.log(newAvailability);
  const response = await api.post('/schedule/availability', newAvailability);
  return response.data;
}

export interface Booking {
  id: string;
  personal_id: string;
  trainee_id: string;
  startDatetime: string;
  endDatetime: string;
  status: string;
  trainee: {
    full_name: string;
    avatar: string;
    uid_chat: string;
    state: string;
    city: string;
  };
}

export const fetchBookings = async (personal_id: string): Promise<Booking[]> => {
  const response = await api.get(`/schedule/bookings/${personal_id}`)
  return response.data;
}

export const deleteBooking = async (booking_id: string): Promise<Booking[]> => {
  const response = await api.delete(`/schedule/bookings/${booking_id}`)
  return response.data;
}

interface TimeSlot {
  start: string;
  end: string;
}

export const fetchAvailableSlots = async (personal_id: string, date: string): Promise<TimeSlot[]> => {
  console.log(personal_id, date);
  const response = await api.get('/schedule/availability/slots', {
    params: {
      personal_id,
      date,
    },
  });
  return response.data;
}

export const createBooking = async (bookingData: {
  personal_id: string;
  trainee_id: string;
  startDatetime: string;
}) => {
  const response = await api.post('/schedule/bookings', bookingData);
  return response.data;
};

export type BookingTrainee = {
  booking: {
    endDatetime: string;
    id: string;
    personal: {
      uid_chat: string;
    }
    startDatetime: string;
    status: string;
  }
  professional: {
    avatar: string;
    page_name: string;
    url: string;
    personal_id: string;
  }
}

export const getTraineeSchedules = async (token: string): Promise<BookingTrainee[]> => {
  console.log(token);
  const res = await api.get('schedule/trainee?token=' + token);
  console.log(res.data);
  return res.data;
}
