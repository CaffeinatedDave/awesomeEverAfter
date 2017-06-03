function loadScript(file) {
  $.getJSON('stories/'+file, function(json) {
    console.log(json); // this will show the info it in firebug console
    window.story = json.story;
    $("#mainframe").html(
      "<h2>" + json.title + "</h2>" +
      "<div id=\"slide\"></div>" +
      "<div id=\"controls\"></div>");
    loadSlide(json.start);
  });
}

function errorButton(b) {
  $(b).removeClass();
  $(b).addClass('btn');
  $(b).addClass('storyButton');
  $(b).addClass('btn-danger');
}

function loadSlide(slide) {
  const selectedSlide = window.story.filter(function(e) {return e.slide == slide})[0];
  $('#mainframe').css("background-image", 'url("/img/'+selectedSlide.bgImg+'")');
  $('#slide').html('<div class="text">' + selectedSlide.text + '</div>');
  options = '<div class="row">';
  if (selectedSlide.type === "finish") {
    options += '<div class="col-12"><button onclick="location.href=\'/storytime\'" class="btn storyButton green">Finish</button></div>';
  } else {
    const rowsize = 12 / selectedSlide.continue.length;
    selectedSlide.continue.forEach(function(e) {
      if (e.answer === false) {
        options += '<div class="col-xs-'+rowsize+'"><button class="btn storyButton '+e.color+'" onclick="errorButton(this);">'+e.text+'</button></div>';
      } else {
        options += '<div class="col-xs-'+rowsize+'"><button class="btn storyButton '+e.color+'" onclick="loadSlide(\''+e.slide+'\');">'+e.text+'</button></div>';
      }
    });
  }
  options += "</div>";
  $('#controls').html(options);
}
