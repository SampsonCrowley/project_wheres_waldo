/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.model = (function($){
  var timer, score, tags, characters, user;

  var getCharacters = function getCharacters() {
    return $.Deferred().resolve([
      { id: 1, name: "char1"},
      { id: 2, name: "char2"}
    ]);
  };

  var getScore = function getScore() {

  };

  var getTags = function getTags() {

  };

  var getUser = function getUser() {

  };

  var createTag = function createTag(character, coordinates) {
    var data = "tag[character_id]=" + character + "&tag[x]=" + coordinates.x + "&tag[y]=" + coordinates.y;
    $.ajax({
      url: "/tags",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: data
    });
  };

  return {
    characters: getCharacters,
    createTag: createTag,
  };

})($);
