export * from '../../shared/types/git';
export * from '../../shared/types/validation';

export interface GitModule {
  simulator: GitSimulator;
  validator: ValidationSystem;
}