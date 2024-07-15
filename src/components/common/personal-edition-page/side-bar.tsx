import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './styles.css';
import { MenuItems, initializeMenuItems } from "./data";

export const Sidebar = () => {
  // @states
  const [generalItems, setGeneralItems] = useState<MenuItems>([]);

  // @constants
  const pathname = useLocation().pathname;

  // @effects
  useEffect(() => {
    async function setup() {
      const { generalItems } = await initializeMenuItems();

      setGeneralItems(generalItems);
    }
    setup();
  }, []);

  return (
    <aside
      id="sidebar"
      className="float-left flex -translate-x-full border-neutrals-lighter bg-neutrals-white transition-transform sm:translate-x-0 w-fit text-nowrap"
      aria-label="Sidebar"
    >
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col items-start">

          <div className="flex flex-col gap-3">
            {generalItems.map((item, index) => (
              <Link to={item.path} key={index}>
                <div
                  className={`menu-item ${item.path === pathname ? "menu-item-active" : ""
                    }`}
                >
                  <p className="font-semibold text-start text-lg">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

//<div>
//<div className="menu-item">
//<p className="text-neutrals-dark text-sm text-center mt-2">Sair</p>
//</div>
//</div>
