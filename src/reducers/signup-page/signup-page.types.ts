export type UpdatePageActions = {
  type: 'update-page-name' | 'update-page-url';
  payload: string;
}

export type TriggerUrlSuggestionAction = {
  type: 'trigger-url-suggestion';
}

export type SignupPageActions = UpdatePageActions | TriggerUrlSuggestionAction;
