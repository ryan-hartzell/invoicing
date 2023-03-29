function _defineProperty(e,t,i){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var a=i.call(e,t||"default");if("object"!==_typeof(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _typeof(e){"@babel/helpers - typeof";return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function wpinvBlock(e,t){t=void 0!==t&&""!==t?t:WPInv.loading;var i=jQuery(e);1!=i.data("GetPaidIsBlocked")&&(i.data("GetPaidIsBlocked",1),i.data("GetPaidWasRelative",i.hasClass("position-relative")),i.addClass("position-relative"),i.append('<div class="w-100 h-100 position-absolute bg-light d-flex justify-content-center align-items-center getpaid-block-ui" style="top: 0; left: 0; opacity: 0.7; cursor: progress;"><div class="spinner-border" role="status"><span class="sr-only">'+t+"</span></div></div>"))}function wpinvUnblock(e){var t=jQuery(e);1==t.data("GetPaidIsBlocked")&&(t.data("GetPaidIsBlocked",0),t.data("GetPaidWasRelative")||t.removeClass("position-relative"),t.children(".getpaid-block-ui").remove())}jQuery(function(e){window.getpaid_form=function(t){return{fetched_initial_state:0,cached_states:{},form:t,show_error:function(i,a){t.find(".getpaid-payment-form-errors, .getpaid-custom-payment-form-errors").html("").addClass("d-none"),a&&t.find(a).length?(t.find(a).html(i).removeClass("d-none"),t.find(a).closest(".form-group").find(".form-control").addClass("is-invalid"),t.find(a).closest(".form-group").find(".getpaid-custom-payment-form-success").addClass("d-none")):(t.find(".getpaid-payment-form-errors").html(i).removeClass("d-none"),t.find(".getpaid-custom-payment-form-errors").each(function(){var t=e(this).closest(".form-group").find(".form-control");""!=t.val()&&t.addClass("is-valid")}))},hide_error:function(){t.find(".getpaid-payment-form-errors, .getpaid-custom-payment-form-errors").html("").addClass("d-none"),t.find(".is-invalid, .is-valid").removeClass("is-invalid is-valid")},cache_state:function(e,t){this.cached_states[e]=t},current_state_key:function(){return this.form.serialize()},is_current_state_cached:function(){return this.cached_states.hasOwnProperty(this.current_state_key())},switch_state:function(){this.hide_error();var i=this.cached_states[this.current_state_key()];if(!i)return this.fetch_state();if(i.totals)for(var a in i.totals)i.totals.hasOwnProperty(a)&&this.form.find(".getpaid-form-cart-totals-total-"+a).html(i.totals[a]);if(Array.isArray(i.fees)?this.form.find(".getpaid-form-cart-totals-fees").addClass("d-none"):this.form.find(".getpaid-form-cart-totals-fees").removeClass("d-none"),Array.isArray(i.discounts)?this.form.find(".getpaid-form-cart-totals-discount").addClass("d-none"):this.form.find(".getpaid-form-cart-totals-discount").removeClass("d-none"),i.items)for(var n in i.items)i.items.hasOwnProperty(n)&&this.form.find(".getpaid-form-cart-item-subtotal-"+n).html(i.items[n]);if(i.selected_items)for(var n in i.selected_items)i.selected_items.hasOwnProperty(n)&&(this.form.find('input[name="getpaid-items['+n+'][price]"]').val(i.selected_items[n].price),this.form.find('input[name="getpaid-items['+n+'][quantity]"]').val(i.selected_items[n].quantity));if(i.texts)for(var o in i.texts)i.texts.hasOwnProperty(o)&&this.form.find(o).html(i.texts[o]);i.gateways&&this.process_gateways(i.gateways,i),i.invoice&&(0==this.form.find('input[name="invoice_id"]').length&&this.form.append('<input type="hidden" name="invoice_id" />'),this.form.find('input[name="invoice_id"]').val(i.invoice)),i.js_data&&this.form.data("getpaid_js_data",i.js_data),t.find(".getpaid-custom-payment-form-errors.d-none").each(function(){var t=e(this).closest(".form-group").find(".form-control");""!=t.val()&&t.addClass("is-valid").closest(".form-group").find(".getpaid-custom-payment-form-success").removeClass("d-none")}),this.setup_saved_payment_tokens(),this.form.trigger("getpaid_payment_form_changed_state",[i])},refresh_state:function(){if(this.is_current_state_cached())return this.switch_state();this.fetch_state()},fetch_state:function(){var t=this;wpinvBlock(this.form);var i=this.current_state_key(),a=this.fetched_initial_state?"0":localStorage.getItem("getpaid_last_invoice_"+this.form.find('input[name="form_id"]').val());return e.post(WPInv.ajax_url,i+"&action=wpinv_payment_form_refresh_prices&_ajax_nonce="+WPInv.formNonce+"&initial_state="+this.fetched_initial_state+"&maybe_use_invoice="+a).done(function(e){if(e.success)return t.fetched_initial_state=1,t.cache_state(i,e.data),t.switch_state();!1!==e.success?t.show_error(e):t.show_error(e.data.error,e.data.code)}).fail(function(){t.show_error(WPInv.connectionError)}).always(function(){wpinvUnblock(t.form)})},update_state_field:function(t){if((t=e(t)).find(".wpinv_state").length){var i=t.find(".getpaid-address-field-wrapper__state");wpinvBlock(i);var a={action:"wpinv_get_payment_form_states_field",country:t.find(".wpinv_country").val(),form:this.form.find('input[name="form_id"]').val(),name:i.find(".wpinv_state").attr("name"),_ajax_nonce:WPInv.formNonce};e.get(WPInv.ajax_url,a,function(e){"object"==_typeof(e)&&i.replaceWith(e.data)}).always(function(){wpinvUnblock(t.find(".getpaid-address-field-wrapper__state"))})}},attach_events:function(){var i=this,a=this,n=function(e,t){t||(t=200);var i=!1,a=!0;return function(){if(i){a=!1;var n=this;setTimeout(function(){a||(e.bind(n).call(),a=!0)},t)}else a=!0,e.bind(this).call(),i=!0,setTimeout(function(){i=!1},t)}}(function(){a.refresh_state()},500);this.form.on("change",".getpaid-refresh-on-change",n),this.form.on("input",".getpaid-payment-form-element-price_select :input:not(.getpaid-refresh-on-change)",n),this.form.on("change",".getpaid-payment-form-element-currency_select :input:not(.getpaid-refresh-on-change)",n),this.form.on("change",".getpaid-item-quantity-input",n),this.form.on("change",'[name="getpaid-payment-form-selected-item"]',n),this.form.on("change",".getpaid-item-mobile-quantity-input",function(){var t=e(this);t.closest(".getpaid-payment-form-items-cart-item").find(".getpaid-item-quantity-input").val(t.val()).trigger("change")}),this.form.on("change",".getpaid-item-quantity-input",function(){var t=e(this);t.closest(".getpaid-payment-form-items-cart-item").find(".getpaid-item-mobile-quantity-input").val(t.val())}),this.form.on("change",".getpaid-item-price-input",function(){e(this).hasClass("is-invalid")||n()}),this.form.on("keypress",".getpaid-refresh-on-change, .getpaid-payment-form-element-price_select :input:not(.getpaid-refresh-on-change), .getpaid-item-quantity-input, .getpaid-item-price-input",function(e){"13"==e.keyCode&&(e.preventDefault(),n())}),this.form.on("change",".getpaid-shipping-address-wrapper .wpinv_country",function(){i.update_state_field(".getpaid-shipping-address-wrapper")}),this.form.on("change",".getpaid-billing-address-wrapper .wpinv_country",function(){i.update_state_field(".getpaid-billing-address-wrapper"),i.form.find(".getpaid-billing-address-wrapper .wpinv_country").val()!=i.form.find(".getpaid-billing-address-wrapper .wpinv_country").data("ipCountry")?i.form.find(".getpaid-address-field-wrapper__address-confirm").removeClass("d-none"):i.form.find(".getpaid-address-field-wrapper__address-confirm").addClass("d-none"),n()}),this.form.on("change",".getpaid-billing-address-wrapper .wpinv_state, .getpaid-billing-address-wrapper .wpinv_vat_number",function(){n()}),this.form.on("click",'.getpaid-vat-number-validate, [name="confirm-address"]',function(){n()}),this.form.on("change",".getpaid-billing-address-wrapper .wpinv_vat_number",function(){var t=e(this).parent().find(".getpaid-vat-number-validate");t.text(t.data("validate"))}),this.form.on("input",".getpaid-format-card-number",function(){var t=e(this),i=t.val(),a=i.replace(/\D/g,"").replace(/(.{4})/g,"$1 ");i!=a&&t.val(a)}),this.form.find(".getpaid-discount-field").length&&(this.form.find(".getpaid-discount-button").on("click",function(e){e.preventDefault(),n()}),this.form.find(".getpaid-discount-field").on("keypress",function(e){"13"==e.keyCode&&(e.preventDefault(),n())}),this.form.find(".getpaid-discount-field").on("change",function(e){n()})),this.form.on("change",".getpaid-gateway-radio input",function(){var e=i.form.find(".getpaid-gateway-radio input:checked").val();t.find(".getpaid-gateway-description").slideUp(),t.find(".getpaid-description-".concat(e)).slideDown()}),this.form.find(".getpaid-file-upload-element").each(function(){var t,i=e(this),a=i.closest(".form-group"),n=a.find(".getpaid-uploaded-files"),o=parseInt(a.data("max")),r=[],d=function(i){var d;if(i){var s=a.find(".getpaid-progress-template").clone().removeClass("d-none getpaid-progress-template");n.append(s),s.find("a.close").on("click",function(e){e.preventDefault();var a=r.indexOf(i);a>-1&&(r=r.splice(a,1)),s.fadeOut(300,function(){s.remove()});try{t&&t.abort()}catch(e){}}),s.find(".getpaid-progress-file-name").text(i.name).attr("title",i.name),s.find(".progress-bar").attr("aria-valuemax",i.size);var p=(_defineProperty(d={"application/pdf":'<i class="fas fa-file-pdf"></i>',"application/zip":'<i class="fas fa-file-archive"></i>',"application/x-gzip":'<i class="fas fa-file-archive"></i>',"application/rar":'<i class="fas fa-file-archive"></i>',"application/x-7z-compressed":'<i class="fas fa-file-archive"></i>',"application/x-tar":'<i class="fas fa-file-archive"></i>',audio:'<i class="fas fa-file-music"></i>',image:'<i class="fas fa-file-image"></i>',video:'<i class="fas fa-file-video"></i>',"application/msword":'<i class="fas fa-file-word"></i>',"application/vnd.ms-excel":'<i class="fas fa-file-excel"></i>'},"application/msword",'<i class="fas fa-file-word"></i>'),_defineProperty(d,"application/vnd.ms-word",'<i class="fas fa-file-word"></i>'),_defineProperty(d,"application/vnd.ms-powerpoint",'<i class="fas fa-file-powerpoint"></i>'),d);if(i.type&&Object.keys(p).forEach(function(e){-1!==i.type.indexOf(e)&&s.find(".fa.fa-file").replaceWith(p[e])}),r.length<o){var l=i.name.match(/\.([^\.]+)$/)[1];if(a.find(".getpaid-files-input").data("extensions").indexOf(l.toString().toLowerCase())<0)s.find(".getpaid-progress").html('<div class="col-12 alert alert-danger" role="alert">Unsupported file type.</div>');else{var f=new FormData;f.append("file",i),f.append("action","wpinv_file_upload"),f.append("form_id",s.closest("form").find('input[name="form_id"]').val()),f.append("_ajax_nonce",WPInv.formNonce),f.append("field_name",a.data("name")),r.push(i),t=e.ajax({url:WPInv.ajax_url,type:"POST",contentType:!1,processData:!1,data:f,xhr:function(){var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){if(e.lengthComputable){var t=Math.round(100*e.loaded/e.total)+"%";s.find(".progress-bar").attr("aria-valuenow",e.loaded).css("width",t).text(t)}},!1),e},success:function(e){e.success?s.append(e.data):s.find(".getpaid-progress").html('<div class="col-12 alert alert-danger" role="alert">'+e.data+"</div>")},error:function(e,t,i){s.find(".getpaid-progress").html('<div class="col-12 alert alert-danger" role="alert">'+i+"</div>")}})}}else s.find(".getpaid-progress").html('<div class="col-12 alert alert-danger" role="alert">You have exceeded the number of files you can upload.</div>')}},s=function(e){Array.prototype.forEach.apply(e,[d])};i.on("dragenter",function(){i.addClass("getpaid-trying-to-drop")}).on("dragover",function(e){(e=e.originalEvent).stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"}).on("dragleave",function(){i.removeClass("getpaid-trying-to-drop")}).on("drop",function(e){(e=e.originalEvent).stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;t.length>0&&s(t)}),a.find(".getpaid-files-input").on("change",function(e){var t=e.originalEvent.target.files;t&&(s(t),a.find(".getpaid-files-input").val(""))})}),jQuery.fn.popover&&this.form.find(".gp-tooltip").length&&this.form.find(".gp-tooltip").popover({container:this.form[0],html:!0,content:function(){return e(this).closest(".getpaid-form-cart-item-name").find(".getpaid-item-desc").html()}}),jQuery.fn.flatpickr&&this.form.find(".getpaid-init-flatpickr").length&&this.form.find(".getpaid-init-flatpickr").each(function(){var e={},t=jQuery(this);if(t.data("disable_alt")&&t.data("disable_alt").length>0&&(e.disable=t.data("disable_alt")),t.data("disable_days_alt")&&t.data("disable_days_alt").length>0){e.disable=e.disable||[];var i=t.data("disable_days_alt");e.disable.push(function(e){return i.indexOf(e.getDay())>=0})}jQuery(this).removeClass("flatpickr-input").flatpickr(e)})},process_gateways:function(t,i){var a=this;this.form.data("initial_amt",i.initial_amt),this.form.data("currency",i.currency);var n=this.form.find(".getpaid-payment-form-submit"),o=n.data("free").replace(/%price%/gi,i.totals.raw_total),r=n.data("pay").replace(/%price%/gi,i.totals.raw_total);return n.prop("disabled",!1).css("cursor","pointer"),i.is_free?(n.val(o),this.form.find(".getpaid-gateways").slideUp(),void this.form.data("isFree","yes")):(this.form.data("isFree","no"),this.form.find(".getpaid-gateways").slideDown(),n.val(r),this.form.find(".getpaid-no-recurring-gateways, .getpaid-no-subscription-group-gateways, .getpaid-no-multiple-subscription-group-gateways, .getpaid-no-active-gateways").addClass("d-none"),this.form.find(".getpaid-select-gateway-title-div, .getpaid-available-gateways-div, .getpaid-gateway-descriptions-div").removeClass("d-none"),t.length<1?(this.form.find(".getpaid-select-gateway-title-div, .getpaid-available-gateways-div, .getpaid-gateway-descriptions-div").addClass("d-none"),n.prop("disabled",!0).css("cursor","not-allowed"),i.has_multiple_subscription_groups?void this.form.find(".getpaid-no-multiple-subscription-group-gateways").removeClass("d-none"):i.has_subscription_group?void this.form.find(".getpaid-no-subscription-group-gateways").removeClass("d-none"):i.has_recurring?void this.form.find(".getpaid-no-recurring-gateways").removeClass("d-none"):void this.form.find(".getpaid-no-active-gateways").removeClass("d-none")):(1==t.length?(this.form.find(".getpaid-select-gateway-title-div").addClass("d-none"),this.form.find(".getpaid-gateway-radio input").addClass("d-none")):this.form.find(".getpaid-gateway-radio input").removeClass("d-none"),this.form.find(".getpaid-gateway").addClass("d-none"),e.each(t,function(e,t){a.form.find(".getpaid-gateway-".concat(t)).removeClass("d-none")}),0===this.form.find(".getpaid-gateway:visible input:checked").length&&this.form.find(".getpaid-gateway:visible .getpaid-gateway-radio input").eq(0).prop("checked",!0),void(0===this.form.find(".getpaid-gateway-description:visible").length&&this.form.find(".getpaid-gateway-radio input:checked").trigger("change"))))},setup_saved_payment_tokens:function(){var t=this.form.data("currency");this.form.find(".getpaid-saved-payment-methods").each(function(){var i=e(this);i.show(),e("input",i).on("change",function(){e(this).closest("li").hasClass("getpaid-new-payment-method")?i.closest(".getpaid-gateway-description").find(".getpaid-new-payment-method-form").slideDown():i.closest(".getpaid-gateway-description").find(".getpaid-new-payment-method-form").slideUp()}),i.find("input").each(function(){"none"!=e(this).data("currency")&&t!=e(this).data("currency")?(e(this).closest("li").addClass("d-none"),e(this).prop("checked",!1)):e(this).closest("li").removeClass("d-none")}),0===e("li:not(.d-none) input",i).filter(":checked").length&&e("li:not(.d-none) input",i).eq(0).prop("checked",!0),0===e("li:not(.d-none) input",i).filter(":checked").length&&e("input",i).last().prop("checked",!0),2>e("li:not(.d-none) input",i).length&&i.hide(),e("input",i).filter(":checked").trigger("change")})},handleAddressToggle:function(t){var i=t.closest(".getpaid-payment-form-element-address");i.find(".getpaid-billing-address-title, .getpaid-shipping-address-title, .getpaid-shipping-address-wrapper").addClass("d-none"),t.on("change",function(){e(this).is(":checked")?(i.find(".getpaid-billing-address-title, .getpaid-shipping-address-title, .getpaid-shipping-address-wrapper").addClass("d-none"),i.find(".getpaid-shipping-billing-address-title").removeClass("d-none")):(i.find(".getpaid-billing-address-title, .getpaid-shipping-address-title, .getpaid-shipping-address-wrapper").removeClass("d-none"),i.find(".getpaid-shipping-billing-address-title").addClass("d-none"))})},init:function(){this.setup_saved_payment_tokens(),this.attach_events(),this.refresh_state(),this.form.find(".getpaid-payment-form-element-billing_email span.d-none").closest(".col-12").addClass("d-none"),this.form.find(".getpaid-gateway-description:not(:has(*))").remove();var t=this.form.find('[name ="same-shipping-address"]');t.length>0&&this.handleAddressToggle(t),e("body").trigger("getpaid_setup_payment_form",[this.form])}}};var t=function(t){function i(i){0!=t.find(".getpaid-payment-form-items-cart").length&&(t.find(".getpaid-payment-form-items-cart-item.getpaid-selectable").each(function(){e(this).find(".getpaid-item-price-input").attr("name",""),e(this).find(".getpaid-item-quantity-input").attr("name",""),e(this).hide()}),e(i).each(function(e,i){if(i){var a=t.find(".getpaid-payment-form-items-cart-item.item-"+i);a.find(".getpaid-item-price-input").attr("name","getpaid-items["+i+"][price]"),a.find(".getpaid-item-quantity-input").attr("name","getpaid-items["+i+"][quantity]"),a.show()}}))}if(t.find(".getpaid-gateway-descriptions-div .form-horizontal .form-group").addClass("row"),t.find(".getpaid-payment-form-items-radio").length){var a=function(){i([t.find(".getpaid-payment-form-items-radio .form-check-input:checked").val()])},n=t.find(".getpaid-payment-form-items-radio .form-check-input");n.on("change",a),0===n.filter(":checked").length&&n.eq(0).prop("checked",!0),a()}if(t.find(".getpaid-payment-form-items-checkbox").length){a=function(){i(t.find(".getpaid-payment-form-items-checkbox input:checked").map(function(){return e(this).val()}).get())};var o=t.find(".getpaid-payment-form-items-checkbox input");o.on("change",a),0===o.filter(":checked").length&&o.eq(0).prop("checked",!0),a()}if(t.find(".getpaid-payment-form-items-select").length){a=function(){i([t.find(".getpaid-payment-form-items-select select").val()])};var r=t.find(".getpaid-payment-form-items-select select");r.on("change",a),r.val()||r.find("option:first").prop("selected","selected"),a()}getpaid_form(t).init(),t.on("submit",function(i){i.preventDefault(),wpinvBlock(t),t.find(".getpaid-payment-form-errors, .getpaid-custom-payment-form-errors").html("").addClass("d-none"),t.find(".is-invalid,.is-valid").removeClass("is-invalid is-valid");var a=t.data("key"),n={submit:!0,delay:!1,data:t.serialize(),form:t,key:a};if("no"==t.data("isFree")&&e("body").trigger("getpaid_payment_form_before_submit",[n]),n.submit){var o=!0,r=function(){return e.post(WPInv.ajax_url,n.data+"&action=wpinv_payment_form&_ajax_nonce="+WPInv.formNonce).done(function(i){if("string"!=typeof i){if(i.success)return i.data.action&&"redirect"!=i.data.action||(window.location.href=decodeURIComponent(i.data)),"auto_submit_form"==i.data.action&&(t.parent().append('<div class="getpaid-checkout-autosubmit-form">'+i.data.form+"</div>"),e(".getpaid-checkout-autosubmit-form form").submit()),void("event"==i.data.action&&(e("body").trigger(i.data.event,[i.data.data,t]),o=!1));t.find(".getpaid-payment-form-errors").html(i.data).removeClass("d-none"),t.find(".getpaid-payment-form-remove-on-error").remove(),i.invoice&&(localStorage.setItem("getpaid_last_invoice_"+t.find('input[name="form_id"]').val(),i.invoice),0==t.find('input[name="invoice_id"]').length&&t.append('<input type="hidden" name="invoice_id" />'),t.find('input[name="invoice_id"]').val(i.invoice))}else t.find(".getpaid-payment-form-errors").html(i).removeClass("d-none")}).fail(function(e){t.find(".getpaid-payment-form-errors").html(WPInv.connectionError).removeClass("d-none"),t.find(".getpaid-payment-form-remove-on-error").remove()}).always(function(){o&&wpinvUnblock(t)})};if(n.delay){e("body").bind("getpaid_payment_form_delayed_submit"+a,function i(){n.submit?r():wpinvUnblock(t),e("body").unbind("getpaid_payment_form_delayed_submit"+a,i)})}else r()}else wpinvUnblock(t)})};e(".getpaid-payment-form").each(function(){t(e(this))}),e(document).on("click",".getpaid-payment-button",function(i){if(i.preventDefault(),e("#getpaid-payment-modal .modal-body-wrapper").html('<div class="d-flex align-items-center justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>'),window.bootstrap&&window.bootstrap.Modal){var a=new window.bootstrap.Modal(document.getElementById("getpaid-payment-modal"));a.show()}else e("#getpaid-payment-modal").modal();var n=e(this).data();n.action="wpinv_get_payment_form",n._ajax_nonce=WPInv.formNonce,n.current_url=window.location.href,e.get(WPInv.ajax_url,n,function(i){e("#getpaid-payment-modal .modal-body-wrapper").html(i),a?a.handleUpdate():e("#getpaid-payment-modal").modal("handleUpdate"),e("#getpaid-payment-modal .getpaid-payment-form").each(function(){t(e(this))})}).fail(function(t){e("#getpaid-payment-modal .modal-body-wrapper").html(WPInv.connectionError),a?a.handleUpdate():e("#getpaid-payment-modal").modal("handleUpdate")})}),e(document).on("click",'a[href^="#getpaid-form-"], a[href^="#getpaid-item-"]',function(i){var a=e(this).attr("href");if(-1!=a.indexOf("#getpaid-form-"))var n={form:a.replace("#getpaid-form-","")};else{if(-1==a.indexOf("#getpaid-item-"))return;n={item:a.replace("#getpaid-item-","")}}if(i.preventDefault(),e("#getpaid-payment-modal .modal-body-wrapper").html('<div class="d-flex align-items-center justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>'),window.bootstrap&&window.bootstrap.Modal){var o=new window.bootstrap.Modal(document.getElementById("getpaid-payment-modal"));o.show()}else e("#getpaid-payment-modal").modal();n.action="wpinv_get_payment_form",n._ajax_nonce=WPInv.formNonce,e.get(WPInv.ajax_url,n,function(i){e("#getpaid-payment-modal .modal-body-wrapper").html(i),o?o.handleUpdate():e("#getpaid-payment-modal").modal("handleUpdate"),e("#getpaid-payment-modal .getpaid-payment-form").each(function(){t(e(this))})}).fail(function(t){e("#getpaid-payment-modal .modal-body-wrapper").html(WPInv.connectionError),o?o.handleUpdate():e("#getpaid-payment-modal").modal("handleUpdate")})}),e(document).on("change",".getpaid-address-edit-form #wpinv-country",function(t){var i=e(this).closest(".getpaid-address-edit-form").find(".wpinv_state");if(i.length){wpinvBlock(i.parent());var a={action:"wpinv_get_aui_states_field",country:e(this).val(),state:i.val(),class:"wpinv_state",name:i.attr("name"),_ajax_nonce:WPInv.nonce};e.get(WPInv.ajax_url,a,function(e){"object"==_typeof(e)&&i.parent().replaceWith(e.data.html)}).always(function(){wpinvUnblock(i.parent())})}}),RegExp.getpaidquote=function(e){return console.log(e),e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},e(document).on("input",".getpaid-validate-minimum-amount",function(t){var i=new RegExp(RegExp.getpaidquote(WPInv.thousands),"g"),a=new RegExp(RegExp.getpaidquote(WPInv.decimals),"g"),n=e(this).val();n=(n=n.replace(i,"")).replace(a,"."),isNaN(parseFloat(n))&&(e(this).data("minimum-amount")?e(this).val(e(this).data("minimum-amount")):e(this).val(0))})});