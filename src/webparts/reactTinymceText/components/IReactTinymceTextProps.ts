export interface IReactTinymceTextProps {
  content: string;
  saveRteContent(content: string): void;
  isReadMode: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
