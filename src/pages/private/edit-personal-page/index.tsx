import { PersonalEditionPage } from "@/components/common/personal-edition-page";
import { PersonalFormPage } from "./form";
import { useParams } from "react-router-dom";
import { PersonalPreviewPage } from "./preview";
import { EditPersonalProvider } from "@/providers/edit-personal-page-provider";
import { PersonalRatingPage } from "./rating";

export const EditPersonalPage = () => {
  let params = useParams<{ path: string }>();
  console.log(params.path);
  let path = "";
  if (params.path === undefined) {
    path = "form";
  } else {
    path = params.path;
  }

  const render = () => {
    return (
      <EditPersonalProvider>
        <PersonalEditionPage>
          {path === 'preview' && <PersonalPreviewPage />}
          {path === 'form' && <PersonalFormPage />}
          {path === 'rating' && <PersonalRatingPage />}
        </PersonalEditionPage>
      </EditPersonalProvider>
    );
  }

  return render();
}
