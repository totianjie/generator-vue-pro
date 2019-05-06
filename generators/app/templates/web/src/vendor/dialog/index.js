import VDialog from './src/component';

/* istanbul ignore next */
VDialog.install = function (Vue) {
    Vue.component(VDialog.name, VDialog);
};

export default VDialog;
