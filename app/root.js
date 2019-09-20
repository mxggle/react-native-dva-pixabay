import React from 'react';
import { Provider  } from 'react-redux';
import App from './router'//    这个是react-navigation路由文件
import modelRegister from './models'
import { create } from 'dva-core';
import createLoading from 'dva-loading';

// 创建dva实例，可传递配置参数。https://dvajs.com/api/#app-dva-opts
const app = create({
    onError:(err,dispatch)=>{
        console.log(err)
    }
});

// 注册dvaloading插件
app.use(createLoading({}));

// 注册model
modelRegister(app)

// 实例初始化
app.start()

// 获取redux的store对象供react-redux使用
const store = app._store;

export default class Container extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}