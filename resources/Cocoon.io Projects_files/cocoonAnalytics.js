'use strict';

(function () {

  window.CocoonAnalytics = {

    hasScrolled : false,

    init : function () {
      analytics.load(CocoonSettings.segment_analytics_key);
      //analytics.page(); // don't track web pages
    },

    identify : function (  ) {
      analytics.identify.apply(analytics, arguments);
    },

    track : function () {
      analytics.track.apply(analytics, arguments);
    },

    /**
     * search all elements which have 'data-analytics' attribute and add click listener in order to track
     * the event
     */
    searchElemtsToTrack : function ( attributeName ) {

      var domElements = document.getElementsByTagName('*');
      var _self = this;
      for(var i = 0; i < domElements.length; i++){
        var attr = domElements[i].getAttribute(attributeName);
        if(attr !== null){
          /**
           * check {{wPage}} and replace it depending on pathname
           */
          if(attr.indexOf('[[wPage]]')!== -1){
            if(window.location.pathname === '/'){ // home
              attr = attr.replace('[[wPage]]','Home');
            } else {
              var pN = _self.getPageName(window.location.pathname);
              if(pN) {
                attr = attr.replace('[[wPage]]', pN);
              }
            }
          }

          /**
           * add listener
           */
          this.addListener(domElements[i],'click',attr);
        }
        this.trackPricingLandTooltips(domElements[i],attributeName);
      }
    },

    addListener : function ( node , listType , attr ) {

      /**
       * force analytic event 'Login start' or 'Signup start'when clicking avatar login
       */
      if(attr.indexOf('Login Avatar From') !== -1){
        node.addEventListener(listType, function() {
          CocoonAnalytics.track(attr);
          CocoonAnalytics.track('Login Start');
        });
      } else if(attr.indexOf('SignUp Avatar From') !== -1 ){
        node.addEventListener(listType, function() {
          CocoonAnalytics.track(attr);
          CocoonAnalytics.track('Signup Start');
        });
      } else {
        node.addEventListener(listType, function() {
          CocoonAnalytics.track(attr);
        });
      }
    },

    /**
     * we need to track events from Pricing Landing tooltips
     */
    trackPricingLandTooltips : function ( node , attributeName ) {
      if(node.getAttribute('rel') && node.getAttribute('rel') === 'tooltip') {
        var attr = node.getAttribute(attributeName);
        if(attr !== null){
          this.addListener(node,'mouseover',attr);
        }
      }
    },

    initScrollListener : function () {
      var _self = this;
      window.addEventListener("scroll", function(e){
        if(!this.hasScrolled){
          this.hasScrolled = true;
          if(window.location.pathname === '/'){ // home
            CocoonAnalytics.track('Scroll From Home');
          } else {
            var pN = _self.getPageName(window.location.pathname);
            if(pN){
              CocoonAnalytics.track('Scroll From ' + pN);
            }
          }
        }
      });
    },

    getPageName : function ( pathname ) {
      var pageName = null;
      if(pathname.indexOf('/pricing') !== -1){
        pageName = 'Pricing';
      } else if(window.location.pathname === '/more-info'){ // Cocoon
        pageName = 'Cocoon';
      } else if(window.location.pathname === '/home'){ // Dashboard
        pageName = 'Dashboard';
      }
      return pageName;
    }

  };

  CocoonAnalytics.init();

  window.addEventListener("load", function load ( event ) {
    CocoonAnalytics.searchElemtsToTrack('data-analytics');
    CocoonAnalytics.initScrollListener();
  },false);


})();
