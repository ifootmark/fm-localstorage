'use strict';

var localDataStore = {
    hname: location.hostname ? location.hostname : 'localStatus',
    isLocalStorage: window.localStorage && window.localStorage.getItem ? true : false,
    dataDom: null,
    initDom: function () {
        if (!this.dataDom) {
            try {
                this.dataDom = document.createElement('input');
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData');
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate() + 365;
                this.dataDom.expires = exDate.toUTCString();
            } catch (ex) {
                return false;
            }
        }
        return true;
    },
    set: function (key, value) {
        if (this.isLocalStorage) {
            window.localStorage.setItem(key, value);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.setAttribute(key, value);
                this.dataDom.save(this.hname)
            }
        }
    },
    get: function (key) {
        if (this.isLocalStorage) {
            return window.localStorage.getItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove: function (key) {
        if (this.isLocalStorage) {
            window.localStorage.removeItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.removeAttribute(key);
                this.dataDom.save(this.hname)
            }
        }
    },
    clear: function () {
        if (this.isLocalStorage) {
            window.localStorage.clear();
        }
    }
};

var DS = {
    set: function (key, value, expire) {
        if(key){
            if(!!expire){
                value.expire = currentTime() + expire * 1000;                
            }
            localDataStore.set('ift_'+key,JSON.stringify(value));
        }
    },
    get: function (key) {
        var val=localDataStore.get('ift_'+key);
        if(!!val){
            val=JSON.parse(val);
            if (val.expire && val.expire < currentTime()) {
                val = null;
            }            
        }
        return val;
    },
    getAll: function () {
        var data={}
        data.list=[];
        var keys = Object.keys(window.localStorage);
        keys.forEach(function(key){
            if(key.indexOf("ift_")>=0){
                var val=localDataStore.get(key);
                if(!!val){
                    val=JSON.parse(val);
                    if (val.expire && val.expire < currentTime()) {
                        val = null;
                    }
                }
                if(!!val){
                    data.list.push(val);
                }
            }
        });
        return data;
    },
    remove: function (key) {
        return localDataStore.remove('ift_'+key);
    },
    clear: function () {
        return localDataStore.clear();
    }
};
var currentTime = function () {
    return new Date().getTime();
};

(function(root, DS){
    if (typeof define === 'function' && define.amd) {
        define('DS',[], DS);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = DS;
    } else {
        root.DS = DS;
    }
})(this, DS);