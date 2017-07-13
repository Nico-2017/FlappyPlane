jQuery("#credits").on("click", function() {
  var message = "Game created by Nico";
  jQuery("#credits").append(
    "<p>" + message + "</p>"
  );
});

jQuery("#scorebtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
        "<li>" + "Me" + "</li>" +
        "<li>" + "Also Me" + "</li>" +
        "<li>" + "Me again" + "</li>" +
      "</ul>"
  );

});

jQuery("#creditsbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<div>" + "Game created by Nico" + "</div>"
  );
});

jQuery("helptbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
       "<li>" + "Press Space to flap your wings" + "</li>" +
       "<li>" + "Avoid the incoming pipes" + "</li>" +
     "</ul>"

  );
});

function registerScore(score) {
  var scoreList = [score];
  var playerName = prompt("What is your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
}
