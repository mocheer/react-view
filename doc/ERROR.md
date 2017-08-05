# error
1. Warning:Each child in an array or iterator should have a unique "key" prop. 
- 原因：react对dom做遍历的时候，会根据data-reactid生成虚拟dom树。如果你没有手动的添加unique constant key的话，react是无法记录你的dom操作的。它只会在重新渲染的时候，继续使用相应dom数组的序数号(就是array[index]这种)来比对dom树。最开始做react-map时用的div+img不添加key时，panTo时一般不会添加新的img而是用的旧的img，因为是根据序号所以所有的img都会变动，所以性能不佳，以瓦片坐标做key值时，panTo性能就提升了。
- 解决：添加key 或者 升级react版本

2. Warning: render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.
- 原因：这个错误是在创建ReactDOM.render()时,放置的容器使用了document.body || document.getElementsByTagName('body')[0]等引起的错误，这样写会把第三方其他js给覆盖掉。
- 解决：避免使用body作为容器，使用其他标签作为容器，即可解决。

3. webpack build:You may need an appropriate loader to handle this file type.
- 原因: 引入第三方包，没有用对应的loader解析


