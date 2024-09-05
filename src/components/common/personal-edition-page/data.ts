export type MenuItems = {
  title: string;
  path: string;
  alert?: number;
  error?: number;
  iconAlert?: JSX.Element;
}[];

export async function initializeMenuItems() {
  const generalItems: MenuItems = [
    {
      title: "Preview do site",
      path: "/page/edit/preview",
    },
    {
      title: "Meus dados",
      path: "/page/edit/form",
    },
    {
      title: "Avaliações",
      path: "/page/edit/rating",
    },
  ];

  return { generalItems };
}
