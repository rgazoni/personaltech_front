import { Notification, markAsRead } from '@/api/notifications';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns-tz';
import { Frown } from 'lucide-react';
import md5 from 'md5';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type NotificationDisplay = {
  id: string;
  date: string;
  title: string;
  url: string;
  read: boolean;
};

export const Notifications = ({
  showDropdown,
  data,
}: {
  showDropdown: boolean;
  data: Notification[];
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState<
    NotificationDisplay[]
  >([]);

  React.useEffect(() => {
    if (data) {
      setNotifications(
        data.map((notification) => {
          const date = format(
            new Date(notification.createdAt),
            'dd/MM/yyyy HH:mm'
          );
          let url = '';

          //cancel_schedule event does not need to be redirected to a specific page

          if (notification.type === 'new_schedule') {
            url = `/page/edit/schedule`;
          } else if (notification.type === 'trainee_commented') {
            url = `/page/edit/rating`;
          } else if (notification.type === 'weekly_report') {
            url = `/page/edit/dashboard`;
          } else if (
            notification.type === 'new_rating' &&
            notification.person_type === 'trainee'
          ) {
            url = `/profile?tab=invites`;
          }

          return {
            id: notification.id,
            date: date,
            title: notification.message,
            url: url,
            read: notification.read,
          };
        })
      );
    }
  }, [data]);

  const mutateNotification = useMutation({
    mutationFn: markAsRead,
    mutationKey: ['markAsRead', md5(JSON.stringify(notifications))],
  });

  React.useEffect(() => {
    const ids = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.id);
    if (showDropdown && ids.length > 0) {
      mutateNotification.mutate(ids);
    }
  }, [showDropdown]);

  return (
    showDropdown && (
      <div className="absolute -right-4 top-6 mt-1 max-h-96 w-60 overflow-y-auto rounded-lg border bg-white shadow-lg"
      >
        <div className="rounded-md bg-background shadow-md">
          <div className="flex flex-col gap-2 p-3">
            {notifications && notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <div key={notification.id}>
                    <div
                      className="mb-2 flex cursor-pointer flex-col gap-1 px-2 py-2 hover:rounded-md hover:bg-gray-100 text-black"
                      onClick={() => {
                        if (window.location.pathname === notification.url) {
                          window.location.reload();
                        }
                        navigate(notification.url);
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className={`h-2 w-2 rounded-full ${notification.read ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        />
                        <p className="text-xs">{notification.date}</p>
                      </div>
                      <p className="text-xs">{notification.title}</p>
                    </div>
                    <hr />
                  </div>
                ))}
              </>
            ) : (
              <div className="flex gap-1">
                <Frown size={16} className="text-muted" />
                <p className="text-xs text-muted">
                  Você não tem novas notificações.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};
