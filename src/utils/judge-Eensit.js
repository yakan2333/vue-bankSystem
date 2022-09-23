/**
 * @param {string} value
 * @returns {string | null}
 */
export function judgeEensit(value) {
    let word = [
        "妈的",
        "你妈",
        "他妈",
        "法轮功",
        "死",
        "逼",
        "草",
        "日",
        "狗",
        "吊",
        "屮",
        "靠",
    ];
    for (let i in word) {
        /*替换全部空格*/
        // let arr = obj.replace(/\s+/g,"")
        //全局替换
        let reg = new RegExp(word[i], "g");
        //判断内容中是否包括敏感词
        if (value.indexOf(word[i]) != -1) {
            var result = value.replace(reg, "*");
            value = result;
            this.$message({
                type: "error",
                message: `不能包含敏感词${'"'}${word[i]}${'"'}`,
            });
            return value;
        }
    }
};