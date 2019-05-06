import gaugeComponent from './Gauge';

const Gauge = {
    install: function (Vue) {
        Vue.component('Gauge', gaugeComponent);
    }
};
export default Gauge;
