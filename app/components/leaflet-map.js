import LeafletMapComponent from 'ember-leaflet/components/leaflet-map';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default LeafletMapComponent.extend(ResizeAware, {
  didInsertElement() {
    this._super();
    this.resize();
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
