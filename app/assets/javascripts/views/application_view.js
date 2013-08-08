// Safe After Render http://mavilein.github.io/javascript/2013/08/01/Ember-JS-After-Render-Event/

Ember.View.reopen({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent : function(){
    // implement this hook in your own subclasses and run your jQuery logic there
  }
});


Mycollecto.ApplicationView = Em.View.extend({});
