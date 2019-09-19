import axios from '../utils/request'

function getData(data){
    return axios.get('/api',{baseURL:'https://pixabay.com',params: {key:'11479201-f4f97cd7dc30b151f8e5a56ac',...data}})
}
export default {
    namespace: 'detail',
    state: {
        imgDetail:{}
    },
    effects: {
        *getData({payload:{id}},{put,call,select}){

            const { hits,total } = yield call(getData,{id});
            console.log('hits',hits)
            yield put({
                type:'save',
                payload:{
                    imgDetail:hits[0] || {}
                }
            })
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
}