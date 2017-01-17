var WALDO = WALDO || {
  Tagger = {}
}

WALDO.Tagger.controller = (function(){
  var model, view;
  var init = function(m, v){
    model = m;
    view = v;
  }

  return init;
})()
