export interface ICommand {
  execute(idClient?: string): string;
}
