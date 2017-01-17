/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.model = (function($){
  var timer, score, tags, characters, user;

  var getCharacters = function getCharacters() {
    return $.ajax({
      url: "/characters",
      method: "GET",
      dataType: "json"
    });
  };

  var getScore = function getScore() {

  };

  var getTags = function getTags() {
    return $.ajax({
      url: "/tags",
      method: "GET",
      dataType: "json"
    });
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
    tags: getTags,
    characters: getCharacters,
    createTag: createTag,
  };

})($);
