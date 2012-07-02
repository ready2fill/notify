;(function($, window, undefined){
/**
 * Copyright (c) 2012 Ready2fill Services S.C. [angel at ready2fill dot com]
 * Licensed under the MIT license
 */

  /**
   * Constructor
   **/

	var Notification = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);

    if(this.init){
      this.init(options);
    }
	}

  Notification.prototype = {

    defaults : {
      message : '', 
      duration : 7000,
      messageClass : 'info',
      classPrefix : 'hdr-notifications',
      easing : 'swing'
    },

    init : function(options) {
      this.settings = $.extend({}, this.defaults, options[0]);
    },

    test : function() {
      console.log(this.settings);
    },

  /**
   * Methods
   **/

    hide : function() {
      this.$elem.hide();  

      return this;
    },

    show : function() {
      
      that = this;

      this.$elem.removeClass(function() {
        return that.$elem.attr('class');
      })
      .addClass(this.settings.classPrefix + ' ' + this.settings.messageClass )
      .html('<p>' + this.settings.message + '</p>');

      this.$elem.show();  

      // disable fade out
      if(this.settings.duration === 0) {
        console.log('fade out disabled');
        return this;
      }

      this.$elem.fadeOut(this.settings.duration, this.settings.easing);

      return this;
    },

  }

  /**
   * Plug-in hook 
   **/

  $.fn.notify = function(options) {
    if(typeof options == 'string') {
      method = options;
      args = Array.prototype.slice.call(arguments, 1);

      var notification = this.data('notification') ?
      this.data('notification') :
      new Notification(this, args);

      if(notification[method]) {
        notification[method].apply(notification, args);
      }

    } else if(typeof options === 'object' || !options) {
      this.data('notification', new Notification(this, options));
    } else {
      $.error('Error: wrong parameters');
    }

    return this;
  },

  /**
   * Export 
   **/

  window.Notification = Notification;
	
})(jQuery, window);
