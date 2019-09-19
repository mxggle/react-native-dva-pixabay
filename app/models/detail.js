import axios from '../utils/request'

function getData(data){
    return axios.get('/api',{baseURL:'https://pixabay.com',params: {key:'11479201-f4f97cd7dc30b151f8e5a56ac',...data}})
}
export default {
    namespace: 'detail',
    state: {
    },
    effects: {
        *getData({payload:{page = 1,per_page = 10}},{put,call,select}){
            const imageList = yield select(state => state.app.imageList)
            // console.log(imageList)
            const { hits,total } = yield call(getData,{page,per_page});
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'getData',payload:{} })
        },
    },
}