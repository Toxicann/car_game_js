var isinitial = true;

window.addEventListener("keypress", function (event) {
  if (event.keyCode != 0 && isinitial) {
    isinitial = false;
    var startGame = new CarGameAnimation("container", "road-background").init();
  }
});

//style background road
var background_road = document.getElementById("road-background");
applyStyles(background_road, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: TOTAL_ROAD_HEIGHT + "px",
  backgroundImage: "url('./assets/road_figma.png')",
  backgroundRepeat: "repeat-y",
  marginTop: ROAD_DISPLAY_HEIGHT - TOTAL_ROAD_HEIGHT + "px",
});
