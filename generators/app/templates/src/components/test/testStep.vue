<!-- Created by TIANJIE on 2018/6/21 -->
<template>
    <div class="hello">
        <v-steps :active="active" finish-status="success">
            <v-step title="步骤 1"></v-step>
            <v-step title="步骤 2"></v-step>
            <v-step title="步骤步骤步骤 3"></v-step>
        </v-steps>

        <button style="margin-top: 12px;" @click="next">下一步</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                active: 0
            };
        },

        methods: {
            next () {
                if (this.active++ > 2) this.active = 0;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
