(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1766b374"],{"16cc":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"retail-analysis"},[s("el-card",{staticClass:"crad",attrs:{shadow:"hover"}},[s("search",{attrs:{loading:t.loading},on:{getAnalysis:t.getAnalysis}})],1),t._v(" "),t.loadingCon?s("div",{staticClass:"el-row-class"},[s("el-row",{attrs:{gutter:10}},[s("el-col",{staticClass:"el-col-class",attrs:{lg:12,md:12,sm:12,xs:24}},[s("el-card",{staticClass:"el-card-class",attrs:{shadow:"hover"}},[s("pie-echarts",{staticClass:"pie-class",staticStyle:{height:"300px"},attrs:{data:t.discountRate,"tips-data":t.tipsData,title:t.discountRate.title,loading:t.loading}})],1)],1),t._v(" "),s("el-col",{staticClass:"el-col-class",attrs:{lg:12,md:12,sm:12,xs:24}},[s("el-card",{staticClass:"el-card-class",attrs:{shadow:"hover"}},[s("pie-echarts",{staticClass:"pie-class",staticStyle:{height:"300px"},attrs:{data:t.singleSum,"tips-data":t.tipsData,title:t.singleSum.title,loading:t.loading}})],1)],1)],1),t._v(" "),s("el-row",{attrs:{gutter:10}},[s("el-col",{staticClass:"el-col-class",attrs:{lg:12,md:12,sm:12,xs:24}},[s("el-card",{staticClass:"el-card-class",attrs:{shadow:"hover"}},[s("pie-echarts",{staticClass:"pie-class",staticStyle:{height:"300px"},attrs:{data:t.membershipScore,"tips-data":t.tipsData,title:t.membershipScore.title,loading:t.loading}})],1)],1),t._v(" "),s("el-col",{staticClass:"el-col-class",attrs:{lg:12,md:12,sm:12,xs:24}},[s("el-card",{staticClass:"el-card-class",attrs:{shadow:"hover"}},[s("pie-echarts",{staticClass:"pie-class",staticStyle:{height:"300px"},attrs:{data:t.CommodityCategory,"tips-data":t.tipsData,title:t.CommodityCategory.title,loading:t.loading}})],1)],1)],1)],1):t._e()],1)},i=[],l=(s("7f7f"),s("ac6a"),s("a44d")),c=s("7d59"),o=s("5eb0"),n={name:"VipAnalysis",components:{Search:l["a"],pieEcharts:c["a"]},data:function(){return{loading:!1,loadingCon:!0,loadCount:0,discountRate:{title:"折扣率",data:[]},singleSum:{title:"单笔金额",data:[]},membershipScore:{title:"会员积分",data:[]},CommodityCategory:{title:"商品类别",data:[]},title:"根据查询条件进行查询数据(该报表只查询会员数据)",tipsData:[{name:"折扣率：",description:"以会员折扣比例为维度"},{name:"单笔金额：",description:"以单笔金额为维度"},{name:"会员积分：",description:"以会员积分为维度"},{name:"商品类别：",description:"以商品类别为维度"}]}},watch:{loadCount:function(t){t%4===0&&(this.loading=!1,this.$message({message:"查询完成!",type:"success",duration:2e3}))}},mounted:function(){},methods:{getProductType:function(){var t=this;Object(o["n"])().then((function(a){for(var s=a.result,e="",i=[],l=0;l<s.length;l++)e={value:Math.round(1e3*Math.random()),name:s[l].attribname},i.push(e);t.CommodityCategory.data=i}))},getAnalysis:function(t){var a=this;this.loadingCon=!0,this.loading=!0,Object(o["e"])(t).then((function(t){a.discountRate.data=a.getObject(t.result),a.loadCount++})),Object(o["q"])(t).then((function(t){a.singleSum.data=a.getObject(t.result),a.loadCount++})),Object(o["j"])(t).then((function(t){a.membershipScore.data=a.getObject(t.result),a.loadCount++})),Object(o["c"])(t).then((function(t){a.CommodityCategory.data=a.getObject(t.result),a.loadCount++}))},getObject:function(t){var a=[];return t.forEach((function(t){var s={};s.name=t.name,s.value=t.qty,a.push(s)})),a}}},r=n,d=(s("672a"),s("2877")),u=Object(d["a"])(r,e,i,!1,null,null,null);a["default"]=u.exports},"672a":function(t,a,s){"use strict";var e=s("cd32"),i=s.n(e);i.a},cd32:function(t,a,s){}}]);