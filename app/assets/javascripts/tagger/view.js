/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.view = (function($){

  var $tagSquare, $wrapper, characters, callbacks, currentTag;

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

  var _createTag = function _createTag(e) {
    $wrapper.off();
    currentTag = { x: e.pageX, y: e.pageY };

    var $newTagSquare = $tagSquare.clone();
    $newTagSquare.addClass('active');
    $newTagSquare.appendTo($wrapper);
    _createDropdown($newTagSquare);
  };

  var _createDropdown = function _createDropdown($newTagSquare) {
    var $dropdown = $('<select>').css({ left: 0, bottom: 0 });
    _getCharacters().then(function(options) {
      $dropdown.append(options);
    });
    $dropdown.appendTo($newTagSquare);
    $dropdown.on('change', _setCharacter);
  };

  var _setCharacter = function _setCharacter(e) {
    var character = e.target.value;
    callbacks.setCharacter(character, currentTag);
    setTimeout(function() {
      _addCreateTagListener();
      _addTagListener();
    }, 100);
  };

  var _getCharacters = function _getCharacters() {
    var options = '<option value="--" disabled selected> </option>';
    return callbacks.getCharacters().then(function(characters) {
      for (var i = 0; i < characters.length; i++) {
        options += "<option value='" + characters[i].id + "'>" + characters[i].name + "</option>";
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
