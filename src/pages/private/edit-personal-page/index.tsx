import { PersonalEditionPage } from "@/components/common/personal-edition-page";
import { PersonalFormPage } from "./form";
import { useParams } from "react-router-dom";
import { PersonalPreviewPage } from "./preview";
import { EditPersonalProvider } from "@/providers/edit-personal-page-provider";
import useAppStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { fetchPersonalInfo } from "@/api/user";
import { PersonalRatingPage } from "./rating";
import { Dashboard } from "./dashboard";

export const EditPersonalPage = () => {
  let params = useParams<{ path: string }>();
  console.log(params.path);
  let path = "";
  if (params.path === undefined) {
    path = "form";
  } else {
    path = params.path;
  }

  const user = useAppStore((state) => state.user);
  const { data, isPending } = useQuery({
    queryKey: ['personal-info', user.token],
    queryFn: () => fetchPersonalInfo(user.id),
  })

  const render = () => {
    return (
      <EditPersonalProvider>
        {isPending ? <p>Carregando...</p> :
          data &&
          <PersonalEditionPage data={data}>
            {path === 'preview' && <PersonalPreviewPage />}
            {path === 'form' && <PersonalFormPage data={data} />}
            {path === 'rating' && <PersonalRatingPage />}
            {path === 'dashboard' && <Dashboard />}
          </PersonalEditionPage>
        }
      </EditPersonalProvider>
    );
  }

  return render();
}
