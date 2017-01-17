/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.view = (function($){

  var $tagSquare, $wrapper, characters, callbacks;

  var _createTagSquare = function _createTagSquare() {
    $tagSquare = $('<div>').addClass('frame');
    $wrapper.append($tagSquare);
  };

  var _addTagListener = function _addTagListener() {
    $wrapper.on('mousemove', _moveTagSquare);
  };

  var _moveTagSquare = function _moveTagSquare(e) {
    $tagSquare.css({ left: e.pageX - 50, top: e.pageY - 50 });
  };

  var _addCreateTagListener = function _addCreateTagListener() {
    $wrapper.on('click', _createTag);
  };

  var _createTag = function _createTag() {
    var $newTagSquare = $tagSquare.clone();
    $newTagSquare.addClass('active');

    var $dropdown = $('<select>');
    _getCharacters().then(function(options) {
      $dropdown.append(options);
    });
  };

  var _getCharacters = function _getCharacters(characters) {
    var options = '';
    return callbacks.getCharacters().then(function(response) {
      for (var i = 0; i < response.length; i++) {
        options += "<option value='" + response[i].id + "'>" + response[i].name + "</option>";
      }
      return options;
    });
  };

  var init = function(controllerCallbacks) {
    callbacks = controllerCallbacks;
    $wrapper = $('#wrapper');
    _createTagSquare();
    _addTagListener();
    _addCreateTagListener();
  };

  return {
    init: init
  };

})($);
