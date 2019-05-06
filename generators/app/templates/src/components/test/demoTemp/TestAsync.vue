<template>
    <div>
        sync
    </div>

</template>

<script>
    export default {
        async mounted () {
            let json = {a: 12};
            let json2 = {...json};
            console.log(json2);
            console.log(Object.is(json, json2));
            await this._getData();
            console.log(1);
            await new Promise((resolve) => {
                setTimeout(() => {
                    console.log(2);
                    resolve();
                }, 3000);
            });
            await new Promise((resolve) => {
                setTimeout(() => {
                    console.log(3);
                    resolve();
                }, 2000);
            });
        },
        methods: {
            async _getData () {
                let a = await this._promise({time: 4000, n: 123});
                console.log('第一次走完了');
                let b = await this._promise({n: 23456});
                console.log('第二次走完了');
                console.log(a);

                console.log(b);
            },
            _promise ({time = 2000, n = ''} = {}) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (isNaN(Number(n))) {
                            reject(`是字符串: ${n}`);
                        } else {
                            resolve(`是个数字: ${n}`);
                        }
                    }, time);
                });
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
