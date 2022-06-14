var laneArray = [30, 125, 225];
var speed = 5;

class Car {
  constructor(containerID) {
    this.x = 0;
    this.y = 0;
    this.element = null;

    //initializes car object
    this.init = function () {
      this.element = document.createElement("img");
      this.element.setAttribute("class", "car");

      this.carWidth = this.carWidth;
      this.carHeight = this.carHeight;

      var container = document.getElementById(containerID);
      container.appendChild(this.element);
    };

    /**
     * sets car position, called from carGameanimation obj
     * @param  {random number generated betn lane Array} randX
     * @param  {number = 0} randY
     */
    this.setCarPosition = function (randX, randY) {
      this.x = laneArray[randX];
      this.y = -50;
    };

    //sets top & left pos
    this.draw = function () {
      this.element.style.top = this.y + "px";
      this.element.style.left = this.x + "px";
    };

    //removes object
    this.removeCar = function () {
      this.element.remove();
    };
  }
}
