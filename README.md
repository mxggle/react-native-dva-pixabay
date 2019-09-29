# 图片素材浏览App
## Preface
基于react-native一个浏览图片素材的App

我用的是一个图片网站[pixabay](https://pixabay.com/)的API（有没有免费好用的api推荐一下，豆瓣好像用不了了,后面可能会换成unsplash的api），启动项目可能需要翻墙，请求次数也有限制。

接下来主要介绍一下实现的技术栈和主要内容，具体的细节和代码请参考 [react-native-pixabay](https://github.com/mxggle/react-native-dva) 当前最新代码在`develop`分支上


## 使用的技术栈
`react-native` `react-navigation` `dva-core` `axios`
## 预览
[live demo](https://url.cn/5LhZMnW)
## start

- install
  ```
  npm install
  ```
- iOS

  ```
  react-native run-ios
  ```
- android

  ```
  react-native run-android
  ```

## 主要内容
1. 由于在Web端`dva2.0`封装的是`React-Router4` 在`React-Native`下无法使用，这里我们只需要引入`dva-core`;
使用dva的js文件如下。

	```javascript
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
	```

2. models 里面使用subscriptions的问题

	dva没法通过像web端那样，通过`setup`方法的`history`去判断当前路由匹配到的页面，或者说当前focus的screen。我暂时没有找到比较好的，在model内进行页面初始化的方式。暂时使用了`react-navigation`提供的高阶组件[withNavigationFocus HOC](https://reactnavigation.org/docs/en/with-navigation-focus.html#docsNav)，它会传递一个`isFocused `参数，该参数可以在被包裹组件的props中取得。
	
3. 关于将`navigation state`也放入`Redux`的问题
	正常情况下`react-navigation`会自己维护应用的导航状态，官方也提出不需要特地将导航状态交给redux
	>**Can I store the navigation state in Redux too?**
	
	>This is technically possible, but we don't recommend it - it's too easy to shoot yourself in the foot and slow down / break your app. We encourage you to leave it up to React Navigation to manage the navigation state. But if you really want to do this, you can use react-navigation-redux-helpers, but this isn't an officially supported workflow.
	
	社区提供了[`react-navigation-redux-helpers`](https://github.com/react-navigation/redux-helper),在业务场景较为复杂时能用得上。比如可以自定义actions，维持应用的导航状态，维护应用业务逻辑state，和导航state的一致性等，具体实现方式有待研究。

4. 在RN中使用绝对路径的方法（类似web项目中的@ alias）
    1. 在你想引用的文件夹内创建一个`package.json`文件，写入`{ “name”: “FOLDER_NAME” }`
    2. 在其他文件内直接使用`FOLDER_NAME/thing`
    
    比如你想引用`utils`文件夹下的文件（util.js），那就在`utils`文件夹下创建一个`package.json`，写入`{ “name”: “utils” }`,那么其他地方就可以通过，`utils/util`引用到这个文件了。
 >参考: [How to Use Absolute Paths in React Native](https://medium.com/@davidjwoody/how-to-use-absolute-paths-in-react-native-6b06ae3f65d1)
5. 动画Animated

好的交互动画能提高用户的体验，也一定程度上提高用户对App的认同感。
React Native本身提供了Animated这个API，它声明式的写法和React语法可以很好的结合，我在这个App中也应用了动画，具体见home页面的header相关组件,开发体验上来说，熟悉了它的语法之后，个人感觉挺好用的。可由于受到样式的限制，可能在实现特别复杂的动画上无法胜任。简单动画应该OK。我也找了一些第三方动画库，这里只做一下记录，有需要的时候可以去研究一下。
- [react-native-animatable](https://github.com/oblador/react-native-animatable)
- [react-native-motion](https://github.com/xotahal/react-native-motion)
- [Lottie](https://airbnb.io/lottie/#/)
- [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated)
- [rnal](https://github.com/hayanisaid/rnal)

另外推荐一个文章[animation-react-native-part-1](https://blog.pusher.com/animation-react-native-part-1/)以及它对应的项目[RNRealworldAnimations](https://github.com/anchetaWern/RNRealworldAnimations)，作者分步骤讲解了如何实现一个App一系列的动画.对动画感兴趣的可以看一下。

6. 未完待续。。。

>注：本项目仅用于学习react-native