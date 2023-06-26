import { QueryOptions } from './types';
import { QueryError } from '@tooljet-marketplace/common';

export async function getFindings(axiosInstance, options: QueryOptions): Promise<object> {
  const projectId = options.project;
  if(!projectId) {
    throw new QueryError('GetFindings query has no project set', 'GetFindings query has no project set', {});
  }
  const { data } = await axiosInstance.get(`api/v1/finding/project/${projectId}`)
  return data;
}

export async function createAnalysisTrail(axiosInstance, options: QueryOptions): Promise<object> {
  const project = options.project;
  if (!project)
    throw new QueryError('CreateAnalysisTrail query has no project set', 'CreateAnalysisTrail query has no project set', {});

  const component = options.component;
  if (!component)
    throw new QueryError('CreateAnalysisTrail query has no component set', 'CreateAnalysisTrail query has no component set', {});

  const vulnerability = options.vulnerability;
  if (!vulnerability)
    throw new QueryError('CreateAnalysisTrail query has no vulnerability set', 'CreateAnalysisTrail query has no vulnerability set', {});
  
  const state = options.createAnalysisTrailState;
  const comment = options.createAnalysisTrailComment;
  const details = options.createAnalysisTrailDetails;
  const justification = options.createAnalysisTrailJustification;
  const response = options.createAnalysisTrailResponse;


  const analysisTrail = {
      "project": project,
      "component": component,
      "vulnerability": vulnerability,
      "analysisState": state,
      "comment": comment,
      "analysisDetails": details,
      "analysisJustification": justification,
      "analysisResponse": response
  };

  console.log('Putting analysis trail: ' + JSON.stringify(analysisTrail));

  try {
    const { data } = await axiosInstance.put('api/v1/analysis', analysisTrail);
    return data;
  } catch (error) {
    console.log('Error: ' + error);
    throw error;
  }
}
