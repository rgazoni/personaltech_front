import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './styles.css';
import { MenuItems, initializeMenuItems } from "./data";
import { User } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getPageById } from "@/api/page";
import { Info, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const Sidebar = ({ data }: { data: User }) => {
  // @states
  const [generalItems, setGeneralItems] = useState<MenuItems>([]);

  let pathname = useLocation().pathname;
  if (pathname === "/page/edit" || pathname === "/page/edit/") {
    pathname = "/page/edit/form";
  }

  const { data: dataPage } = useQuery({
    queryKey: ['personal-page', data.id],
    queryFn: () => getPageById(data.id),
  });
  const [pageData, setPageData] = useState(dataPage);

  // @effects
  useEffect(() => {
    async function setup() {
      const { generalItems } = await initializeMenuItems();
      setGeneralItems(generalItems);
    }
    setup();
    console.log('data');
    console.log(pageData);
  }, []);

  useEffect(() => {
    if (dataPage) {
      setPageData(dataPage);
    }
  }, [dataPage]);

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
              item.title === 'Avaliações' ? ( // Handling 'Avaliações' menu item
                pageData && pageData.is_published ? ( // Checking if dataPage exists and is published
                  <Link to={item.path} key={index}>
                    <div
                      className={`menu-item ${item.path === pathname ? "menu-item-active" : ""}`}
                    >
                      <p className="font-semibold text-start text-lg">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div
                          className={`menu-item ${item.path === pathname ? "menu-item-active" : ""} flex items-center gap-1 cursor-pointer`}
                        >
                          <Lock size={16} strokeWidth={3} />
                          <p className="font-semibold text-start text-lg">
                            {item.title}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent align="start" className="flex gap-1">
                        <Info size={10} strokeWidth={2} className="text-muted mt-0.5" />
                        <p className="w-56 text-muted text-xs text-wrap">Para que você possa usar a aba de Avaliações, é necessário que a página seja publicada.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              ) : ( // Other items rather than 'Avaliações'
                <Link to={item.path} key={index}>
                  <div
                    className={`menu-item ${item.path === pathname ? "menu-item-active" : ""}`}
                  >
                    <p className="font-semibold text-start text-lg">
                      {item.title}
                    </p>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

