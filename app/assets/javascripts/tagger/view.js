/* global $ */

var WALDO = WALDO || {
  Tagger: {}
};

WALDO.Tagger.view = (function($){

  var $tagSquare, $wrapper, characters, callbacks, currentTag, $dropdown, $newTagSquare;

  var _setMoveTagListener = function _setTagListener() {
    $wrapper.on('mousemove', _moveTagSquare);
  };

  var _setCancelListener = function _setCancelListener(){
    $(document).on("keydown", function(e){
      if(e.which === 27){
        _destroyCurrentTag();
      }
    });
  }

  var _setCreateTagListener = function _addCreateTagListener() {
    $wrapper.on('click', _createTag);
  };

  var _setDeleteTagListener = function _deleteTagListener(){
    $wrapper.on('click', '.frame button.delete-button', _deleteTag)
  }

  var _setListeners = function _setListeners(){
    // _setMoveTagListener();
    _setCreateTagListener();
    _setCancelListener();
    _setDeleteTagListener();
  }

  var _createTagSquare = function _createTagSquare() {
    $tagSquare = $('<div>').addClass('frame');
    // $wrapper.append($tagSquare);
  };

  var _moveTagSquare = function _moveTagSquare(e) {
    $tagSquare.css({ left: e.pageX - 50, top: e.pageY - 50 });
  };


  var _createTags = function _createTags(tags){
    for(var i = 0;i < tags.length; i++){
      _createTag(tags[i]);
    }
  }

  var _createTag = function _createTag(e) {
    var $square;
    if(e.character){
      $square = _renderTag(e);
    } else {
      $square = _cloneTag(e);
    }
    _addDeleteButton($square);
  };

  var _deleteTag = function _deleteTag(e){
    console.log("deleteTag")
    e.stopPropagation();
    var $square = $(e.target).parent();
    callbacks.deleteTag($square.data('id')).then(function(){
      $square.remove();
    })
  }

  var _addDeleteButton = function _addDeleteButton($square){
    var a = $('<button>').text('X').addClass('delete-button')
    $square.append(a);
  }

  var _renderTag = function _renderTag(tag){
    $newTagSquare = $('<div>')
                      .addClass('frame')
                      .addClass('active')
                      .css({
                        top: tag.y - 50,
                        left: tag.x - 50
                      })
                      .attr('data-id', tag.id);

    var $label = $("<span>")
              .text(tag.character.name);
    $label.appendTo($newTagSquare)

    $newTagSquare.appendTo($wrapper);
    return $newTagSquare;
  }

  var _cloneTag = function _cloneTag(e){
    $wrapper.off();
    currentTag = { x: e.pageX, y: e.pageY };

    $newTagSquare = $tagSquare.clone().css({ left: e.pageX - 50, top: e.pageY - 50 });
    $newTagSquare.addClass('active');
    $newTagSquare.appendTo($wrapper);
    _createDropdown($newTagSquare);
    return $newTagSquare;
  }

  var _destroyCurrentTag = function _destroyCurrentTag(){
    $dropdown.off();
    $newTagSquare.remove();
    _setCreateTagListener();
    _setMoveTagListener();
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
    $dropdown.off();
    var character = e.target.value,
        $square = $dropdown.parent();
        $label = $("<span>")
          .text($dropdown.children("option:selected").text());

    callbacks.setCharacter(character, currentTag).then(function(id){
      $square.attr("data-id", id);
        $square.append($label);
        $dropdown.remove();
        setTimeout(function() {
          _setCreateTagListener();
          _setMoveTagListener();
        },0);
    });
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
    _setListeners();
  };

  return {
    init: init
  };

})($);
