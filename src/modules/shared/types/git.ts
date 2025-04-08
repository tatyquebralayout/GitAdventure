export interface GitState {
  files: GitFile[];
  branches: GitBranch[];
  currentBranch: string;
  head: string;
  stage: GitFile[];
}

export interface GitFile {
  name: string;
  status: 'untracked' | 'modified' | 'staged' | 'committed';
  content: string;
}

export interface GitBranch {
  name: string;
  commits: string[];
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface StateValidation {
  isValid: boolean;
  message: string;
  details?: Record<string, unknown>;
}