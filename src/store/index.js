import Vue from 'vue'
import Vuex from 'vuex'
import getters from '../store/getters'
import mutations from  '../store/mutations'
import actions from "@/store/actions";

Vue.use(Vuex)

export const state = {
    keywords: '', //search的关键字
    articleContent: '',
    articleList: '',
    commentList: [],
    categoryList: [],
    errorImg: 'this.src= "../assets/img/images.png"'
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
