## main.js引入
```
import willUtil from "@/components/will_util/will_util"
```
|属性名				|类型				|默认值				|说明	|
|--						|--					|--						|--		|
|request			|function		|无						|			|
|showToast		|function		|mask:false		|title显示的内容 mask是否防止触摸穿透 默认false|
|showLoading	|function		|title:加载中...		|title显示的内容 默认加载中... mask是否防止触摸穿透 默认false|
|checkPhone		|function		|无						|phone 传入手机号返回是否符合手机号规则true false| 
|POP					|function		|/pages/index/index	|检测到实体键返回时触发的方法 默认跳转到index页面| 
|addPOP				|function		|无						|fn 传入POP 在onShow监听实体键 挂载POP| 
|removePOP		|function		|无						|fn 传入POP 在onHide卸载监听实体键 卸载POP| 
|isLoad		|function		|无						|判断是否有userid 返回true false|
|checkLogin		|function		|无						|调用isLoad 判断是否有userid 没有的话跳转去登录|
|getUserId		|function		|无						|返回 userid|
 
 ## POP addPOP removePOP
 ```
 onShow() {
 	this.addPOP(this.POP); 
 },
 onHide() {
 	this.removePOP(this.POP);
 }
 ```