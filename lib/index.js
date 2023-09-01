const postcss = require('postcss')

module.exports = postcss.plugin('postcss-change-prefix-namespace', function (opts = {}) {
    const { prefix = 'el-', replace = 'ex-' } = opts || {}

    function replaceStr (str, prefix, replace) {
        let reg
        if (!reg) {
            reg = new RegExp(`(^|(\\s)+|\\.|=)${prefix}`, 'g')
        }
        return str.replace(reg, `$1${replace}`)
    }
    
    // 接收两个参数，第一个是每个css文件的ast，第二个参数中可获取转换结果相关信息(包括当前css文件相关信息)
    function plugin(css, result) {
        css.walkRules((rule) => {
        // 遍历当前ast所有rule节点
        const { selector } = rule
        if (
            selector.includes(prefix) &&
            !selector.includes(replace)
        ) {
            const clone = rule.clone()
            clone.selector = replaceStr(selector, prefix, replace)
            rule.replaceWith(clone)
        }
        })
    }

    return plugin
})
