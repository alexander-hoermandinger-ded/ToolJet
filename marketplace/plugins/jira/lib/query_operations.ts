import { default as axios } from 'axios';
import { QueryOptions } from './types';
import { QueryError } from '@tooljet-marketplace/common';

export async function searchJira(axiosInstance, options: QueryOptions): Promise<object> {
  const { data } = await axiosInstance.get('rest/api/latest/search',
    {
      params: {
        jql: options.jql
      }
    })
  return data.issues;
}

export async function createTask(axiosInstance, options: QueryOptions): Promise<object> {
  const project = options.createTaskProject;
  if (!project)
    throw new QueryError('CreateTask query has no project set', 'CreateTask query has no project set', {});

  const description = options.createTaskDescription;
  if (!description)
    throw new QueryError('CreateTask query has no description set', 'CreateTask query has no description set', {});

  const summary = options.createTaskSummary;
  if (!summary)
      throw new QueryError('CreateTask query has no summary set', 'CreateTask query has no summary set', {});

  const scrumTeam = options.createTaskScrumTeam;
  if (!scrumTeam)
    throw new QueryError('CreateTask query has no scrum team set', 'CreateTask query has no scrum team set', {});

  const createTask = {
    "fields": {
      "assignee": {
        "name": "axjrd",
        "key": "axjrd"
      },
      "issuetype": {
        "id": "3",
        "name": "Task"
      },
      "project": {
        "id": "21000",
        "key": "DALEX"
      },
      "customfield_11105": {
        "value": "Groundhog",
        "id": "60607"
      },
      "description": description,
      "summary": summary,
      "customfield_10002": 3.0
    }
  };

  console.log('Posting task: ' + createTask);

  const { data } = await axiosInstance.post('rest/api/latest/issue', createTask,
    {
      headers: {
        ContentType: 'application/json'
      }
    });
  return data;
}
