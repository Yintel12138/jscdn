(function(a){a.fn.barfiller=function(h){var c=a.extend({barColor:"#16b597",tooltip:true,duration:1000,animateOnResize:true,symbol:"%"},h);var g=a(this);var j=a.extend(c,h);var b=g.width();var d=g.find(".fill");var k=g.find(".tip");var e=d.attr("data-percentage");var i;var m=false;var l;var f={init:function(){return this.each(function(){if(f.getTransitionSupport()){m=true;l=f.getTransitionPrefix()}f.appendHTML();f.setEventHandlers();f.initializeItems()})},appendHTML:function(){d.css("background",j.barColor);if(!j.tooltip){k.css("display","none")}k.text(e+j.symbol)},setEventHandlers:function(){if(j.animateOnResize){a(window).on("resize",function(n){clearTimeout(i);i=setTimeout(function(){f.refill()},300)})}},initializeItems:function(){var n=f.calculateFill(e);g.find(".tipWrap").css({display:"inline"});if(m){f.transitionFill(n)}else{f.animateFill(n)}},getTransitionSupport:function(){var o=document.body||document.documentElement,p=o.style;var n=p.transition!==undefined||p.WebkitTransition!==undefined||p.MozTransition!==undefined||p.MsTransition!==undefined||p.OTransition!==undefined;return n},getTransitionPrefix:function(){if(/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase())){return"-moz-transition"}if(/webkit/.test(navigator.userAgent.toLowerCase())){return"-webkit-transition"}if(/opera/.test(navigator.userAgent.toLowerCase())){return"-o-transition"}if(/msie/.test(navigator.userAgent.toLowerCase())){return"-ms-transition"}else{return"transition"}},getTransition:function(q,o,p){var n;if(p==="width"){n={width:q}}else{if(p==="left"){n={left:q}}}o=o/1000;n[l]=p+" "+o+"s ease-in-out";return n},refill:function(){d.css("width",0);k.css("left",0);b=g.width();f.initializeItems()},calculateFill:function(o){o=o*0.01;var n=b*o;return n},transitionFill:function(n){var o=n-k.width();d.css(f.getTransition(n,j.duration,"width"));k.css(f.getTransition(o,j.duration,"left"))},animateFill:function(n){var o=n-k.width();d.stop().animate({width:"+="+n},j.duration);k.stop().animate({left:"+="+o},j.duration)}};if(f[h]){return f[h].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof h==="object"||!h){return f.init.apply(this)}else{a.error('Method "'+method+'" does not exist in barfiller plugin!')}}}})(jQuery);