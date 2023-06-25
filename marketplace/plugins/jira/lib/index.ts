import { QueryError, QueryResult, QueryService, ConnectionTestResult } from '@tooljet-marketplace/common';
import { SourceOptions, QueryOptions, Operation } from './types';
import { default as axios } from 'axios';
import { searchJira, createTask } from './query_operations';

export default class Jira implements QueryService {
  async run(sourceOptions: SourceOptions, queryOptions: QueryOptions, dataSourceId: string): Promise<QueryResult> {
    const operation: Operation = queryOptions.operation;
    const axiosInstance = await this.getConnection(sourceOptions);

    let result = {};
    try {
      switch (operation) {
        case Operation.SearchJira:
          result = await searchJira(axiosInstance, queryOptions);
          break;
        case Operation.CreateTask:
          result = await createTask(axiosInstance, queryOptions);
          break;
        default:
          throw new QueryError('Query could not be completed', 'Invalid operation', {});
      }
    } catch (error) {
      throw new QueryError('Query could not be completed', error.message, {});
    }

    return {
      status: 'ok',
      data: result,
    };
  }

  async testConnection(sourceOptions: SourceOptions): Promise<ConnectionTestResult> {
    const axiosInstance = await this.getConnection(sourceOptions);
    try {
      const {data} = await axiosInstance.get('rest/api/latest/serverInfo');
      return {
        status: 'ok',
      };
    } catch (error) {
      return {
        status: 'failed',
        message: 'could not connect to Jira: ' + error.message
      };
    }
  }

  async getConnection(sourceOptions: SourceOptions): Promise<any> {
    return axios.create({
      baseURL: sourceOptions.baseUrl,
      headers: {
        common: {
          'Authorization': `Bearer ${sourceOptions.personal_token}`,
          'Content-Type': 'application/json',
          // no gzip encoding of response
          'Accept-Encoding': 'identity'
        }
      }
    });
  }
}
