export const ICON_BASE_PATH = 'safirial-icons';

export const iconList = ['home', 'sun'] as const;

export type IconName = typeof iconList[number];

export function getIconPath(name: IconName): string {
  return `${ICON_BASE_PATH}/${name}.svg`;
}
