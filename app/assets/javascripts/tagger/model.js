/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.model = (function($){
  var timer, score, tags, characters, user, charsLeft;

  var getCharacters = function getCharacters() {
    return $.ajax({
      url: "/characters",
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      charsLeft = response.length;
      return response;
    });
  };

  var getScore = function getScore() {

  };

  var getTags = function getTags() {
    return $.ajax({
      url: "/tags",
      method: "GET",
      dataType: "json"
    }).then(function(resp){
      return resp.tags
    });
  };

  var getUser = function getUser() {

  };

  var createTag = function createTag(character, coordinates) {
    var data = "tag[character_id]=" + character + "&tag[x]=" + coordinates.x + "&tag[y]=" + coordinates.y;
    return $.ajax({
      url: "/tags",
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: data
    });
  };

  var deleteTag = function deleteTag(id) {
    return $.ajax({
      url: "/tags/"+id,
      method: "DELETE"
    });
  };

  var checkGameEnd = function checkGameEnd() {
    return charsLeft <= 1;
  };

  return {
    tags: getTags,
    characters: getCharacters,
    create: createTag,
    delete: deleteTag,
    checkGameEnd: checkGameEnd,
  };

})($);
