// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPosition = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // movement should multiply  by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not passed boundary
    if (this.x < this.boundary) {
        //Move forward
        //Increment x by speed * dt
        this.x += this.speed * dt; 
    }
        
     else
        //Reset position to start
        this.x = this.resetPosition;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  Writeing  player class
// This class contains an update(), render() and
// a handleInput() method.
 
// Champ class Constructor

class Champ {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) +55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;   
    }

    // Methods

    // Update position
    update() {
        // Check collition here
        for( let enemy of allEnemies) {
            
            // Did player x  and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x
                && enemy.x < this.x + this.step/2)) {
                this.reset();
            }
            
        }
                    
        // Check win!
            // Did player x and y reach the final tile?
            if (this.y === 55) {
                this.victory = true;
            }
    }

    // Draw champ sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Update champ's x and y coordination according to the input
     * 
     * @param {string} input - Direction of travel
     */
    handleInput(input) {
        switch(input) {
            case 'left' :
                if (this.x > 0 ) {
                    this.x -= this.step;
                }
                break;
            case 'up' :
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }  
                break;
            case 'right' :
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down' :
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }
    // Reset Champ
    reset() {
        // Set x and y to start x and y 
        this.y = this.startY;
        this.x = this.startX
    }

        
}
// Instantiating champ object in a variable called player.
const player = new Champ();
const bug1 = new Enemy(-101,0,200);
const bug2 = new Enemy(-101,83,300);
const bug3 = new Enemy((-101*2.5),83,300);
// Initialize allEnemies array
const allEnemies = [];
// Placeing all enemy objects in an array called allEnemies
allEnemies.push(bug1,bug2,bug3);
           

// This listens for key presses and sends the keys to the
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
