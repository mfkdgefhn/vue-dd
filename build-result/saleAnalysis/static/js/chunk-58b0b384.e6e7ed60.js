(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58b0b384"],{"0b6f":function(e,t,a){},"2f7e":function(e,t,a){"use strict";function n(e,t,a){var n=(e-1)*t;return n+t>=a.length?a.slice(n,a.length):a.slice(n,n+t)}a.d(t,"a",(function(){return n}))},"3f7e":function(e,t,a){},"4c9b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Top30"},[a("el-card",{staticClass:"crad",attrs:{shadow:"hover"}},[a("search-sale",{attrs:{title:e.table.title,loading:e.loading},on:{getAnalysis:e.getAnalysis,handleDownload:e.handleDownload,exportPdf:e.exportPdf}})],1),e._v(" "),e.page?a("el-card",{attrs:{"body-style":{padding:"0px 0px 50px 0px"}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{id:"pdfDom","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)","header-cell-style":{padding:"0px 0px"},data:e.table.tableData}},[a("el-table-column",{attrs:{label:"系统店铺业绩TOP30汇总",align:"center"}},[a("el-table-column",{attrs:{prop:"dayTop",label:"日业绩排名",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"customer",label:"经销商",align:"center",width:"200px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"storeName",label:"店铺名称",align:"center",width:"200px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dayTotAmtActual",label:"日业绩",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dayQty",label:"日销量",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dayAvgPrice",label:"日单价",align:"center"}})],1),e._v(" "),a("el-table-column",{attrs:{label:e.date,align:"center"}},[a("el-table-column",{attrs:{prop:"monTotAmtActual",label:"本月业绩",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"monQty",label:"本月销量",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"monAvgPrice",label:"本月日均销额",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearStorage",label:e.lastMaxToday,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearStorage1",label:e.lastToday,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearStorage2",label:e.today,align:"center"}})],1)],1)],1):e._e(),e._v(" "),e.page?a("el-card",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.table.currentPage,"page-sizes":e.table.pageSizes,"page-size":e.table.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.table.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):e._e()],1)},i=[],l=a("ab95"),o=a("ad8f"),r=a("ed08"),s=a("2f7e"),c=a("6f9c"),d={name:"Top30",components:{searchSale:l["a"]},data:function(){return{loading:!1,date:"",page:!1,total:0,today:(""+this.$moment().add(-1,"D").add(1,"M").year()).substring(2,4)+Object(c["b"])(this.$moment().add(-1,"D").add(1,"M")).ch+"库存",lastToday:(""+this.$moment().add(-1,"D").add(-2,"M").year()).substring(2,4)+Object(c["b"])(this.$moment().add(-1,"D").add(-2,"M")).ch+"库存",lastMaxToday:(""+this.$moment().add(-1,"D").add(-5,"M").year()).substring(2,4)+Object(c["b"])(this.$moment().add(-1,"D").add(-5,"M")).ch+"库存",table:{total:0,title:"top30",currentPage:1,pageSize:10,pageSizes:[10,20,30,40],tableData:[]}}},methods:{getAnalysis:function(e){var t=this;this.loading=!0,this.date="查询时间："+e.billdate,Object(o["e"])(e).then((function(e){t.table.currentPage=1,t.table.pageSize=10,t.page=!0,t.$store.dispatch("table/setTop30",e),t.table.total=e.length,t.table.tableData=Object(s["a"])(1,t.table.pageSize,e),t.loading=!1,t.$message({message:"查询完成!!!",type:"success"})})).catch((function(e){console.log(e)}))},handleSizeChange:function(e){this.table.pageSize=e,this.table.tableData=Object(s["a"])(this.table.currentPage,this.table.pageSize,this.$store.getters.top30)},handleCurrentChange:function(e){this.table.currentPage=e,this.table.tableData=Object(s["a"])(this.table.currentPage,this.table.pageSize,this.$store.getters.top30)},exportPdf:function(){this.getPdf(this.table.title)},handleDownload:function(e){var t=this;this.loading=!0,0!==this.table.tableData.length?(e=void 0===e?"":e,Promise.all([a.e("chunk-014a57fc"),a.e("chunk-581b2547")]).then(a.bind(null,"4bf8d")).then((function(a){var n=["日业绩排名","店铺名称","日业绩","日销量","日单价","本月业绩","本月销量","本月日均销额",t.lastMaxToday,t.lastToday,t.today],i=["dayTop","storeName","dayTotAmtActual","dayQty","dayAvgPrice","monTotAmtActual","monQty","monAvgPrice","yearStorage","yearStorage1","yearStorage2"],l=t.formatJson(i,e);a.export_json_to_excel({header:n,data:l,filename:t.table.title}),t.loading=!1}))):this.loading=!1},formatJson:function(e,t){var a=[];if("all"===t)a=this.$store.getters.top30;else{if("this"!==t)return;a=this.table.tableData}return a.map((function(t){return e.map((function(e){return"timestamp"===e?Object(r["b"])(t[e]):t[e]}))}))}}},u=d,p=(a("8370"),a("2877")),m=Object(p["a"])(u,n,i,!1,null,"a2c432d2",null);t["default"]=m.exports},5336:function(e,t,a){"use strict";var n=a("93dd"),i=a.n(n);i.a},6724:function(e,t,a){"use strict";a("8d41");var n="@@wavesContext";function i(e,t){function a(a){var n=Object.assign({},t.value),i=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),l=i.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var o=l.getBoundingClientRect(),r=l.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(o.width,o.height)+"px",l.appendChild(r)),i.type){case"center":r.style.top=o.height/2-r.offsetHeight/2+"px",r.style.left=o.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(a.pageY-o.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(a.pageX-o.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=i.color,r.className="waves-ripple z-active",!1}}return e[n]?e[n].removeHandle=a:e[n]={removeHandle:a},a}var l={bind:function(e,t){e.addEventListener("click",i(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[n].removeHandle,!1),e.addEventListener("click",i(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[n].removeHandle,!1),e[n]=null,delete e[n]}},o=function(e){e.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(o)),l.install=o;t["a"]=l},"6f9c":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return l}));var n=a("c1df");function i(e,t){e=void 0===e?0:e,t=void 0===t?"":t;var a=new Date;a.setDate(a.getDate()+e);var n=a.getFullYear(),i=a.getMonth()+1,l=a.getDate();return i=i>9?i:"0"+i,l=l>9?l:"0"+l,""===t?""+n+i+l:"Y"===t?""+n:"M"===t?""+i:"D"===t?""+l:"YM"===t?""+n+i:"MD"===t?""+i+l:"YMD"===t?""+n+i+l:""}function l(e){var t=void 0===e?n().month()+1:n(e).month()+1,a={};switch(t){case 1:case 2:case 3:a={ch:"春季",zh:"37"};break;case 4:case 5:case 6:a={ch:"夏季",zh:"38"};break;case 7:case 8:case 9:a={ch:"秋季",zh:"39"};break;case 10:case 11:case 12:a={ch:"冬季",zh:"40"};break;default:a="";break}return a}},8370:function(e,t,a){"use strict";var n=a("3f7e"),i=a.n(n);i.a},"8d41":function(e,t,a){},9292:function(e,t,a){},"93dd":function(e,t,a){},ab95:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"seach-length"},[a("el-row",{attrs:{gutter:10}},[a("el-col",[a("el-date-picker",{staticStyle:{"min-width":"300px","margin-bottom":"5px","font-size":"12px"},attrs:{type:"date","value-format":"yyyyMMdd",placeholder:"开始日期","picker-options":e.pickerOptions,format:"yyyyMMdd"},model:{value:e.listQuery.billdate,callback:function(t){e.$set(e.listQuery,"billdate",t)},expression:"listQuery.billdate"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search",loading:e.loading,disabled:e.loading},on:{click:e.handleFilter}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.loading,type:"primary",icon:"el-icon-download"},on:{click:function(t){return e.handleDownload("this")}}},[e._v("单页导出")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.loading,type:"primary",icon:"el-icon-download"},on:{click:function(t){return e.handleDownload("all")}}},[e._v("全部导出")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.loading,type:"primary",icon:"el-icon-download"},on:{click:e.exportPdf}},[e._v("PDF")]),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-message",circle:""},on:{click:e.tipsInfo}})],1)],1),e._v(" "),a("prompt-box",{attrs:{"dialog-visible":e.dialogVisible,title:e.title,"tips-data":e.tipsData},on:{handleClose:e.handleClose}})],1)},i=[],l=a("6724"),o=a("6f9c"),r=a("e251"),s={name:"SearchSale",directives:{waves:l["a"]},components:{promptBox:r["a"]},props:{loading:{type:Boolean,default:!1},title:{type:String,default:""}},data:function(){return{showAllLevels:!1,listQuery:{billdate:Object(o["a"])(-1)},storeOptions:[],restaurants:[],dialogVisible:!1,options:[],pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()-864e5}},tips:{top30:[{name:"店铺名称",description:"有零售数据的店铺"},{name:"日业绩",description:"查询日期的零售金额"},{name:"日销量",description:"查询日期的零售数量"},{name:"日单价",description:"日业绩/日销量,取整"},{name:"本月业绩",description:"查询日期月份的总零售金额"},{name:"本月销量",description:"查询日期月份的总零售数量"},{name:"本月日均销额",description:"本月业绩/本月销量天数"},{name:"季度库存",description:"查询当日的款号季度库存，12月能查春季库存、3月能查夏季库存、6月能查秋季库存、9月能查冬季库存"}],storeDayAvg:[{name:"经销商",description:"按客户区分"},{name:"当日店均销额",description:"查询日期所有门店零售金额/有零售数据的门店数量"},{name:"当日店均销量",description:"查询日期所有门店零售数量/有零售数据的门店数量"},{name:"当日店均单价",description:"所有门店零售金额/所有门店零售数量"},{name:"当月累计单店",description:"当月所有门店零售金额/有零售数据的门店数量/天数"},{name:"增长",description:"(当月累计单店-上年当月累计单店)/上年当月累计单店"},{name:"老店",description:"开店时间大于365天的店铺"},{name:"老店年日均",description:"当月所有门店零售金额/门店数量/天数"},{name:"老店日均增长",description:"(当月累计单店-上年当月累计单店)/上年当月累计单店"},{name:"老店年当日店均",description:"当日所有门店零售金额/门店数量"},{name:"日均增长",description:"(当日累计单店-上年当日累计单店)/上年当日累计单店"}],retailShare:[{name:"所属经销商",description:"按客户区分"},{name:"销量占比",description:"当日所有门店年份+季节款   零售总数量/当日所有零售数量"},{name:"均单价",description:"当日所有门店年份+季节款   零售总金额/当日年份+季节款零售总数量"},{name:"库存占比",description:"当日所有门店年份+季节款   库存/当日所有库存"},{name:"单店铺货量",description:"当日所有门店年份+季节款   库存/门店数量"}]}}},computed:{tipsData:function(){return"top30"===this.title?this.tips.top30:"系统客户日均单店"===this.title?this.tips.storeDayAvg:"零售占比"===this.title?this.tips.retailShare:["字段提示，提示板块开发中....."]}},methods:{handleDownload:function(e){this.$emit("handleDownload",e)},tipsInfo:function(e){this.dialogVisible=!this.dialogVisible},handleFilter:function(){var e=Object.assign({},this.listQuery);this.$emit("getAnalysis",e)},exportPdf:function(){this.$emit("exportPdf")},querySearch:function(e,t){var a=this.restaurants,n=e?a.filter(this.createFilter(e)):a;t(n)},createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}},handleClose:function(e){this.dialogVisible=!this.dialogVisible}}},c=s,d=(a("eef9"),a("2877")),u=Object(d["a"])(c,n,i,!1,null,"17cade55",null);t["a"]=u.exports},ad8f:function(e,t,a){"use strict";a.d(t,"e",(function(){return l})),a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return c}));var n=a("b775"),i="";function l(e){return Object(n["a"])({url:i+"/Q/r.do?o=qgrxTOP30",method:"get",params:e})}function o(e){return Object(n["a"])({url:i+"/Q/r.do?o=xtkhrjdd",method:"get",params:e})}function r(e){return Object(n["a"])({url:i+"/Q/r.do?o=djlszb",method:"get",params:e})}function s(e){return Object(n["a"])({url:i+"/Q/r.do?o=xsfxJxc",method:"get",params:e})}function c(e){return Object(n["a"])({url:i+"/Q/r.do?o=bmjg",method:"get",params:e})}},e251:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.dialogVisible,title:e.title,width:"50%","before-close":e.handleClose,"custom-class":"dialog-class"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-table",{attrs:{data:e.tipsData}},[a("el-table-column",{attrs:{property:"name",label:"字段名",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{property:"description",label:"字段说明"}})],1)],1)},i=[],l={props:{dialogVisible:{type:Boolean,default:!1},tipsData:{type:Array,default:function(){return[]}},title:{type:String,default:""}},data:function(){return{}},watch:{},methods:{handleClose:function(e){this.$emit("handleClose",!1)}}},o=l,r=(a("f39b"),a("5336"),a("2877")),s=Object(r["a"])(o,n,i,!1,null,"51e89278",null);t["a"]=s.exports},eef9:function(e,t,a){"use strict";var n=a("9292"),i=a.n(n);i.a},f39b:function(e,t,a){"use strict";var n=a("0b6f"),i=a.n(n);i.a}}]);