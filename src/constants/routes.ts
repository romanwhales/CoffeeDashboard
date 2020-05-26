import Producers from "containers/Producers";
import Lots from "containers/Lots";
import LotForm from "components/Forms/LotForm";
import Organizations from "containers/Organizations";
import StoreForm from "components/Forms/StoreForm";
import Tips from "containers/Tips";
import ProducerContainer from "containers/Producers/ProducerContainer";

export default [
  {
    id: 'root',
    path: '/',
    label: 'Lots',
    sidebar: false,
    container: Lots,
  },
  {
    id: 'root/lots',
    path: '/lots',
    label: 'Lots',
    sidebar: true,
    container: Lots,
  },
  {
    id: 'root/producers',
    path: '/producers',
    label: 'Producers',
    sidebar: true,
    container: Producers,
  },
  {
    id: 'root/tips',
    path: '/tips',
    label: 'Tips',
    sidebar: false,
    container: Tips,
  },
  {
    id: 'root/organizations',
    path: '/organizations',
    label: 'My Organization',
    sidebar: true,
    container: Organizations,
  },
  {
    id: 'root/lots/:id',
    path: '/lots/:id',
    label: 'Lot',
    sidebar: false,
    container: LotForm,
  },
  {
    id: 'root/organizations/stores/:id',
    path: '/organizations/stores/:id',
    label: 'Store',
    sidebar: false,
    container: StoreForm,
  },
  {
    id: 'root/producers/:id',
    path: '/producers/:id',
    label: 'Producer',
    sidebar: false,
    container: ProducerContainer,
  },
];
