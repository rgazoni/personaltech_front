import { TriggerUrlSuggestionAction, UpdatePageActions } from "./signup-page.types";

export const updatePageName = (payload: string): UpdatePageActions => ({
  type: 'update-page-name',
  payload,
});

export const triggerUrlSuggestion = (): TriggerUrlSuggestionAction => ({
  type: 'trigger-url-suggestion',
});

export const updatePageUrl = (payload: string): UpdatePageActions => ({
  type: 'update-page-url',
  payload,
});
