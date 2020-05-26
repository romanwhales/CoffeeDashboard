import { createSelector } from 'reselect';
import { AppStore } from 'models';

const itemToOption = (labelKey: string) => (item: any) => ({ value: item._id, label: item[labelKey] });

const producersSelector = (state: AppStore) => state.producers.producers;
const farmsSelector = (state: AppStore) => state.farms.farms;
const lotsSelector = (state: AppStore) => state.lots.lots;

export const producerSelectOptions = createSelector(
  producersSelector,
  producers => producers.map(itemToOption('name')),
);

export const farmsSelectOptions = createSelector(
  farmsSelector,
  farms => farms.map(farm => ({
    value: farm._id,
    label: farm.name,
    producer: farm.producer,
  })),
);

export const lotsSelectOptions = createSelector(
  lotsSelector,
  farmsSelector,
  (lots, farms) => lots.map(lot => {
    const farm = farms.find(i => i._id === lot.farm);
    const label = `${lot.ico} - ${farm.name}`;
    return farm ? {
      label,
      value: lot._id,
    } : null;
  }),
);