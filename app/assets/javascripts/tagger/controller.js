var WALDO = WALDO || {
  Tagger: {}
}

WALDO.Tagger.controller = (function(){
  var model, view;
  var init = function(m, v){
    model = m;
    view = v;

    view.init(callbacks);
  };

  var callbacks = {
    getCharacters: getCharacters
  };

  var getCharacters = function getCharacters() {
    return model.getCharacters();
  };

  return init;
})()
