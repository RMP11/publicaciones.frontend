import DataTable from 'primevue/datatable';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import { TABLE_NRO_ROWS } from './env.const';
import OSidebar from '../components/OSidebar/OSidebar.vue';

setDefault(
  DataTable,
  'paginatorTemplate',
  'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
);
setDefault(DataTable, 'currentPageReportTemplate', '{first} a {last} de {totalRecords}');
setDefault(DataTable, 'rowsPerPageOptions', [10, 20, 50]);
setDefault(DataTable, 'rows', TABLE_NRO_ROWS);

setDefault(OSidebar, 'position', 'right');

(InputText as any).extends.extends.props.size.default = 'small';

export default PrimeVue;

/**
 * @params {Component} component - componente de quasar
 * @params {string} key - propiedad del componente
 * @params {any} value - valor para la propiedad
 */
function setDefault(component: any, key: string, value: any) {
  const prop = component.extends?.props[key] ??  component.props[key];
  switch (typeof prop) {
    case 'object':
      prop.default = value;
      break;
    case 'function':
      component.extends.props[key] = {
        type: prop,
        default: value,
      };
      break;
    case 'undefined':
      throw new Error('unknown prop: ' + key);
    default:
      throw new Error('unhandled type: ' + typeof prop);
  }
}
