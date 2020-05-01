export interface ProjectInterface {
  project_name: string;
  description: string;
  project_identifier: string;
  start_date: string;
  end_date: string;
}

export interface TaskInterface {
  summary: string;
  status: string;
  priorty: string;
  project_sequence?: string;
  due_date: string;
  ProjectId: number;
}
