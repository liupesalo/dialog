define("arale/dialog/1.1.0/dialog",["$","arale/overlay/1.1.0/overlay","arale/position/1.0.1/position","arale/iframe-shim/1.0.2/iframe-shim","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.1.0/class","arale/events/1.1.0/events","arale/overlay/1.1.0/mask","arale/templatable/0.9.0/templatable","gallery/handlebars/1.0.2/handlebars","./dialog.handlebars"],function(a,b,c){function d(a){null==a.attr("tabindex")&&a.attr("tabindex","-1")}function e(a){var b=a[0].contentWindow.document;return b.body.scrollHeight&&b.documentElement.scrollHeight?Math.min(b.body.scrollHeight,b.documentElement.scrollHeight):b.documentElement.scrollHeight?b.documentElement.scrollHeight:b.body.scrollHeight?b.body.scrollHeight:void 0}var f=a("$"),g=a("arale/overlay/1.1.0/overlay"),h=a("arale/overlay/1.1.0/mask"),i=a("arale/events/1.1.0/events"),j=a("arale/templatable/0.9.0/templatable"),k="300px",l=g.extend({Implements:j,attrs:{template:a("./dialog.handlebars"),trigger:{value:null,getter:function(a){return f(a)}},classPrefix:"ui-dialog",content:{value:null,setter:function(a){return/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(a)&&(this._type="iframe"),a}},hasMask:!0,closeTpl:"×",width:500,height:null,effect:"none",zIndex:999,autoFit:!0,align:{selfXY:["50%","50%"],baseXY:["50%","50%"]}},parseElement:function(){this.set("model",{classPrefix:this.get("classPrefix")}),l.superclass.parseElement.call(this),this.contentElement=this.$("[data-role=content]"),this.contentElement.css({background:"#fff",height:"100%",zoom:1}),this.$("[data-role=close]").hide()},events:{"click [data-role=close]":function(a){a.preventDefault(),this.hide()}},show:function(){return"iframe"===this._type&&(!this.get("height")&&this.element.css("height",k),this._showIframe()),l.superclass.show.call(this),this},hide:function(){return"iframe"===this._type&&this.iframe&&(this.iframe.attr({src:"javascript:'';"}),this.iframe.remove(),this.iframe=null),l.superclass.hide.call(this),clearInterval(this._interval),delete this._interval,this},destroy:function(){return this.element.remove(),this.get("hasMask")&&h.hide(),clearInterval(this._interval),l.superclass.destroy.call(this)},setup:function(){l.superclass.setup.call(this),this._setupTrigger(),this._setupMask(),this._setupKeyEvents(),this._setupFocus(),d(this.element),d(this.get("trigger")),this.activeTrigger=this.get("trigger").eq(0)},_onRenderContent:function(a){if("iframe"!==this._type){var b;try{b=f(a)}catch(c){b=[]}b[0]?this.contentElement.empty().append(b):this.contentElement.empty().html(a)}},_onRenderCloseTpl:function(a){""===a?this.$("[data-role=close]").html(a).hide():this.$("[data-role=close]").html(a).show()},_onRenderVisible:function(a){a?"fade"===this.get("effect")?this.element.fadeIn(300):this.element.show():this.element.hide()},_setupTrigger:function(){this.delegateEvents(this.get("trigger"),"click",function(a){a.preventDefault(),this.activeTrigger=f(a.currentTarget),this.show()})},_setupMask:function(){var a,b=this.get("hasMask"),c=parseInt(this.get("zIndex"),10);this.before("show",function(){b&&(a=h.get("zIndex"),h.set("zIndex",c-1).show())}),this.after("hide",function(){b&&h.set("zIndex",a).hide()})},_setupFocus:function(){this.after("show",function(){this.element.focus()}),this.after("hide",function(){this.activeTrigger&&this.activeTrigger.focus()})},_setupKeyEvents:function(){this.delegateEvents(f(document),"keyup",function(a){27===a.keyCode&&this.get("visible")&&this.hide()})},_showIframe:function(){var a=this;this.iframe||this._createIframe(),this.iframe.attr({src:this._fixUrl(),name:"dialog-iframe"+(new Date).getTime()}),this.iframe.one("load",function(){a.get("visible")&&(a.get("autoFit")&&(clearInterval(a._interval),a._interval=setInterval(function(){a._syncHeight()},300)),a._syncHeight(),a._setPosition(),a.trigger("complete:show"))})},_fixUrl:function(){var a=this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);return a.shift(),a[1]=(a[1]&&"?"!==a[1]?a[1]+"&":"?")+"t="+(new Date).getTime(),a.join("")},_createIframe:function(){var a=this;this.iframe=f("<iframe>",{src:"javascript:'';",scrolling:"no",frameborder:"no",allowTransparency:"true",css:{border:"none",width:"100%",display:"block",height:"100%",overflow:"hidden"}}).appendTo(this.contentElement),i.mixTo(this.iframe[0]),this.iframe[0].on("close",function(){a.hide()})},_syncHeight:function(){var a;if(this.get("height"))clearInterval(this._interval),delete this._interval;else{try{this._errCount=0,a=e(this.iframe)+"px"}catch(b){this._errCount=(this._errCount||0)+1,this._errCount>=6&&(a=k,clearInterval(this._interval),delete this._interval)}this.element.css("height",a),this.element[0].className=this.element[0].className}}});c.exports=l}),define("arale/dialog/1.1.0/dialog.handlebars",["gallery/handlebars/1.0.2/runtime"],function(a,b,c){var d=a("gallery/handlebars/1.0.2/runtime"),e=d.template;c.exports=e(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||{};for(var f in a.helpers)c[f]=c[f]||a.helpers[f];e=e||{};var g,h="",i="function",j=this.escapeExpression;return h+='<div class="',(g=c.classPrefix)?g=g.call(b,{hash:{},data:e}):(g=b.classPrefix,g=typeof g===i?g.apply(b):g),h+=j(g)+'">\n    <div class="',(g=c.classPrefix)?g=g.call(b,{hash:{},data:e}):(g=b.classPrefix,g=typeof g===i?g.apply(b):g),h+=j(g)+'-close" title="关闭本框" data-role="close"></div>\n    <div class="',(g=c.classPrefix)?g=g.call(b,{hash:{},data:e}):(g=b.classPrefix,g=typeof g===i?g.apply(b):g),h+=j(g)+'-content" data-role="content"></div>\n</div>\n'})});
