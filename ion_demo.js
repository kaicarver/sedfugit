/**
 * demo.js
 * © 2015 Denis Ineshin | IonDen.com
 */

$(function () {
  "use strict";

  window.ion = ion || {};

  ion.Demo = function (wrap, config) {
    config = config || {};

    this.$wrap = $("#" + wrap);
    this.$items = this.$wrap.find(".js-sound");
    this.items = {};
    this.create = config.create;

    this.init();
  };

  ion.Demo.prototype = {
    init: function () {
      var self = this,
          $this,
          name;

      this.$items.each(function () {
        $this = $(this);
        name = $this.data("name");
        self.items[name] = $this;
      });

      this.$items.on("click", ".js-action", function (e) {
        name = $(e.delegateTarget).data("name");
        self.action($(this), name);
      });
    },

    destroy: function () {
      this.$items.off();
      this.$items = null;
      this.items = null;
      this.$wrap = null;
    },

    loaded: function (config) {
      var name = config.alias || config.name;

      this.items[name] && this.items[name].addClass("loaded");
    },

    ended: function (config) {
      var name = config.alias || config.name;

      this.items[name] && this.items[name].addClass("ended");
      setTimeout(this.removeEnded.bind(this, name), 500);
    },

    removeEnded: function (name) {
      this.items[name] && this.items[name].removeClass("ended");
    },

    action: function ($el, name) {
      var action = $el.data("action"),
          config = $el.data("config") || null;

      if (action === "create") {
        this.create();
      } else {
        if (action === "destroy") {
          this.items[name] && this.items[name].removeClass("loaded");
        }
        ion.sound[action](name, config);
      }
    }
  };

});
