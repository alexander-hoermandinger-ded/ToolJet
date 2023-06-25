export type SourceOptions = {
  auth_type: string;
  personal_token: string;
  baseUrl: string;
};
export type QueryOptions = {
  operation: Operation;
  jql?: string;
  createTaskProject?: string;
  createTaskDescription?: string;
  createTaskSummary?: string;
  createTaskScrumTeam?: string;
};

export enum Operation {
  SearchJira = 'search_jira',
  CreateTask = 'create_task'
}
