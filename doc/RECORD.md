# RECORD
### 2016-7-12 兼容ie8浏览器
-   react 15.x 以上不支持ie8
-   jquery 2.x 以上版本不支持ie8
-   babel-polyfill/es5-shim 修改内置API 比如扩展Object.assign,Object.freeze等
-   babel-plugin-transform-runtime transform-runtime只会对es6的语法进行转换，而不会对新api进行转换。
-   babel-preset-es2015-loose 生成的代码可能更快，对老的引擎有更好的兼容性，代码通常更简洁，更加的“ES5化”。但是随后从转译的ES6到原生的ES6时会遇到问题。不提倡这种做法
-   es3ify-loader 对于一些保留字的使用做了es3兼容,以及一些额外的处理，比如去除数组尾部的多余逗号、兼容ie8下default保留字

### react version 15.0
+ 加入了document.createElement，取消了data-reactid。
+ 取消额外的 span 标记
+ 渲染返回null目前改成了注释节点
+ 函数组件也可返回null
+ 改进对SVG的支持
+ React.cloneElement()现在包括defaultProps

#### 删除内容
+ 从React顶层输出中移除的API包括：findDOMNode、render、renderToString、renderToStaticMarkup以及unmountComponentAtNode。这些API现在在ReactDOM和ReactDOMServer中可用。
+ 移除的插件包括：batchedUpdates以及cloneWithProps。
+ 移除的组件实例方法包括：setProps、replaceProps以及getDOMNode。
+ CommonJS react/addons入口点也不再使用，在此提醒：可以使用单独的react-addons-*软件包来替代，不过只适用于使用CommonJS软件包时。
+ 将children发送给类似input之类的空元素的做法被取消了，现在改成抛出异常。
+ 在DOM refs（例如this.refs.div.props）中使用React-specific属性的做法也被删除了。

#### 下一版的取消功能提示，请注意
+ 由于使用率过低，LinkedStateMixin与valueLink将会被废弃掉。如果你需要相应功能，可以使用wrapper组件来实现同样的功能：react-linked-input
+ React的未来版本中会将input value={null}作为请求来清除输入内容。然而，React 0.14版本中忽略了value={null}，在React 15中，如果输出值为空，则会发出警告并要求你写明目的。要想消除警告，可以发送空字符串清除受约束的输入内容，或者发送undefined让输入内容不受约束。
+ ReactPerf.printDOM()被重新命名为ReactPerf.printOperations()，而ReactPerf.getMeasurementsSummaryMap()则被重新命名为ReactPerf.getWasted()。
