import { PersonalEditionPage } from "@/components/common/personal-edition-page";
import { PersonalFormPage } from "./form";
import { useParams } from "react-router-dom";
import { PersonalPreviewPage } from "./preview";

export const EditPersonalPage = () => {
  let params = useParams<{ path: string }>();

  const render = () => {
    if (params.path === "preview") {
      return (
        <PersonalEditionPage>
          <PersonalPreviewPage />
        </PersonalEditionPage>
      );
    }
    // Default to form page
    return (
      <PersonalEditionPage>
        <PersonalFormPage />
      </PersonalEditionPage>
    );
  }

  return render();
}
