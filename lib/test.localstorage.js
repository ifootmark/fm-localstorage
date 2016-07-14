'use strict';

var DS = require('./fm-localstorage');

$(document).ready(function(){
    getDataList();
    $(".v-add").click(function(){
        addData();
    });

    $(".v-clear").click(function(){
        if(confirm('确定要清空数据吗?')){
            DS.clear();
            getDataList();
        }
    });
});

function addData(){
    var o_name=$('#brandName');
    var o_code=$('#brandCode');
    var o_remark=$('#remark');
    var jsonObj={};
    jsonObj.brandName=o_name.val();
    jsonObj.brandCode=o_code.val();
    jsonObj.remark=o_remark.val();
    if(jsonObj.brandName==""){
        o_name.focus();
        return false;
    }
    if(jsonObj.brandCode==""){
        o_code.focus();
        return false;
    }
    var o=DS.get(jsonObj.brandName);
    if(!!o){
        alert('此品牌名称已存在');
        return false;
    }
    DS.set(jsonObj.brandName,jsonObj);

    o_name.val('');
    o_code.val('');
    o_remark.val('');
    getDataList();
}

function getDataList(){
    var data=DS.getAll();
    if (data.list&&data.list.length>0) {
        $('.v-brand-list').show();
        var tpl = template('listtpl', data);
        $('.v-brand-list table tbody').html(tpl);
        $(".v-del").click(function(){
            if(confirm('确定要删除吗?')){
                var name=$(this).attr('tag-name');
                DS.remove(name);
                getDataList();
            }
        });
    }else{
        $('.v-brand-list table tbody').html('');
        $('.v-brand-list').hide();
    }
};
