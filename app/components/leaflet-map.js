import LeafletMapComponent from 'ember-leaflet/components/leaflet-map';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default LeafletMapComponent.extend(ResizeAware, {
  didInsertElement() {
    this._super();
    this.resize();
  },

  didCreateLayer() {
    this._super(...arguments);
    // Adding geolocation map control
    this.L.control.locate({
      icon: 'paper-icon md-font material-icons md-default-theme room',
      iconLoading: 'paper-icon md-font material-icons md-default-theme autorenew md-spin',
    }).addTo(this._layer);
  },

  debouncedDidResize () {
    this.resize();
  },

  resize () {
    if (this._layer) {
      this._layer._container.style.height = `${window.innerHeight - 64}px`;
      this._layer.invalidateSize();
    }
  }
});
