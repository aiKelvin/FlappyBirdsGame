'use strict';

(function () {

  window.CocoonUtils = {

    /**
     * get web page name. Used for analytics
     */
    getWPName : function () {
      var wPName = 'Dashboard';
      if(window.location.pathname.indexOf('projects') !== -1){
        wPName = 'ProjectPage';
      }
      return wPName;
    }


  };


})();
