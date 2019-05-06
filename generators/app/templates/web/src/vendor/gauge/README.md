### 仪表盘使用说明

src/main.js

```javascript
import Gauge from 'vendor/gauge';
Vue.use(Gauge);
```

参数

```javascript
是否需要圆角
isRound: true/false		default: true
是否需要渐变
isLg: true/false		default: false
弧的厚度
borderW: 10				default: 10
渐变配制 如果isLg是true 时传
colors: []				default: [{n: 0, color: '#ffb055'}, {n: 1, color: '#fb4376'}]
如果isLg是false 时传
color: '#399'			default: '#399'
开始弧度
start: 0				default: 0
结束弧度
end: 180				default: 180
半径
radius: 100				default: 100
名称
name: '默认名称'		default: '默认名称'
当前值
current: 0			   default: 0
总数
count: 100			   default: 100
大刻度 分多少个块
splitNum: 5			   default: 5
每一块分多少个小刻度
scaleNum: 5			   default: 5
指针离开圆外边的距离
pointerOffset: 20	   default: 20
格式化浮层样式   return 返回字符串	'<div></div>'
formatter: Function	   default: function (data) {
									return `<p>当前值:${data.current}</p>
                               				<p>总数:${data.count}</p>
                            				`;
                            	}
```

使用

```javascript
<template>
	<div>
  		<!-- 参数配制 -->
		<gauge
                :isLg="false"
                :isRound="true"
                :borderW="10"
                :radius="100"
                name="我是一个名称"
                current="20"
                count="200"
                :formatter="formatter"
            >
            </gauge>
	</div>
</template>
<script>
        export default {
  			methods: {
  				formatter (data) {
  					return `
						<p>格式化：${data.current}</p>
						<p>格式化：${data.count}</p>
					`
				}
			}
		}          
</script>
```