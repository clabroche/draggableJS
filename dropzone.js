const $ = require("jquery");

module.exports = {
  start: function (e) {
    console.log('started dragging', {
      card: $(e.item).data('id'),
      index: $(e.item).index(),
    })
  },
  swapped: function ($1, $2) {
    console.log('col '+this._id+' swap', $1.text().trim(), $2.text().trim());
  },
  appended: function ($el) {
    console.log('col '+this._id+'add', $el.text());
  },
  removed: function ($el) {
    console.log('col '+this._id+'remove', $el.text());
  },
  end: function (e) {
    console.log('finished dragging', {
      card: $(e.item).data('id'),
      index: $(e.item).index(),
    })
  }
}