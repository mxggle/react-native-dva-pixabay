import React from 'react';
import indexModel from './models/index'
import detailModel from './models/detail'
import { Provider  } from 'react-redux';
import App from './router'//    这个是react-navigation路由文件

import { create } from 'dva-core';
import createLoading from 'dva-loading';

const models = [indexModel,detailModel];

const app = create({
    onError:(err,dispatch)=>{
        console.log(err)
    }
}); // 创建dva实例，可传递配置参数。https://dvajs.com/api/#app-dva-opts

app.use(createLoading({}));

models.forEach((o) => { // 装载models对象
    app.model(o);
});

app.start() // 实例初始化
const store = app._store; // 获取redux的store对象供react-redux使用

export default class Container extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}