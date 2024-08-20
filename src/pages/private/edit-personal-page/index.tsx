import { PersonalEditionPage } from "@/components/common/personal-edition-page";
import { PersonalFormPage } from "./form";
import { useParams } from "react-router-dom";
import { PersonalPreviewPage } from "./preview";
import { EditPersonalProvider } from "@/providers/edit-personal-page-provider";

export const EditPersonalPage = () => {
  let params = useParams<{ path: string }>();

  const render = () => {
    return (
      <EditPersonalProvider>
        <PersonalEditionPage>
          {params.path === 'preview' ?
            <PersonalPreviewPage />
            :
            <PersonalFormPage />
          }
        </PersonalEditionPage>
      </EditPersonalProvider>
    );
  }

  return render();
}
