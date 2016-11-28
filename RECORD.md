# RECORD
## 2016-7-12 兼容ie8浏览器
-   react 15.x 以上不支持ie8
-   jquery 2.x 以上版本不支持ie8
-   babel-polyfill/es5-shim 修改内置API 比如扩展Object.assign,Object.freeze等
-   babel-plugin-transform-runtime transform-runtime只会对es6的语法进行转换，而不会对新api进行转换。
-   babel-preset-es2015-loose 生成的代码可能更快，对老的引擎有更好的兼容性，代码通常更简洁，更加的“ES5化”。但是随后从转译的ES6到原生的ES6时会遇到问题。不提倡这种做法
-   es3ify-loader 对于一些保留字的使用做了es3兼容,以及一些额外的处理，比如去除数组尾部的多余逗号、兼容ie8下default保留字
