import { TTriggerUrlSuggestion, TUpdatePageActions } from "@/utils/types/signup-page-reducer.types";

export const updatePageName = (payload: string): TUpdatePageActions => ({
  type: 'update-page-name',
  payload,
});

export const triggerUrlSuggestion = (): TTriggerUrlSuggestion => ({
  type: 'trigger-url-suggestion',
});

export const updatePageUrl = (payload: string): TUpdatePageActions => ({
  type: 'update-page-url',
  payload,
});
