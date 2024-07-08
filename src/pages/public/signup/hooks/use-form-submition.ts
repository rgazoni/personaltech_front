import { useLoading } from "@/hooks/use-loading.hook";
import { useToast } from "@/hooks/use-toast.hook";
import { ErrorToast } from "@/utils/types/error.types";
import { useState } from "react";

export const useSubmitionOutput = (error: ErrorToast | null, loading: boolean) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useLoading(loading);
  const { notifyError, notify } = useToast();
  const [isResponseWithNoErrors, setIsResponseWithNoErrors] = useState<boolean>(false);
  // Form was submitted and there is an error
  if (error && formSubmitted && !isLoading) {
    notifyError(error.text);
    setFormSubmitted(false);
    // Check if the response is with no errors
    setIsResponseWithNoErrors(!error && !isLoading && formSubmitted);
  }
  // Form was submitted and there is no error
  if (!isLoading && !error && formSubmitted) {
    setIsResponseWithNoErrors(!error && !isLoading && formSubmitted);
    setFormSubmitted(false);
    notify('🏋️ Usuário criado com sucesso!');
  }
  // Submit form
  const formTriggered = (flag: boolean) => {
    setFormSubmitted(flag);
    setIsLoading(true);
  }

  return { formSubmitted, isLoading, formTriggered, isResponseWithNoErrors };
}

