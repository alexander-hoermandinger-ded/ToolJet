export type SourceOptions = {
  auth_type: string;
  api_key: string;
  baseUrl: string;
};
export type QueryOptions = {
  operation: Operation;
  project?: string;
  component?: string;
  vulnerability?: string;
  createAnalysisTrailState?: string;
  createAnalysisTrailComment?: string;
  createAnalysisTrailDetails?: string;
  createAnalysisTrailJustification?: string;
  createAnalysisTrailResponse?: string;
};

export enum Operation {
  GetFindings = 'get_findings',
  GetAnalysis = 'get_analysis',
  CreateAnalysisTrail = 'create_analysis_trail'
}