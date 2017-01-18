var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.controller = (function(){
  var model, view
  var init = function(m, v){
    model = m;
    view = v;
    var callbacks = {
      getCharacters: getCharacters,
      setCharacter: setCharacter,
      deleteTag: deleteTag,
      checkGameEnd: model.checkGameEnd
    };
    model.characters().then(function(){
      model.tags().then(function(tags){
        view.init(tags, callbacks);
      })
    })

  };

  var getCharacters = function getCharacters() {
    return model.characters();
  };

  var setCharacter = function setCharacter(character, coordinates) {
    return model.create(character, coordinates).then(function(response) {
      if (model.checkGameEnd()) {
        return "Game Over";
      } else {
        return response;
      }
    });
  };

  var deleteTag = function deleteTag(id) {
    console.log(id);
    return model.delete(+id);
  };



  return init;
})();
