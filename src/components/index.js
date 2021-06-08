import Pagination from "./Pagination";
import Location from "./Location";
import MyLabel from "./Justify";
import FileUpload from "./FileUpload";
import Frame from './Frame';
import ModuleTree from './ModuleTree';
import TableDivide from './TableDivide';
import RoutePicker from './RoutePicker';
import UserPicker from './UserPicker';
const components = [Pagination, Location, MyLabel, FileUpload, Frame, ModuleTree, TableDivide, RoutePicker, UserPicker];


function install(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
}

export default install;
