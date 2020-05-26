export type OrNull<T> = T | null;

export interface UserInfo {
  _id: string;
  name: string;
  cafes: string[];
  email: string;
  permissions: number[];
  profilePhoto: string;
  currentProfile?: { cafe: string, store: string };
  phone: string;
}

export interface BaseOrganization {
  _id: string;
  name: string;
  createdDate: Date;
}

export interface BaseSingleOrganization {
  _id: string;
  name: string;
  createdDate: Date;
  isPassportPublisher: boolean;
}

export interface BaseStore {
  _id: string;
  address1: string;
  address2: string;
  cafe: string;
  city: OrNull<string>;
  createdDate: Date;
  fullAddress: string;
  latitude: OrNull<number>;
  longitude: OrNull<number>;
  name: string;
  roaster: string;
  state: OrNull<string>;
  zip: string;
  roasters: [];
  value:string;
  label:string;
}

export interface BaseProducer {
  _id: string;
  cafe: string;
  name: string;
  type: 'independent' | 'co-op';
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseFarm {
  _id: string;
  name: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  producer: string;
  photos?: OrNull<string[]>;
  specificLocation?: any;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseLot {
  _id: string;
  ico: string;
  name: string;
  farm: string
  producer: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseBean {
  _id: string;
  amount: number;
  cafe: string;
  certification: string;
  createdDate: Date;
  cuppingNotes1: string;
  cuppingNotes2: string;
  cuppingNotes3: string;
  elevation: string;
  farm: string;
  grower: string;
  highlight: string;
  icoCode: string;
  impact: string;
  isArchived: false
  isBwBean: true
  location: string;
  lot: string;
  movies: string[];
  name: string;
  photos: string[];
  price: number;
  process: string;
  producer: string;
  roastProfiles: string;
  sku: string;
  story: string;
  tastingNotes: string;
  variety: string;
  whyWeLoveIt: string;
  isPublished: boolean;
  logo: string;
  latitude: number;
  longitude: number;
  isPassport: boolean;
  brandColor: string;
}

export interface BaseRoastProfile {
  _id: string;
  name: string;
  bean: string;
  privacy: string;
  archived: boolean;
  createdBy: Date;
  createdDate: Date;
  profile: string;
  version: number;
}

export interface BaseCertification {
  _id: string;
  name: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseProcess {
  _id: string;
  name: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseVariety {
  _id: string;
  name: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseCuppingNote1 {
  _id: string;
  name: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseCuppingNote2 {
  _id: string;
  name: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseCuppingNote3 {
  _id: string;
  name: string;
  isArchived: boolean;
  createdDate: Date;
}

export interface BaseArchive {
  _id: string;
}

export interface BaseEdit {
  _id: string;
}

export interface BaseCreate {
  _id: string;
  name?: string;
}

export interface BasePurchase {
  _id: string;
}
