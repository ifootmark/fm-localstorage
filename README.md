# fm-localstorage

## 安装

npm 安装

`npm install --save-dev fm-localstorage`

或者在 html 中直接引用

`<script src="./fm-localstorage.min.js"></script>`

## 使用方法

* [commonjs](#commonjs)
* [global](#global)
* [api](#api)

### commonjs
```javascript
var DS = require('./fm-localstorage');
DS.set(key,value);
```


### global
```javascript
<script src="./fm-localstorage.min.js"></script>
DS.set(key,value);
```

### api

```javascript
DS.set(key, value, expire); //expire 过期时间，单位秒
DS.get(key);
DS.getAll();
DS.remove(key);
DS.clear();
```

##	Demo
demo: [https://ifootmark.github.io/fm-localstorage/test/index.html](http://ifootmark.github.io/fm-localstorage/test/index.html)


## License
[MIT](https://github.com/ifootmark/fm-localstorage/blob/master/LICENSE)


© allmeet.net
