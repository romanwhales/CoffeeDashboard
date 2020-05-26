import * as actions from '../constants/producers';
import { ProducersReducer } from "models";

const initialState: ProducersReducer = {
  isLoading: false,
  producers: [],
  create: null,
  edit: null,
  archive: null,
  producer: null
};

const producers = (state: ProducersReducer = initialState, action: { type: string, data?: any }): ProducersReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_PRODUCERS:
      return {
        ...state,
        isLoading: true,
        create: null,
        edit: null,
        archive: null,
        producer: null
      };
    case actions.GET_PRODUCERS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_PRODUCERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        producers: [...data.producers || []]
      };
    case actions.CREATE_PRODUCER:
      return {
        ...state,
        isLoading: true,
        create: null
      };
    case actions.CREATE_PRODUCER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.CREATE_PRODUCER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        create: data.create
      };
    case actions.ARCHIVE_PRODUCER:
      return {
        ...state,
        isLoading: true,
        archive: null
      };
    case actions.ARCHIVE_PRODUCER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.ARCHIVE_PRODUCER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        archive: data.archive
      };
    case actions.GET_PRODUCER_BY_ID:
      return {
        ...state,
        isLoading: true,
        producer: null
      };
    case actions.GET_PRODUCER_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_PRODUCER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        producer: data.producer
      };
    case actions.EDIT_PRODUCER:
      return {
        ...state,
        isLoading: true,
        edit: null
      };
    case actions.EDIT_PRODUCER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.EDIT_PRODUCER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        edit: data.edit
      };
  }
  return state;
}
export default producers;
