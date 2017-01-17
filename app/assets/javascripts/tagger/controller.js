var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.controller = (function(){
  var model, view;
  var init = function(m, v){
    model = m;
    view = v;
    model.tags().then(function(tags){
      view.init(tags, callbacks);
    })
  };

  var getCharacters = function getCharacters() {
    return model.characters();
  };

  var setCharacter = function setCharacter(character, coordinates) {
    return model.create(character, coordinates);
  };

  var deleteTag = function deleteTag(id) {
    console.log(id);
    return model.delete(+id);
  };

  var callbacks = {
    getCharacters: getCharacters,
    setCharacter: setCharacter,
    deleteTag: deleteTag
  };

  return init;
})();
