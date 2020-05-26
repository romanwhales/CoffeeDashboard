import { UserInfo, BaseProducer, BaseFarm, BaseLot, BaseBean, BaseOrganization, BaseRoastProfile, BaseCertification, BaseProcess, BaseVariety, 
BaseCuppingNote1, BaseCuppingNote2, BaseCuppingNote3, BaseArchive, BaseEdit, BaseCreate, BasePurchase, BaseStore, BaseSingleOrganization } from "./core";

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthReducer {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  forget: any;
  send: any;
  error: any;
}

export interface OrganizationsReducer {
  isLoading: boolean;
  organizations: BaseOrganization[];
  cafe: BaseSingleOrganization;
}

export interface ProducersReducer {
  isLoading: boolean;
  producers: BaseProducer[];
  create: BaseCreate;
  producer: BaseBean;
  archive: BaseArchive;
  edit: BaseEdit;
}

export interface FarmsReducer {
  isLoading: boolean;
  farms: BaseFarm[];
  create: BaseCreate;
}

export interface LotsReducer {
  isLoading: boolean;
  lots: BaseLot[];
}

export interface BeansReducer {
  isLoading: boolean;
  beans: BaseBean[];
  bean: BaseBean;
  archive: BaseArchive;
  edit: BaseEdit;
  create: BaseCreate;
  purchase: BasePurchase;
}

export interface RoastProfilesReducer {
  isLoading: boolean;
  roastProfiles: BaseRoastProfile[];
}

export interface CertificationsReducer {
  isLoading: boolean;
  certifications: BaseCertification[];
}

export interface ProcessesReducer {
  isLoading: boolean;
  processes: BaseProcess[];
}

export interface VarietiesReducer {
  isLoading: boolean;
  varieties: BaseVariety[];
}

export interface CuppingNotes1Reducer {
  isLoading: boolean;
  cuppingNotes1: BaseCuppingNote1[];
}

export interface CuppingNotes2Reducer {
  isLoading: boolean;
  cuppingNotes2: BaseCuppingNote2[];
}

export interface CuppingNotes3Reducer {
  isLoading: boolean;
  cuppingNotes3: BaseCuppingNote3[];
}

export interface UIReducer {
  openModal: React.ReactNode[];
  // openModals: number[];
}

export interface UsersReducer {
  isLoading: boolean;
  users: UserInfo[];
  user: UserInfo;
  create: BaseCreate;
  edit: BaseEdit;
}

export interface StoresReducer {
  isLoading: boolean;
  stores: BaseStore[];
  store: BaseStore;
  edit: BaseEdit;
}

export interface AppStore {
  auth: AuthReducer;
  ui: UIReducer;
  organizations: OrganizationsReducer;
  producers: ProducersReducer;
  farms: FarmsReducer;
  lots: LotsReducer;
  beans: BeansReducer;
  roastProfiles: RoastProfilesReducer;
  certifications: CertificationsReducer;
  processes: ProcessesReducer;
  varieties: VarietiesReducer;
  cuppingNotes1: CuppingNotes1Reducer;
  cuppingNotes2: CuppingNotes2Reducer;
  cuppingNotes3: CuppingNotes3Reducer;
  users: UsersReducer;
  stores: StoresReducer;
}
