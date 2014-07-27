var needToAsk = false;

window.onbeforeunload = function(e)
{
    
    if (needToAsk)
    {
        if(!e) e = window.event;
        e.cancelBubble = true;
        e.returnValue = 'You sure you want to leave?';
        if (e.stopPropagation)
        {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}


$(document).ready(function() {
    
    $("#newPostForm :input").change(function() {
       needToAsk = true;
    });
    
    jQuery('#submit' ).click( function() { submit_newpost_form('_self', 'save') });
    jQuery('#preview').click( function() { submit_newpost_form('blank', 'preview') });
    

    // select all desired input fields and attach tooltips to them
    $("#newPostForm input[type=text]").tooltip({

        // place tooltip on the right edge
        position: "center left",

        // a little tweaking of the position
        offset: [-2, 10],

        // use the built-in fadeIn/fadeOut effect
        effect: "fade",

        // custom opacity setting
        opacity: 0.7

    });

    jQuery(".chzn-select").chosen();
    
    jQuery('#data').autogrow();
    jQuery('#ArticlePlainText_plain_description').autogrow();
    
});


function submit_newpost_form( target , action)
{
    var target1 = target || 'blank';
    var action1 = action || 'save';
    
    if(!validate_newpost_form()) return;
    
    needToAsk = false;
    
    
    if(isguest)
	{
    	unauth_message('article');
    	return;
	}
    
    
    jQuery('#newPostForm').attr('action','Add/'+action1).attr('target', target1); 
    jQuery("#hiddenSubmit").trigger("click");
}


function validate_newpost_form()
{
    var all_valid = true;
    var iterator = function(index, field)
    {
        var id = jQuery(field).attr('id');
        // color empty field's borders
        if( 'data' !==  id && id !== 'Article_image' && '' === jQuery.trim(jQuery(field).val()) )
        {
            jQuery(field).css('border', '1px solid pink').bind('change', unmark_field_on_change);
            all_valid = false;
        }

    };
    
    
    // function triggered onchange of a "marked as empty" field to unmark it
    var unmark_field_on_change = function( e )
    {
        if( '' !== jQuery.trim(jQuery(this).val()) )
        {
            jQuery(this).css('border', '').unbind('change', unmark_field_on_change);
        }
    }
    
    // Go threw the entire form and mark empty fields
    jQuery('#newPostForm input[type="text"], #newPostForm textarea').not('#newPostForm li.search-field input').each(iterator);
    
    
    // show / hide error message
    all_valid ? jQuery('#newpost_error_text').hide() : jQuery('#newpost_error_text').show();
    return all_valid;
}














//** AnyLink JS Drop Down Menu v2.0- (c) Dynamic Drive DHTML code library: http://www.dynamicdrive.com


var colorsMenu={divclass:'anylinkmenu', inlinestyle:'', linktarget:'_new'}
colorsMenu.items=[
	["אדום כהה", "darkred"],
	["כתום", "orange"],
	["חום", "brown"],
	["ירוק", "green"],
	["כחול", "blue"],
	["כחול כהה", "darkblue"],
	["אינדיגו", "indigo"],
	["לבן", "white"]
]

var modMoveToMenu={divclass:"anylinkmenu",inlinestyle:"width:250px;",linktarget:"_new"},openedTags=[];if(typeof dd_domreadycheck=="undefined")var dd_domreadycheck=!1; var anylinkmenu={menusmap:{},preloadimages:[],effects:{delayhide:200,shadow:{enabled:!1,opacity:0.3,depth:[5,5]},fade:{enabled:!1,duration:500}},dimensions:{},nullfunc:function(){},getoffset:function(a,b){return a.offsetParent?a[b]+this.getoffset(a.offsetParent,b):a[b]},getoffsetof:function(a){a._offsets={left:this.getoffset(a,"offsetLeft"),top:this.getoffset(a,"offsetTop"),h:a.offsetHeight}},getdimensions:function(a){this.dimensions={anchorw:a.anchorobj.offsetWidth,anchorh:a.anchorobj.offsetHeight, docwidth:(window.innerWidth||this.standardbody.clientWidth)-20,docheight:(window.innerHeight||this.standardbody.clientHeight)-15,docscrollx:window.pageXOffset||this.standardbody.scrollLeft,docscrolly:window.pageYOffset||this.standardbody.scrollTop};if(!this.dimensions.dropmenuw)this.dimensions.dropmenuw=a.dropmenu.offsetWidth,this.dimensions.dropmenuh=a.dropmenu.offsetHeight},isContained:function(a,b){for(var b=b||window.event,c=b.relatedTarget||(b.type=="mouseover"?b.fromElement:b.toElement);c&& c!=a;)try{c=c.parentNode}catch(d){c=a}return c==a?!0:!1},setopacity:function(a,b){a.style.opacity=b;if(typeof a.style.opacity!="string"&&(a.style.MozOpacity=b,a.filters))a.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity="+b*100+")"},showmenu:function(a){for(var b=0;b<openedTags.length;b++)if(openedTags[b]&&openedTags[b]=="[color=somecolor]"){$('#data').bbcode("color");return}b=anylinkmenu.menusmap[a];clearTimeout(b.hidetimer);this.getoffsetof(b.anchorobj);this.getdimensions(b);var c=b.anchorobj._offsets.left+ (b.orientation=="lr"?this.dimensions.anchorw:0),d=b.anchorobj._offsets.top+this.dimensions.anchorh-(b.orientation=="lr"?this.dimensions.anchorh:0);c+this.dimensions.dropmenuw+this.effects.shadow.depth[0]>this.dimensions.docscrollx+this.dimensions.docwidth&&(c=c-this.dimensions.dropmenuw+(b.orientation=="lr"?-this.dimensions.anchorw:this.dimensions.anchorw));d+this.dimensions.dropmenuh>this.dimensions.docscrolly+this.dimensions.docheight&&(d=Math.max(d-this.dimensions.dropmenuh-(b.orientation=="lr"? -this.dimensions.anchorh:this.dimensions.anchorh),this.dimensions.docscrolly));this.effects.fade.enabled&&(this.setopacity(b.dropmenu,0),this.effects.shadow.enabled&&this.setopacity(b.shadow,0));b.dropmenu.setcss({left:c+"px",top:d+"px",visibility:"visible"});this.effects.shadow.enabled&&b.shadow.setcss({left:c+anylinkmenu.effects.shadow.depth[0]+"px",top:d+anylinkmenu.effects.shadow.depth[1]+"px",visibility:"visible"});if(this.effects.fade.enabled)clearInterval(b.animatetimer),b.curanimatedegree= 0,b.starttime=(new Date).getTime(),b.animatetimer=setInterval(function(){anylinkmenu.revealmenu(a)},20)},revealmenu:function(a){var a=anylinkmenu.menusmap[a],b=(new Date).getTime()-a.starttime;b<this.effects.fade.duration?(this.setopacity(a.dropmenu,a.curanimatedegree),this.effects.shadow.enabled&&this.setopacity(a.shadow,a.curanimatedegree*this.effects.shadow.opacity)):(clearInterval(a.animatetimer),this.setopacity(a.dropmenu,1),a.dropmenu.style.filter="");a.curanimatedegree=(1-Math.cos(b/this.effects.fade.duration* Math.PI))/2},setcss:function(a){for(prop in a)this.style[prop]=a[prop]},setcssclass:function(a,b,c){var d=RegExp("(^|\\s+)"+b+"($|\\s+)","ig");if(c=="check")return d.test(a.className);else c=="remove"?a.className=a.className.replace(d,""):c=="add"&&!d.test(a.className)&&(a.className+=" "+b);return!0},hidemenu:function(a){a=anylinkmenu.menusmap[a];clearInterval(a.animatetimer);a.dropmenu.setcss({visibility:"hidden",left:0,top:0});a.shadow.setcss({visibility:"hidden",left:0,top:0})},getElementsByClass:function(a){if(document.querySelectorAll)return document.querySelectorAll("."+ a);else{for(var a=RegExp("(^|\\s+)"+a+"($|\\s+)","i"),b=[],c=document.all?document.all:document.getElementsByTagName("*"),d=0;d<c.length;d++)typeof c[d].className=="string"&&c[d].className.search(a)!=-1&&(b[b.length]=c[d]);return b}},addDiv:function(a,b,c){var d=document.createElement("div");if(a)d.id=a;d.className=b;c!=""&&typeof d.style.cssText=="string"?d.style.cssText=c:c!=""&&d.setAttribute("style",c);document.body.appendChild(d);return d},getmenuHTML:function(a,b){for(var c=[],d="",e=0;e<a.items.length;e++){var f= a.items[e][1];a.items[e][1]=="transparent"&&(f="#1E0000;");d+=b=="colors"?"<li><a href=\"javascript:$('#data').bbcode('color','"+a.items[e][1]+'\')" style="color:'+f+';">'+a.items[e][0]+"</a></li>\n":'<li><a href="javascript:updateTheme('+a.items[e][0]+",'')\" >"+a.items[e][1]+"</a></li>\n";if(a.items[e][2]=="efc"||e==a.items.length-1)c.push(d),d=""}if(typeof a.cols=="undefined")return"<ul>\n"+c.join("")+"\n</ul>";else{d="";for(e=0;e<c.length;e++)d+='<div class="'+a.cols.divclass+'" style="'+a.cols.inlinestyle+ '">\n<ul>\n'+c[e]+"</ul>\n</div>\n";return d}},addEvent:function(a,b,c){if(a.length>0){var d=a.shift();d.addEventListener?d.addEventListener(c,b,!1):d.attachEvent&&d.attachEvent("on"+c,function(){return b.call(d,window.event)});this.addEvent(a,b,c)}},domready:function(a){dd_domreadycheck?a():(document.addEventListener?document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,!1);a();dd_domreadycheck=!0},!1):document.attachEvent&&document.documentElement.doScroll&& window==window.top&&function(){if(!dd_domreadycheck){try{document.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,0);return}a();dd_domreadycheck=!0}}(),document.attachEvent&&parent.length>0&&this.addEvent(window,function(){a()},"load"))},addState:function(a,b){if(a.getAttribute("data-image")){var c=a.tagName=="IMG"?a:a.getElementsByTagName("img")[0];if(c)c.src=b=="add"?a.getAttribute("data-overimage"):a.getAttribute("data-image")}else anylinkmenu.setcssclass(a,"selectedanchor", b)},setupmenu:function(a,b,c,d){var h;this.standardbody=document.compatMode=="CSS1Compat"?document.documentElement:document.body;var e=b.getAttribute("rel");dropmenuid=e.replace(/\[(\w+)\]/,"");var f=window[dropmenuid],g=this.addDiv(null,f.divclass,f.inlinestyle);g.innerHTML=this.getmenuHTML(f,d);h=this.menusmap[a+c]={id:a+c,anchorobj:b,dropmenu:g,revealtype:e.length!=dropmenuid.length&&RegExp.$1=="click"?"click":"mouseover",orientation:b.getAttribute("rev")=="lr"?"lr":"ud",shadow:this.addDiv(null, "anylinkshadow",null)},b=h;b.anchorobj._internalID=a+c;b.anchorobj._isanchor=!0;b.dropmenu._internalID=a+c;b.shadow._internalID=a+c;b.dropmenu.setcss=this.setcss;b.shadow.setcss=this.setcss;b.shadow.setcss({width:b.dropmenu.offsetWidth+"px"});this.setopacity(b.shadow,this.effects.shadow.opacity);this.addEvent([b.anchorobj,b.dropmenu,b.shadow],function(a){var b=anylinkmenu.menusmap[this._internalID];this._isanchor&&b.revealtype=="mouseover"&&!anylinkmenu.isContained(this,a)?(anylinkmenu.showmenu(b.id), anylinkmenu.addState(this,"add")):typeof this._isanchor=="undefined"&&clearTimeout(b.hidetimer)},"mouseover");this.addEvent([b.anchorobj,b.dropmenu,b.shadow],function(a){if(!anylinkmenu.isContained(this,a)){var b=anylinkmenu.menusmap[this._internalID];b.hidetimer=setTimeout(function(){anylinkmenu.addState(b.anchorobj,"remove");anylinkmenu.hidemenu(b.id)},anylinkmenu.effects.delayhide)}},"mouseout");this.addEvent([b.anchorobj,b.dropmenu],function(a){var b=anylinkmenu.menusmap[this._internalID];if(this._isanchor&& b.revealtype=="click")return b.dropmenu.style.visibility=="visible"?anylinkmenu.hidemenu(b.id):(anylinkmenu.addState(this,"add"),anylinkmenu.showmenu(b.id)),a.preventDefault&&a.preventDefault(),!1;else b.hidetimer=setTimeout(function(){anylinkmenu.hidemenu(b.id)},anylinkmenu.effects.delayhide);return!0},"click")},init:function(a,b){this.domready(function(){anylinkmenu.trueinit(a,b)})},trueinit:function(a,b){for(var c=this.getElementsByClass(a),d=this.preloadimages,e=0;e<c.length;e++){if(c[e].getAttribute("data-image"))d[d.length]= new Image,d[d.length-1].src=c[e].getAttribute("data-image");if(c[e].getAttribute("data-overimage"))d[d.length]=new Image,d[d.length-1].src=c[e].getAttribute("data-overimage");this.setupmenu(a,c[e],e,b)}}};


anylinkmenu.trueinit("a-color","colors");








/****************************************************************************/
/************************** Chosen jquery plugin ****************************/
/****************************************************************************/

(function(){var a,b,c,d,e=function(a,b){return function(){return a.apply(b,arguments)}};d=this,a=jQuery,a.fn.extend({chosen:function(c,d){return a.browser!=="msie"||a.browser.version!=="6.0"&&a.browser.version!=="7.0"?a(this).each(function(e){if(!a(this).hasClass("chzn-done"))return new b(this,c,d)}):this}}),b=function(){function b(b){this.set_default_values(),this.form_field=b,this.form_field_jq=a(this.form_field),this.is_multiple=this.form_field.multiple,this.is_rtl=this.form_field_jq.hasClass("chzn-rtl"),this.default_text_default=this.form_field.multiple? "בחרו קטגוריות אליהם הפוסט משתייך" :"Select an Option",this.set_up_html(),this.register_observers(),this.form_field_jq.addClass("chzn-done")}b.prototype.set_default_values=function(){this.click_test_action=e(function(a){return this.test_active_click(a)},this),this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.result_single_selected=null;return this.choices=0},b.prototype.set_up_html=function(){var b,d,e,f;this.container_id=this.form_field.id.length?this.form_field.id.replace(/(:|\.)/g,"_"):this.generate_field_id(),this.container_id+="_chzn",this.f_width=this.form_field_jq.width(),this.default_text=this.form_field_jq.data("placeholder")?this.form_field_jq.data("placeholder"):this.default_text_default,b=a("<div />",{id:this.container_id,"class":"chzn-container "+(this.is_rtl?"chzn-rtl":""),style:"width: "+this.f_width+"px;"}),this.is_multiple?b.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="right:-9000px;"><ul class="chzn-results"></ul></div>'):b.html('<a href="javascript:void(0)" class="chzn-single"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chzn-drop" style="right:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>'),this.form_field_jq.hide().after(b),this.container=a("#"+this.container_id),this.container.addClass("chzn-container-"+(this.is_multiple?"multi":"single")),this.dropdown=this.container.find("div.chzn-drop").first(),d=this.container.height(),e=this.f_width-c(this.dropdown),this.dropdown.css({width:e+"px",top:d+"px"}),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chzn-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chzn-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chzn-search").first(),this.selected_item=this.container.find(".chzn-single").first(),f=e-c(this.search_container)-c(this.search_field),this.search_field.css({width:f+"px"})),this.results_build();return this.set_tab_index()},b.prototype.register_observers=function(){this.container.mousedown(e(function(a){return this.container_mousedown(a)},this)),this.container.mouseenter(e(function(a){return this.mouse_enter(a)},this)),this.container.mouseleave(e(function(a){return this.mouse_leave(a)},this)),this.search_results.mouseup(e(function(a){return this.search_results_mouseup(a)},this)),this.search_results.mouseover(e(function(a){return this.search_results_mouseover(a)},this)),this.search_results.mouseout(e(function(a){return this.search_results_mouseout(a)},this)),this.form_field_jq.bind("liszt:updated",e(function(a){return this.results_update_field(a)},this)),this.search_field.blur(e(function(a){return this.input_blur(a)},this)),this.search_field.keyup(e(function(a){return this.keyup_checker(a)},this)),this.search_field.keydown(e(function(a){return this.keydown_checker(a)},this));if(this.is_multiple){this.search_choices.click(e(function(a){return this.choices_click(a)},this));return this.search_field.focus(e(function(a){return this.input_focus(a)},this))}return this.selected_item.focus(e(function(a){return this.activate_field(a)},this))},b.prototype.container_mousedown=function(b){b&&b.type==="mousedown"&&b.stopPropagation();if(!this.pending_destroy_click){this.active_field?!this.is_multiple&&b&&(a(b.target)===this.selected_item||a(b.target).parents("a.chzn-single").length)&&(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(document).click(this.click_test_action),this.results_show());return this.activate_field()}return this.pending_destroy_click=!1},b.prototype.mouse_enter=function(){return this.mouse_on_container=!0},b.prototype.mouse_leave=function(){return this.mouse_on_container=!1},b.prototype.input_focus=function(a){if(!this.active_field)return setTimeout(e(function(){return this.container_mousedown()},this),50)},b.prototype.input_blur=function(a){if(!this.mouse_on_container){this.active_field=!1;return setTimeout(e(function(){return this.blur_test()},this),100)}},b.prototype.blur_test=function(a){if(!this.active_field&&this.container.hasClass("chzn-container-active"))return this.close_field()},b.prototype.close_field=function(){a(document).unbind("click",this.click_test_action),this.is_multiple||(this.selected_item.attr("tabindex",this.search_field.attr("tabindex")),this.search_field.attr("tabindex",-1)),this.active_field=!1,this.results_hide(),this.container.removeClass("chzn-container-active"),this.winnow_results_clear(),this.clear_backstroke(),this.show_search_field_default();return this.search_field_scale()},b.prototype.activate_field=function(){!this.is_multiple&&!this.active_field&&(this.search_field.attr("tabindex",this.selected_item.attr("tabindex")),this.selected_item.attr("tabindex",-1)),this.container.addClass("chzn-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val());return this.search_field.focus()},b.prototype.test_active_click=function(b){return a(b.target).parents("#"+this.container_id).length?this.active_field=!0:this.close_field()},b.prototype.results_build=function(){var a,b,c,e,f,g;c=new Date,this.parsing=!0,this.results_data=d.SelectParser.select_to_array(this.form_field),this.is_multiple&&this.choices>0?(this.search_choices.find("li.search-choice").remove(),this.choices=0):this.is_multiple||this.selected_item.find("span").text(this.default_text),a="",g=this.results_data;for(e=0,f=g.length;e<f;e++)b=g[e],b.group?a+=this.result_add_group(b):b.empty||(a+=this.result_add_option(b),b.selected&&this.is_multiple?this.choice_build(b):b.selected&&!this.is_multiple&&this.selected_item.find("span").text(b.text));this.show_search_field_default(),this.search_field_scale(),this.search_results.html(a);return this.parsing=!1},b.prototype.result_add_group=function(b){if(!b.disabled){b.dom_id=this.container_id+"_g_"+b.array_index;return'<li id="'+b.dom_id+'" class="group-result">'+a("<div />").text(b.label).html()+"</li>"}return""},b.prototype.result_add_option=function(a){var b;if(!a.disabled){a.dom_id=this.container_id+"_o_"+a.array_index,b=a.selected&&this.is_multiple?[]:["active-result"],a.selected&&b.push("result-selected"),a.group_array_index!=null&&b.push("group-option");return'<li id="'+a.dom_id+'" class="'+b.join(" ")+'">'+a.html+"</li>"}return""},b.prototype.results_update_field=function(){this.result_clear_highlight(),this.result_single_selected=null;return this.results_build()},b.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight();if(b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(c<f)return this.search_results.scrollTop(c)}},b.prototype.result_clear_highlight=function(){this.result_highlight&&this.result_highlight.removeClass("highlighted");return this.result_highlight=null},b.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},b.prototype.results_show=function(){var a;this.is_multiple||(this.selected_item.addClass("chzn-single-with-drop"),this.result_single_selected&&this.result_do_highlight(this.result_single_selected)),a=this.is_multiple?this.container.height():this.container.height()-1,this.dropdown.css({top:a+"px",right:0}),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val());return this.winnow_results()},b.prototype.results_hide=function(){this.is_multiple||this.selected_item.removeClass("chzn-single-with-drop"),this.result_clear_highlight(),this.dropdown.css({right:"-9000px"});return this.results_showing=!1},b.prototype.set_tab_index=function(a){var b;if(this.form_field_jq.attr("tabindex")){b=this.form_field_jq.attr("tabindex"),this.form_field_jq.attr("tabindex",-1);if(this.is_multiple)return this.search_field.attr("tabindex",b);this.selected_item.attr("tabindex",b);return this.search_field.attr("tabindex",-1)}},b.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices<1&&!this.active_field){this.search_field.val(this.default_text);return this.search_field.addClass("default")}this.search_field.val("");return this.search_field.removeClass("default")},b.prototype.search_results_mouseup=function(b){var c;c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first();if(c.length){this.result_highlight=c;return this.result_select(b)}},b.prototype.search_results_mouseover=function(b){var c;c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first();if(c)return this.result_do_highlight(c)},b.prototype.search_results_mouseout=function(b){if(a(b.target).hasClass("active-result"))return this.result_clear_highlight()},b.prototype.choices_click=function(b){b.preventDefault();if(this.active_field&&!a(b.target).hasClass("search-choice")&&!this.results_showing)return this.results_show()},b.prototype.choice_build=function(b){var c,d;c=this.container_id+"_c_"+b.array_index,this.choices+=1,this.search_container.before('<li class="search-choice" id="'+c+'"><span>'+b.html+'</span><a href="javascript:void(0)" class="search-choice-close" rel="'+b.array_index+'"></a></li>'),d=a("#"+c).find("a").first();return d.click(e(function(a){return this.choice_destroy_link_click(a)},this))},b.prototype.choice_destroy_link_click=function(b){b.preventDefault(),this.pending_destroy_click=!0;return this.choice_destroy(a(b.target))},b.prototype.choice_destroy=function(a){this.choices-=1,this.show_search_field_default(),this.is_multiple&&this.choices>0&&this.search_field.val().length<1&&this.results_hide(),this.result_deselect(a.attr("rel"));return a.parents("li").first().remove()},b.prototype.result_select=function(a){var b,c,d,e;if(this.result_highlight){b=this.result_highlight,c=b.attr("id"),this.result_clear_highlight(),b.addClass("result-selected"),this.is_multiple?this.result_deactivate(b):this.result_single_selected=b,e=c.substr(c.lastIndexOf("_")+1),d=this.results_data[e],d.selected=!0,this.form_field.options[d.options_index].selected=!0,this.is_multiple?this.choice_build(d):this.selected_item.find("span").first().text(d.text),(!a.metaKey||!this.is_multiple)&&this.results_hide(),this.search_field.val(""),this.form_field_jq.trigger("change");return this.search_field_scale()}},b.prototype.result_activate=function(a){return a.addClass("active-result").show()},b.prototype.result_deactivate=function(a){return a.removeClass("active-result").hide()},b.prototype.result_deselect=function(b){var c,d;d=this.results_data[b],d.selected=!1,this.form_field.options[d.options_index].selected=!1,c=a("#"+this.container_id+"_o_"+b),c.removeClass("result-selected").addClass("active-result").show(),this.result_clear_highlight(),this.winnow_results(),this.form_field_jq.trigger("change");return this.search_field_scale()},b.prototype.results_search=function(a){return this.results_showing?this.winnow_results():this.results_show()},b.prototype.winnow_results=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;j=new Date,this.no_results_clear(),h=0,i=this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html(),f=new RegExp("^"+i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i"),m=new RegExp(i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i"),r=this.results_data;for(n=0,p=r.length;n<p;n++){c=r[n];if(!c.disabled&&!c.empty)if(c.group)a("#"+c.dom_id).hide();else if(!this.is_multiple||!c.selected){b=!1,g=c.dom_id;if(f.test(c.html))b=!0,h+=1;else if(c.html.indexOf(" ")>=0||c.html.indexOf("[")===0){e=c.html.replace(/\[|\]/g,"").split(" ");if(e.length)for(o=0,q=e.length;o<q;o++)d=e[o],f.test(d)&&(b=!0,h+=1)}b?(i.length?(k=c.html.search(m),l=c.html.substr(0,k+i.length)+"</em>"+c.html.substr(k+i.length),l=l.substr(0,k)+"<em>"+l.substr(k)):l=c.html,a("#"+g).html!==l&&a("#"+g).html(l),this.result_activate(a("#"+g)),c.group_array_index!=null&&a("#"+this.results_data[c.group_array_index].dom_id).show()):(this.result_highlight&&g===this.result_highlight.attr("id")&&this.result_clear_highlight(),this.result_deactivate(a("#"+g)))}}return h<1&&i.length?this.no_results(i):this.winnow_results_set_highlight()},b.prototype.winnow_results_clear=function(){var b,c,d,e,f;this.search_field.val(""),c=this.search_results.find("li"),f=[];for(d=0,e=c.length;d<e;d++)b=c[d],b=a(b),f.push(b.hasClass("group-result")?b.show():!this.is_multiple||!b.hasClass("result-selected")?this.result_activate(b):void 0);return f},b.prototype.winnow_results_set_highlight=function(){var a,b;if(!this.result_highlight){b=this.is_multiple?[]:this.search_results.find(".result-selected"),a=b.length?b.first():this.search_results.find(".active-result").first();if(a!=null)return this.result_do_highlight(a)}},b.prototype.no_results=function(b){var c;c=a('<li class="no-results">No results match "<span></span>"</li>'),c.find("span").first().html(b);return this.search_results.append(c)},b.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},b.prototype.keydown_arrow=function(){var b,c;this.result_highlight?this.results_showing&&(c=this.result_highlight.nextAll("li.active-result").first(),c&&this.result_do_highlight(c)):(b=this.search_results.find("li.active-result").first(),b&&this.result_do_highlight(a(b)));if(!this.results_showing)return this.results_show()},b.prototype.keyup_arrow=function(){var a;if(!this.results_showing&&!this.is_multiple)return this.results_show();if(this.result_highlight){a=this.result_highlight.prevAll("li.active-result");if(a.length)return this.result_do_highlight(a.first());this.choices>0&&this.results_hide();return this.result_clear_highlight()}},b.prototype.keydown_backstroke=function(){if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.find("a").first());return this.clear_backstroke()}this.pending_backstroke=this.search_container.siblings("li.search-choice").last();return this.pending_backstroke.addClass("search-choice-focus")},b.prototype.clear_backstroke=function(){this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus");return this.pending_backstroke=null},b.prototype.keyup_checker=function(a){var b,c;b=(c=a.which)!=null?c:a.keyCode,this.search_field_scale();switch(b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices>0)return this.keydown_backstroke();if(!this.pending_backstroke){this.result_clear_highlight();return this.results_search()}break;case 13:a.preventDefault();if(this.results_showing)return this.result_select(a);break;case 27:if(this.results_showing)return this.results_hide();break;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},b.prototype.keydown_checker=function(a){var b,c;b=(c=a.which)!=null?c:a.keyCode,this.search_field_scale(),b!==8&&this.pending_backstroke&&this.clear_backstroke();switch(b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:this.keydown_arrow()}},b.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){d=0,h=0,f="position:absolute; right: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"];for(i=0,j=g.length;i<j;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";c=a("<div />",{style:f}),c.text(this.search_field.val()),a("body").append(c),h=c.width()+25,c.remove(),h>this.f_width-10&&(h=this.f_width-10),this.search_field.css({width:h+"px"}),b=this.container.height();return this.dropdown.css({top:b+"px"})}},b.prototype.generate_field_id=function(){var a;a=this.generate_random_id(),this.form_field.id=a;return a},b.prototype.generate_random_id=function(){var b;b="sel"+this.generate_random_char()+this.generate_random_char()+this.generate_random_char();while(a("#"+b).length>0)b+=this.generate_random_char();return b},b.prototype.generate_random_char=function(){var a,b,c;a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ",c=Math.floor(Math.random()*a.length);return b=a.substring(c,c+1)};return b}(),c=function(a){var b;return b=a.outerWidth()-a.width()},d.get_side_border_padding=c}).call(this),function(){var a;a=function(){function a(){this.options_index=0,this.parsed=[]}a.prototype.add_node=function(a){return a.nodeName==="OPTGROUP"?this.add_group(a):this.add_option(a)},a.prototype.add_group=function(a){var b,c,d,e,f,g;b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:a.label,children:0,disabled:a.disabled}),f=a.childNodes,g=[];for(d=0,e=f.length;d<e;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},a.prototype.add_option=function(a,b,c){if(a.nodeName==="OPTION"){a.text!==""?(b!=null&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0});return this.options_index+=1}};return a}(),a.select_to_array=function(b){var c,d,e,f,g;d=new a,g=b.childNodes;for(e=0,f=g.length;e<f;e++)c=g[e],d.add_node(c);return d.parsed},this.SelectParser=a}.call(this);

