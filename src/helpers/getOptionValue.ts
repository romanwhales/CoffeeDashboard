import { get } from 'lodash';

type SelectOptionItem = {
  value: any;
  label: any;
}

export default function getOptionValue<T>(item: SelectOptionItem): T {
  const value: T = get(item, 'value');
  return value;
}