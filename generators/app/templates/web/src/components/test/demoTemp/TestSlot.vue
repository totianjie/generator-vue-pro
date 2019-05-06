<template>
    <div>
        <hr>
        <slot name='head' />
        <slot>自定义主体</slot>
        <slot name="foot" />
        <hr>

        <v-slot :list="list">
            <template slot-scope="{id}">
                <span>{{id%2 === 0 ? `id: ${id}`: id}}</span>
            </template>
        </v-slot>
    </div>
</template>
<script>
import VSlot from './VSlot';
export default {
    data () {
        return {
            list: [
                {id: 1, name: 1},
                {id: 2, name: 2},
                {id: 3, name: 3},
                {id: 4, name: 4}
            ]
        };
    },
    components: {VSlot}
};
</script>

