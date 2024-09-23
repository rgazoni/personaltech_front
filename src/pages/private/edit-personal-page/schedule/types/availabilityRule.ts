export type AvailabilityRule = {
  personal_id: string;
  startTime: string; // 'HH:MM:SS' format
  endTime: string;   // 'HH:MM:SS' format
  daysOfWeek: number[]; // Array of integers from 0 to 6
}
