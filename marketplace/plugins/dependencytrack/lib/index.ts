import { QueryError, QueryResult, QueryService, ConnectionTestResult } from '@tooljet-marketplace/common';
import { SourceOptions, QueryOptions, Operation } from './types';
import { default as axios } from 'axios';
import { getFindings, createAnalysisTrail } from './query_operations';

export default class Dependencytrack implements QueryService {

  async run(sourceOptions: SourceOptions, queryOptions: QueryOptions, dataSourceId: string): Promise<QueryResult> {
    const operation: Operation = queryOptions.operation;
    const axiosInstance = await this.getConnection(sourceOptions);

    let result = {};
    try {
      switch (operation) {
        case Operation.GetFindings:
          result = await getFindings(axiosInstance, queryOptions);
          break;
        case Operation.CreateAnalysisTrail:
          result = await createAnalysisTrail(axiosInstance, queryOptions);
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
      console.log("calling testConnection");
      const resp = await axiosInstance.get('api/version');
      console.log("testConnection: " + resp);
      return {
        status: 'ok',
      };
    } catch (error) {
      return {
        status: 'failed',
        message: 'could not connect to Dependency Track: ' + error.message
      };
    }
  }


  async getConnection(sourceOptions: SourceOptions): Promise<any> {
    return axios.create({
      baseURL: sourceOptions.baseUrl,
      headers: {
        common: {
          'X-Api-Key': sourceOptions.api_key,
          'Content-Type': 'application/json',
          // no gzip encoding of response
          'Accept-Encoding': 'identity'
        }
      }
    });
  }
}
