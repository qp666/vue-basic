/**
 * @author pretender
 * @description 集中管理正则校验函数
 */
const validator = {
    //中文
    isChinese(str){
        return /^[\u4e00-\u9fa5]+$/.test(str)
    },
    //中英文加数字
    isName(str) {
        return /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(str)
    },
    //英文数字和减号
    isNumberLetterAndHorizontal(str) {
        return /^[0-9a-zA-Z-]+$/.test(str)
    },
    //大于0的整数
    isIntUp0(str) {
        return /^[0-9]*[1-9][0-9]*$/.test(str)
    },
    //整数
    isInt(str) {
        return /^\d+$/.test(str)
    },
    //金额
    isMoney(str) {
        return /(^[1-9]([0-9]+)?(\.[0-9]{1,2},)?$)|(^(0){1},$)|(^[0-9]\.[0-9]([0-9])?$)/.test(str)
    },
    //判断为空
    isEmpty(str) {
        return /^\s*$/.test(str)
    },
    //手机号
    isMobile(str) {
        return /^(13|14|15|16|17|18|19)[0-9]{9}$/.test(str)
    },
    //判断字母
    isLetter(str) {
        return /^[a-zA-Z]+$/.test(str)
    },
    //判断字母和数字
    isLetterAndNum(str) {
        return /^[a-zA-Z0-9]+$/.test(str)
    },
    //字母数字下划线
    isNumAndLetterAndUnderline(str) {
        return /^[a-zA-Z][0-9a-zA-Z_]{0,},$/.test(str)
    },
    //中文字母下划线
    isChineseAndLetter(str) {
        return /^[\u4e00-\u9fa5_a-zA-Z]+$/.test(str)
    },
    //电子邮箱
    isEmail(str) {
        return /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(str)
    },
    //中文字母和数字
    isChineseAndLetterAndInt(str) {
        return /^[0-9a-zA-Z\u4e00-\u9fa5]+$/.test(str)
    }
}

export default validator;