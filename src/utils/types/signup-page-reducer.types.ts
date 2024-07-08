export type TUpdatePageActions = {
  type: 'update-page-name' | 'update-page-url';
  payload: string;
}

export type TTriggerUrlSuggestion = {
  type: 'trigger-url-suggestion';
}

