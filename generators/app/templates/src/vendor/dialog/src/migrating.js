'use strict';

exports.__esModule = true;
/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
exports.default = {
    mounted: function mounted () {
        if (process.env.NODE_ENV === 'production') return;
        if (!this.$vnode) return;

        let _getMigratingConfig = this.getMigratingConfig();
        let _getMigratingConfig$p = _getMigratingConfig.props;
        let props = _getMigratingConfig$p === undefined ? {} : _getMigratingConfig$p;
        let _getMigratingConfig$e = _getMigratingConfig.events;
        let events = _getMigratingConfig$e === undefined ? {} : _getMigratingConfig$e;

        let _$vnode = this.$vnode;
        let data = _$vnode.data;
        let componentOptions = _$vnode.componentOptions;

        let definedProps = data.attrs || {};
        let definedEvents = componentOptions.listeners || {};

        for (let propName in definedProps) {
            if (definedProps.hasOwnProperty(propName) && props[propName]) {
                console.warn('[Element Migrating][' + this.$options.name + '][Attribute]: ' + props[propName]);
            }
        }

        for (let eventName in definedEvents) {
            if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
                console.warn('[Element Migrating][' + this.$options.name + '][Event]: ' + events[eventName]);
            }
        }
    },

    methods: {
        getMigratingConfig: function getMigratingConfig () {
            return {
                props: {},
                events: {}
            };
        }
    }
};
