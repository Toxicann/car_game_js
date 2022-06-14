class CarGameAnimation {
  constructor(container, background) {
    var obsCars = [];
    var obstacleGap = 0;
    var player = new Car(container);
    var gamePlayInterval = null;
    var isplayerAlive = true;
    var gameOver = document.getElementById("gameOver");
    var score = document.getElementById("score");
    var Hscore = document.getElementById("Hscore");
    score.style.display = "block";
    var scoreCount = 1;

    //initialization function
    this.init = function () {
      Hscore.style.display = "none";
      gameOver.style.display = "none";
      generatePlayer();
      gamePlayInterval = setInterval(moveObstacles, 60);
    };

    //generate player model
    function generatePlayer() {
      player.x = laneArray[1];
      player.y = ROAD_DISPLAY_HEIGHT - CAR_HEIGHT - 15;
      player.init();
      player.element.setAttribute("class", "player");
      player.element.setAttribute("src", "./assets/my_car.png");
      applyStyles(player.element, {
        position: "absolute",
        height: CAR_HEIGHT + "px",
        width: CAR_WIDTH + "px",
        top: player.y + "px",
        left: player.x + "px",
      });
      player.draw();
      document.addEventListener("keydown", handleMyCar);
    }

    //set stop flag & clear interval
    var stopGame = function () {
      clearInterval(gamePlayInterval);
      isplayerAlive = false;
    };

    //rectangle collision detection between cars
    var colissionDetection = function () {
      obsCars.forEach((obs) => {
        if (
          player.x < obs.x + CAR_WIDTH &&
          player.x + CAR_WIDTH > obs.x &&
          player.y < obs.y + CAR_HEIGHT &&
          CAR_HEIGHT + player.y > obs.y
        ) {
          Hscore.innerHTML = `HighScore: ${localStorage.HighCount}`;
          stopGame();
          Hscore.style.display = "inline";
          gameOver.style.display = "block";
          gameOver.innerHTML = "Game Over, press any key to restart.";
        }
      });
    };

    //car controller
    function handleMyCar(event) {
      if (
        (event.code == "ArrowRight" || event.code == "KeyD") &&
        isplayerAlive
      ) {
        if (player.x < 125) {
          player.x = 125;
        } else if (player.x < 225) {
          player.x = 225;
        }
      }

      if (
        (event.code == "ArrowLeft" || event.code == "KeyA") &&
        isplayerAlive
      ) {
        if (player.x > 125) {
          player.x = 125;
        } else if (player.x > 30) {
          player.x = 30;
        }
      }
      player.draw();

      if (!isplayerAlive && event.keyCode != 0) {
        isplayerAlive = true;
        player.removeCar();
        obsCars.forEach((obstacle) => {
          obstacle.removeCar();
        });

        Hscore.display = "none";
        scoreCount = 0;
        score.innerHTML = "";
        speed = 5;
        startGame = new CarGameAnimation(container, background).init();
      }
    }

    //create obstacle cars
    var createObstacles = function () {
      var obstacle = new Car(container);
      var randX = getRandomNumber(0, 2);
      var randY = 0;
      obstacle.setCarPosition(randX, randY);
      obstacle.init();
      obstacle.element.setAttribute("class", "obstacle");
      obstacle.element.setAttribute("src", "./assets/opponent_car.png");
      applyStyles(obstacle.element, {
        position: "absolute",
        height: CAR_HEIGHT + "px",
        width: CAR_WIDTH + "px",
        top: player.y + "px",
        left: player.x + "px",
      });
      obstacle.draw();
      obsCars.push(obstacle);
    };

    //move obstacle cars
    var moveObstacles = function () {
      obstacleGap++;
      if (obstacleGap == 40) {
        createObstacles();
        obstacleGap = 0;
      }
      moveBackground();
      for (var i = 0; i < obsCars.length; i++) {
        var car = obsCars[i];
        car.y += speed;
        if (car.y >= ROAD_DISPLAY_HEIGHT - CAR_HEIGHT) {
          scoreCount += i;
          console.log(localStorage.HighCount, scoreCount);
          if (localStorage.HighCount < scoreCount) {
            localStorage.HighCount = scoreCount;
          }
          score.innerHTML = "Your Score: " + scoreCount;
          car.removeCar();
          obsCars.splice(i, i);
        }
        colissionDetection();
        car.draw();
      }
    };

    //style background road
    var background_road = document.getElementById(background);
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

    //move background
    function moveBackground(background) {
      var margin = parseInt(
        getComputedStyle(background_road).getPropertyValue("margin-top")
      );
      margin += speed;
      speed += VELOCITY;

      if (margin > 0) {
        margin = ROAD_DISPLAY_HEIGHT - TOTAL_ROAD_HEIGHT;
      }
      background_road.style.marginTop = margin + "px";
    }
  }
}
