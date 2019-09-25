import axios from '../utils/request'

function getData(data){
    // console.log(111111,data)
    return axios.get('/api',{baseURL:'https://pixabay.com',params: {key:'11479201-f4f97cd7dc30b151f8e5a56ac',...data}})
}
export default {
    namespace: 'home',
    state: {
        num: 0,
        imageList:[],
        page:1,
        per_page:10,
        total:0,
        hasMore:true
    },
    effects: {
        *getData({payload:{page = 1,per_page = 10,searchKey}},{put,call,select}){
            const imageList = yield select(state =>state.home.imageList)
            const { hits,total } = yield call(getData,{page,per_page,q:searchKey});

            const maximumPage = Math.ceil(total / per_page);
            if(page < maximumPage){
                yield put({
                    type:'save',
                    payload:{
                        imageList: page === 1 ? hits :[...imageList,...hits],
                        total,
                        page,
                        per_page
                    }
                })
            }else{
                yield put({
                    type:'save',
                    payload:{
                        hasMore: false
                    }
                })
            }
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