// 响应组件中的动作
const actions = {
    fun(context, value) {
        context.commit('EDIT_BOOK', value)
    }
}
// 操作数据
const mutations = {
    EDIT_STAFF(state, value) {
        state.staff = JSON.parse(value);
    },
    EDIT_BOOK(state, value) {
        state.book = JSON.parse(value);
    },
    EDIT_ORDER(state, value) {
        state.order = JSON.parse(value);
    },

}
// 存储数据
const state = {
    staff: {},
    book: {},
    order: {},
}
// 暴露文件
export default {
    namespaced: true,
    state,
    mutations,
    actions
}