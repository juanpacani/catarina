export const ICON_BASE_PATH = 'safirial-icons';

export const iconList = [
  'home', 'sun', 'chevron-arrow-down', 'chevron-arrow-up', 'chevron-arrow-left', 'chevron-arrow-right', 
  'email', 'github', 'linkedin', 'minus', 'moon', 'palette', 'plus', 'bars-3', 'x-mark',
] as const;

export type IconName = typeof iconList[number];

export function getIconPath(name: IconName): string {
  return `${ICON_BASE_PATH}/${name}.svg`;
}
