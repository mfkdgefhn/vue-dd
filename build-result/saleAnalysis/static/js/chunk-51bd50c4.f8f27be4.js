(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51bd50c4"],{"056e":function(t,e,a){"use strict";var n=a("f8f1"),i=a.n(n);i.a},1725:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"seach-length"},[a("el-row",{attrs:{gutter:10}},[a("el-col",[a("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.load}},[t._v(t._s("true"===t.loading?"加载中":t.title))]),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:t.loading,type:"primary",icon:"el-icon-download"},on:{click:function(e){return t.handleDownload("this")}}},[t._v("导出")]),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:t.loading,type:"primary",icon:"el-icon-download"},on:{click:t.exportPdf}},[t._v("PDF")]),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-message",circle:""},on:{click:t.tipsInfo}})],1)],1),t._v(" "),a("prompt-box",{attrs:{"dialog-visible":t.dialogVisible,title:t.title,"tips-data":t.tipsData},on:{handleClose:t.handleClose}})],1)},i=[],o=a("6724"),l=a("e251"),s={name:"SearchSaleNew",directives:{waves:o["a"]},components:{promptBox:l["a"]},props:{loading:{type:Boolean,default:!1},title:{type:String,default:""}},data:function(){return{dialogVisible:!1,tips:{inSaleStorage:[{name:"区域",description:"根据地域不同分为南区、北区"},{name:"经销商",description:"以客户区分"},{name:"发货量",description:"出库数量"},{name:"余货量",description:"订单数量-发货数量"},{name:"批发数量",description:"销售给二级经销商的数量"},{name:"零售数量",description:"季度总零售数量"},{name:"整体单价",description:"季度款 总零售数量/零售数量"},{name:"整体售罄率",description:"(批发数量+零售数量)/(批发数量+零售数量+总库存)"},{name:"毛利率",description:"(累计销售金额-累计成本)/累计销售金额"},{name:"仓存",description:"季度款 仓库库存"},{name:"总库存",description:"季度款总库存(包括仓库+所有门店)"},{name:"铺店数",description:"门店数量(排除店仓：加盟、特卖、店名带仓、福利店)"},{name:"单店存",description:"所有门店季度款  总库存/门店数量"}],layoutStructure:[{name:"经销商",description:"以客户区分"},{name:"品名",description:"款号字段MID6，版面结构来区分"},{name:"款数",description:"款号N总数量"},{name:"SKU",description:"款号总数量"},{name:"客户批发",description:"1级销售给2级经销商的数量"},{name:"累销",description:"所有门店的零售数量"},{name:"上周",description:"昨日往前14天的零售数量"},{name:"本周",description:"昨日往前7天的零售数量"},{name:"量环比",description:"(本周-上周)/上周"},{name:"累计毛利率",description:"(累计零售金额-累计成本)/累计零售金额"},{name:"均成本",description:"出厂价平均值"},{name:"总单价",description:"所有门店零售总金额/总数量"},{name:"上周",description:"昨日往前14天零售总单价"},{name:"本周",description:"昨日往前7天零售总单价"},{name:"单价变化",description:"本周-上周"},{name:"仓库数量",description:"对应仓库库存数量"},{name:"店铺数量",description:"对应门店库存数量"},{name:"售罄率",description:"(批发+累销)/(批发+累销+仓库+店铺)"},{name:"周存销",description:"店铺数量/((直营销售上周+直营销售本周)/2)"}]}}},computed:{tipsData:function(){return this.title.indexOf("进销存")>=0?this.tips.inSaleStorage:this.title.indexOf("版面结构")>=0?this.tips.layoutStructure:"字段提示，提示板块开发中....."}},methods:{load:function(){this.$emit("editTitle")},tipsInfo:function(t){this.dialogVisible=!this.dialogVisible},handleDownload:function(t){this.$emit("handleDownload",t)},exportPdf:function(){this.$emit("exportPdf")},handleClose:function(t){this.dialogVisible=!this.dialogVisible}}},r=s,c=(a("6f93"),a("2877")),d=Object(c["a"])(r,n,i,!1,null,"5fcaeaea",null);e["a"]=d.exports},5336:function(t,e,a){"use strict";var n=a("93dd"),i=a.n(n);i.a},6724:function(t,e,a){"use strict";a("8d41");var n="@@wavesContext";function i(t,e){function a(a){var n=Object.assign({},e.value),i=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),o=i.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var l=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(l.width,l.height)+"px",o.appendChild(s)),i.type){case"center":s.style.top=l.height/2-s.offsetHeight/2+"px",s.style.left=l.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-l.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-l.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=i.color,s.className="waves-ripple z-active",!1}}return t[n]?t[n].removeHandle=a:t[n]={removeHandle:a},a}var o={bind:function(t,e){t.addEventListener("click",i(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[n].removeHandle,!1),t.addEventListener("click",i(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[n].removeHandle,!1),t[n]=null,delete t[n]}},l=function(t){t.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(l)),o.install=l;e["a"]=o},"6f93":function(t,e,a){"use strict";var n=a("9ab4"),i=a.n(n);i.a},"6f9c":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return o}));var n=a("c1df");function i(t,e){t=void 0===t?0:t,e=void 0===e?"":e;var a=new Date;a.setDate(a.getDate()+t);var n=a.getFullYear(),i=a.getMonth()+1,o=a.getDate();return i=i>9?i:"0"+i,o=o>9?o:"0"+o,""===e?""+n+i+o:"Y"===e?""+n:"M"===e?""+i:"D"===e?""+o:"YM"===e?""+n+i:"MD"===e?""+i+o:"YMD"===e?""+n+i+o:""}function o(t){var e=void 0===t?n().month()+1:n(t).month()+1,a={};switch(e){case 1:case 2:case 3:a={ch:"春季",zh:"37"};break;case 4:case 5:case 6:a={ch:"夏季",zh:"38"};break;case 7:case 8:case 9:a={ch:"秋季",zh:"39"};break;case 10:case 11:case 12:a={ch:"冬季",zh:"40"};break;default:a="";break}return a}},"8d41":function(t,e,a){},"93dd":function(t,e,a){},"9ab4":function(t,e,a){},a010:function(t,e,a){"use strict";var n=a("fbe4"),i=a.n(n);i.a},ad8f:function(t,e,a){"use strict";a.d(e,"e",(function(){return o})),a.d(e,"d",(function(){return l})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return c}));var n=a("b775"),i="";function o(t){return Object(n["a"])({url:i+"/Q/r.do?o=qgrxTOP30",method:"get",params:t})}function l(t){return Object(n["a"])({url:i+"/Q/r.do?o=xtkhrjdd",method:"get",params:t})}function s(t){return Object(n["a"])({url:i+"/Q/r.do?o=djlszb",method:"get",params:t})}function r(t){return Object(n["a"])({url:i+"/Q/r.do?o=xsfxJxc",method:"get",params:t})}function c(t){return Object(n["a"])({url:i+"/Q/r.do?o=bmjg",method:"get",params:t})}},e251:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.dialogVisible,title:t.title,width:"50%","before-close":t.handleClose,"custom-class":"dialog-class"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-table",{attrs:{data:t.tipsData}},[a("el-table-column",{attrs:{property:"name",label:"字段名",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{property:"description",label:"字段说明"}})],1)],1)},i=[],o={props:{dialogVisible:{type:Boolean,default:!1},tipsData:{type:Array,default:function(){return[]}},title:{type:String,default:""}},data:function(){return{}},watch:{title:function(t){console.log(t)}},methods:{handleClose:function(t){this.$emit("handleClose",!1)}}},l=o,s=(a("056e"),a("5336"),a("2877")),r=Object(s["a"])(l,n,i,!1,null,"4e0d5540",null);e["a"]=r.exports},f21f:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"InSaleStorage"},[a("el-card",{attrs:{"body-style":{padding:"0px 0px 50px 0px"}}},[a("el-row",{staticClass:"menu-class"},[a("el-col",[a("search-sale-new",{attrs:{loading:t.loading,title:t.table.title},on:{editTitle:t.editTitle,handleDownload:t.handleDownload,exportPdf:t.exportPdf}})],1)],1),t._v(" "),a("el-row",[a("el-col",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{id:"pdfDom","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",data:t.table.tableData,"row-style":t.rowStyle}},[a("el-table-column",{attrs:{prop:"area",label:"区域",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"customer",label:"经销商",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"outGoodsCount",label:"发货量",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"surplusGoodsCount",label:"余货量",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"wholesaleCount",label:"批发数量",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"retailCount",label:"零售数量",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"unitPrice",label:"整体单价",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"wholeSaleRate",label:"整体售罄率",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"grossMarginRate",label:"毛利率",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"storage",label:"仓库",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"allStorage",label:"总库存",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"storeNum",label:"铺店数",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"storeStorage",label:"单店存",align:"center"}})],1)],1)],1)],1)],1)},i=[],o=a("1725"),l=a("ad8f"),s=a("ed08"),r=a("6f9c"),c={name:"InSaleStorage",components:{searchSaleNew:o["a"]},data:function(){return{loading:!1,lastDate:this.$moment().add(-1,"D").add(-3,"M").format("YYYYMMDD"),today:this.$moment().add(-1,"D").format("YYYYMMDD"),isThisYear:!0,table:{htmlTitle:this.$moment(this.today).year()+"年"+Object(r["b"])(this.today).ch+"进销存",title:this.$moment(this.today).year()+"年"+Object(r["b"])(this.today).ch+"进销存",year:this.$moment(this.today).year(),season:Object(r["b"])(this.today).zh,tableData:[]}}},computed:{},watch:{isThisYear:function(t,e){t?(this.table.htmlTitle=this.$moment(this.today).year()+"年"+Object(r["b"])(this.today).ch+"进销存",this.table.title=this.$moment(this.today).year()+"年"+Object(r["b"])(this.today).ch+"进销存",this.table.year=this.$moment(this.today).year(),this.table.season=Object(r["b"])(this.today).zh):(this.table.htmlTitle=this.$moment(this.lastDate).year()+"年"+Object(r["b"])(this.lastDate).ch+"进销存",this.table.title=this.$moment(this.lastDate).year()+"年"+Object(r["b"])(this.lastDate).ch+"进销存",this.table.year=this.$moment(this.lastDate).year(),this.table.season=Object(r["b"])(this.lastDate).zh),this.getAnalysis()}},created:function(){this.isThisYear=!0,this.getAnalysis()},methods:{exportPdf:function(){this.getPdf(this.table.htmlTitle)},editTitle:function(){this.isThisYear=!this.isThisYear},getAnalysis:function(){var t=this;this.loading=!0,this.table.tableData=[],Object(l["a"])({year:this.table.year,season:this.table.season}).then((function(e){t.$store.dispatch("table/setInSaleStorage",e),t.table.tableData=e,t.loading=!1,t.$message({message:"查询完成!!!",type:"success"})}))},handleDownload:function(t){var e=this;this.loading=!0,0!==this.table.tableData.length?(t=void 0===t?"":t,Promise.all([a.e("chunk-014a57fc"),a.e("chunk-581b2547")]).then(a.bind(null,"4bf8d")).then((function(a){var n=["区域","经销商","发货量","余货量","批发数量","零售数量","整体单价","整体售罄率","毛利率","仓库","总库存","铺店数","单店存"],i=["area","customer","outGoodsCount","surplusGoodsCount","wholesaleCount","retailCount","unitPrice","wholeSaleRate","grossMarginRate","storage","allStorage","storeNum","storeStorage"],o=e.formatJson(i,t);a.export_json_to_excel({header:n,data:o,filename:e.table.htmlTitle}),e.loading=!1}))):this.loading=!1},formatJson:function(t,e){var a=[];return a=this.$store.getters.inSaleStorage,a.map((function(e){return t.map((function(t){return"timestamp"===t?Object(s["b"])(e[t]):e[t]}))}))},rowStyle:function(t){var e=t.row;t.rowIndex;return"区域汇总"===e.customer?"background: #DFE6ED":""}}},d=c,u=(a("a010"),a("2877")),h=Object(u["a"])(d,n,i,!1,null,"3fc5b101",null);e["default"]=h.exports},f8f1:function(t,e,a){},fbe4:function(t,e,a){}}]);