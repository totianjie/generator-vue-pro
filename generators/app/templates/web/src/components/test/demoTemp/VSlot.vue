<template>
    <div>
        <ul>
            <li v-for="{id, name} in list" :key="id">
                <slot v-bind="{id, name}">name: {{name}}</slot>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        list: Array
    }
};
</script>

