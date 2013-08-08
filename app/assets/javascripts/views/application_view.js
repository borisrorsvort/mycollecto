// Safe After Render http://mavilein.github.io/javascript/2013/08/01/Ember-JS-After-Render-Event/

Ember.View.reopen({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent : function(){
  }
});


Mycollecto.ApplicationView = Em.View.extend({});
