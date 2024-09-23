import { AvailabilityRule } from "@/pages/private/edit-personal-page/schedule/types/availabilityRule";
import { api } from ".";

export const createAvailabilityRule = async (newAvailability: AvailabilityRule) => {
  console.log(newAvailability);
  const response = await api.post('/schedule/availability', newAvailability);
  return response.data;
}


interface Booking {
  id: string;
  personal_id: string;
  trainee_id: string;
  startDatetime: string;
  endDatetime: string;
  status: string;
  trainee: {
    name: string;
  };
}

export const fetchBookings = async (personal_id: string): Promise<Booking[]> => {
  const response = await api.get(`/schedule/bookings/${personal_id}`)
  return response.data;
}


interface TimeSlot {
  start: string;
  end: string;
}

export const fetchAvailableSlots = async (personal_id: string, date: string): Promise<TimeSlot[]> => {
  const response = await api.get('/schedule/availability/slots', {
    params: {
      personal_id,
      date,
    },
  });
  return response.data;
}

