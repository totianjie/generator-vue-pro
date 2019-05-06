// https://eslint.org/docs/user-guide/configuring

module.exports = {

//此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,

//此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: "babel-eslint",

//此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
// 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
        sourceType: "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },

// 此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "amd": true
    },
// https://github.com/standard/standard/blob/master/docs/RULES-en.md
// 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    extends: "vue",
// 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    plugins: [
        "html",
        "flow-vars",
        "react"
    ],
    /*
    下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
    */
    rules: {
        "indent": ["error", 4], // 缩进4个空格
        "consistent-return": 0, // return 后面是否允许省略
        "quotes": 0, // 强制一致使用反引号，双引号或单引号
        "prefer-const": 0, // 如果一个变量从不重新分配，使用const声明更好
        //"space-before-function-paren": 0, // 函数定义时括号前面要不要有空格
        "space-before-function-paren": ["error", { // 函数括号前端需要一个空格
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "ignore"
        }],
        "semi": ["error", "always"], // 语句后面添加的分号
        "no-unneeded-ternary": 0, // 当存在更简单的选择时不允许三元运算符
        "no-return-assign": 0, //
        "object-curly-spacing": 0, // 在大括号内强制执行一致的间距
        "padded-blocks": 'off', // 要求或不允许块内的填充
        "arrow-parens": 0, // 它也将有助于找到箭头函数（=>），这些函数可能被错误地包含在一个条件中，如果这样的比较>=是有意的。
        "generator-star-spacing": 0, // 围绕*生成器函数（generator-star-spacing）强制执行间距
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        // "semi-spacing": ["error", {"before": false, "after": false}], // 分号前后不准有空格
        "no-trailing-spaces": ["error", { "skipBlankLines": true }], // 允许在空行上结尾空白
        "no-multiple-empty-lines": ["error", {
            "max": 2, // "max"（默认2：）强制连续空行的最大数量
            "maxEOF": 2, // "maxEOF" 在文件末尾强制执行最大数量的连续空行
            "maxBOF": 2 // "maxBOF" 在文件的开头强制执行最大数量的连续空行
        }]
    }
};
