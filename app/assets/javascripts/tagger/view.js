/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.view = (function($){

  var $tagSquare, $wrapper, characters, callbacks, currentTag, $dropdown, $newTagSquare;

  var _createTagSquare = function _createTagSquare() {
    $tagSquare = $('<div>').addClass('frame');
    $wrapper.append($tagSquare);
  };

  var _addTagListener = function _addTagListener() {
    $wrapper.on('mousemove', _moveTagSquare);
  };

  var _setCancelListener = function _setCancelListener(){
    $(document).on("keydown", function(e){
      if(e.which === 27){
        _destroyCurrentTag();
      }
    });
  }

  var _moveTagSquare = function _moveTagSquare(e) {
    $tagSquare.css({ left: e.pageX - 50, top: e.pageY - 50 });
  };

  var _addCreateTagListener = function _addCreateTagListener() {
    $wrapper.on('click', _createTag);
  };

  var _createTags = function _createTags(tags){
    for(var i = 0;i < tags.length; i++){
      _createTag(tags[i]);
    }
  }

  var _createTag = function _createTag(e) {
    if(e.character){
      _renderTag(e);
    } else {
      _cloneTag(e);
    }
  };


  var _renderTag = function _renderTag(tag){
    $newTagSquare = $('<div>')
                      .addClass('frame')
                      .addClass('active');

    $newTagSquare.css({
      top: tag.y,
      left: tag.x
    })
    $label = $("<span>")
              .text(tag.character.name);
    $label.appendTo($newTagSquare)

    $newTagSquare.appendTo($wrapper);
  }

  var _cloneTag = function _cloneTag(e){
    $wrapper.off();
    currentTag = { x: e.pageX, y: e.pageY };

    $newTagSquare = $tagSquare.clone();
    $newTagSquare.addClass('active');
    $newTagSquare.appendTo($wrapper);
    _createDropdown($newTagSquare);
  }

  var _destroyCurrentTag = function _destroyCurrentTag(){
    $dropdown.off();
    $newTagSquare.remove();
    _addCreateTagListener();
    _addTagListener();
  }

  var _createDropdown = function _createDropdown($newTagSquare) {
    $dropdown = $('<select>');
    _getCharacters().then(function(options) {
      $dropdown.append(options);
    });
    $dropdown.appendTo($newTagSquare);
    $dropdown.on('change', _setCharacter);
  };

  var _setCharacter = function _setCharacter(e) {
    var character = e.target.value;
    callbacks.setCharacter(character, currentTag);
    $dropdown.off();
    $square = $dropdown.parent();
    $label = $("<span>")
              .text($dropdown.children("option:selected").text());
    $square.append($label);
    $dropdown.remove();
    setTimeout(function() {
      _addCreateTagListener();
      _addTagListener();
    },0);
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

  var init = function(existingTags, controllerCallbacks) {
    callbacks = controllerCallbacks;
    $wrapper = $('#wrapper');
    _createTags(existingTags);
    _createTagSquare();
    _addTagListener();
    _addCreateTagListener();
    _setCancelListener();
  };

  return {
    init: init
  };

})($);
