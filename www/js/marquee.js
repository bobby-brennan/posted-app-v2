var PLACEHOLDERS = [
  "Ebola",
  "Hillary Clinton 2016",
  "Syrian Conflict",
  "Boston Red Sox",
  "Lady Gaga",
  "The Federal Reserve",
  "Vladimir Putin",
  "Amazon",
  "Supreme Court Cases",
  "GOOGL stock",
  "NASA",
  "Jack White",
  "Miley Cyrus",
  "Barack Obama",
  "Ron Paul",
  "Ukraine",
  "Android L",
  "General Motors",
  "Space X",
  "Large Hadron Collider",
  "Net Neutrality",
  "Fracking",
  "Climate Change",
  "Johnny Depp",
  "Jon Stewart",
  "Ron Paul",
  "Immigration",
  "Boko Haram",
  "European Union",
  "Kanye West",
  "Dallas Cowboys",
  "Derek Jeter",
  "Enterovirus",
  "Netflix",
  "Islamic State",
  "Diabetes",
  "Heart Disease",
  "Childhood Obesity",
];

var curPlaceholderIdx = -1;
var curChar = 0;
var CURSOR_ON = false;
var BLINK_RUN, PLACE_HOLDER_RUN;

var SELECTOR = "";

var cancelAnimation = function() {
  if (BLINK_RUN) {
    clearTimeout(BLINK_RUN);
    BLINK_RUN = null;
  }
  if (PLACE_HOLDER_RUN) {
    clearTimeout(PLACE_HOLDER_RUN);
  }
  $(SELECTOR).attr('placeholder', '');
}
var runAnimation = function(startPlaceholder) {
  if (startPlaceholder) {
    curPlaceholderIdx = startPlaceholder;
  }
  cancelAnimation();
  updatePlaceholder();
}

var BLINK_DELAY = 350;
var TYPE_DELAY = 100;
var SPACE_DELAY = 0;
var END_DELAY = 1750;

var blinkCursor = function(times, onDone) {
  if (times === 0) return onDone();
  var curVal = $(SELECTOR).attr('placeholder');
  if (!curVal) {curVal = '';}
  if (curVal === '') {
    $(SELECTOR).attr('placeholder', '|'); 
  } else {
    $(SELECTOR).attr('placeholder', '');
  }
  BLINK_RUN = setTimeout(function() {blinkCursor(times - 1, onDone)}, BLINK_DELAY);
}
var updatePlaceholder = function() {
  var curPlaceholder = PLACEHOLDERS[curPlaceholderIdx];
  if (curPlaceholderIdx === -2) {
    var curVal = $(SELECTOR).attr('placeholder');
    if (curVal == '..' || curVal === '.') {
      curVal += '.';
    } else {
      curVal = '.';
    }
    $(SELECTOR).attr('placeholder', curVal);
    PLACE_HOLDER_RUN = setTimeout(updatePlaceholder, 200);
  } else if (curPlaceholderIdx === -1 || curChar === curPlaceholder.length) {
    curChar = 0;
    var oldIdx = curPlaceholderIdx;
    while (oldIdx === curPlaceholderIdx) {
      curPlaceholderIdx = Math.floor(Math.random() * PLACEHOLDERS.length);
    }
    setTimeout(function() {
      blinkCursor(5, updatePlaceholder);
    }, END_DELAY);
  } else {
    var addedChar = curPlaceholder.substring(curChar, curChar + 1);
    $(SELECTOR).attr('placeholder', curPlaceholder.substring(0, curChar + 1) + (CURSOR_ON ? '|' : ''));
    curChar++;
    PLACE_HOLDER_RUN = setTimeout(updatePlaceholder, addedChar === ' ' ? SPACE_DELAY : TYPE_DELAY);
  }
}

var Marquee = {};

Marquee.started = false;

Marquee.start = function(selector) {
  if (Marquee.started) return;
  Marquee.started = true;
  console.log('starting marquee:' + selector);
  SELECTOR = selector;
  runAnimation(-1);
  console.log('setting focus listener');
  $(SELECTOR).focus(function(){console.log('focus!');Marquee.stop(true)});
}

Marquee.stop = function(restartOnBlur) {
  cancelAnimation();
  $(SELECTOR).blur(function(){Marquee.start(SELECTOR)});
  Marquee.started = false;
}
