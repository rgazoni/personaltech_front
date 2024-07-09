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
      path: "/u/page/edit/preview",
    },
    {
      title: "Meus dados",
      path: "/u/page/edit/form",
    },
  ];

  return { generalItems };
}
