<template>
    <div>
        <sync
            :title.sync="title"
            v-bind.sync="doc"
        />
    </div>
</template>
<script>
import Sync from './Sync.vue';
export default {
    data () {
        return {
            title: 'test-sync',
            doc: { a: 121, b: 5 }
        };
    },
    components: { Sync }
};
</script>

