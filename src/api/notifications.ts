import { api } from ".";

export type Notification = {
  id: string;
  createdAt: string;
  person_id: string;
  person_type: string;
  message: string;
  read: boolean;
  type: string;
  reference_id: string;
}

export const getNotifications = async (personal_id: string): Promise<Notification[]> => {
  const res = await api.get(`notifications/${personal_id}`);
  console.log('getNotifications');
  console.log(res.data);
  return res.data;
}

export const markAsRead = async (notification_ids: string[]): Promise<Notification> => {
  console.log('markAsRead');
  console.log(notification_ids);
  const res = await api.put(`notifications?ids=${notification_ids}`);
  return res.data;
}
