import { useLoading } from "@/hooks/use-loading.hook";
import { useToast } from "@/hooks/use-toast.hook";
import { ErrorToast } from "@/utils/types/error.types";
import { useState } from "react";

export const useSubmitionOutput = (error: ErrorToast | null, loading: boolean) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useLoading(loading);
  const { notifyError, notify } = useToast();
  // Form was submitted and there is an error
  if (error && formSubmitted && !isLoading) {
    notifyError(error.text);
    setFormSubmitted(false);
  }
  // Form was submitted and there is no error
  if (!isLoading && !error && formSubmitted) {
    setFormSubmitted(false);
    notify('🏋️ Usuário criado com sucesso!');
  }
  // Submit form
  const formTriggered = (flag: boolean) => {
    setFormSubmitted(flag);
    setIsLoading(true);
  }
  // Check if the response is with no errors
  const isResponseWithNoErrors = !error && !isLoading && formSubmitted;

  return { formSubmitted, isLoading, formTriggered, isResponseWithNoErrors };
}

