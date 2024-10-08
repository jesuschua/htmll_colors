const container = document.getElementById('color-container');
// import json_file from './sorted_via_absolute_red.json';

function loadJSON(callback, color_family) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    var filename = './sorted_via_absolute_'+ color_family +'.json';
    // console.log(filename);
    xobj.open('GET', filename, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function get_color_from_red(num, callback) {
loadJSON(function(response) {
    var actual_JSON = JSON.parse(response);
    var color = actual_JSON[num];
    callback(color);
}, 'red');
}

function get_color_from_green(num, callback) {
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
        var color = actual_JSON[num];
        callback(color);
    }, 'green');
}

function get_color_from_blue(num, callback) {
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
        var color = actual_JSON[num];
        callback(color);
    }, 'blue');
}

function generate_rand_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function assemble_colors(level) {
    const getColor = (colorFamily, num) => {
        return new Promise((resolve, reject) => {
            if (colorFamily === 'red') {
                get_color_from_red(num, function(color) {
                    const swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color[0];
                    swatch.textContent = color.name;
                    swatch.style.color = 'black';
                    container.appendChild(swatch);
                    resolve({ color: color[0], element: swatch }); // Resolve with the color value and the swatch element
                });
            } else if (colorFamily === 'green') {
                get_color_from_green(num, function(color) {
                    const swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color[0];
                    swatch.textContent = color.name;
                    swatch.style.color = 'black';
                    container.appendChild(swatch);
                    resolve({ color: color[0], element: swatch }); // Resolve with the color value and the swatch element
                });
            } else if (colorFamily === 'blue') {
                get_color_from_blue(num, function(color) {
                    const swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color[0];
                    swatch.textContent = color.name;
                    swatch.style.color = 'black';
                    container.appendChild(swatch);
                    resolve({ color: color[0], element: swatch }); // Resolve with the color value and the swatch element
                });
            } else {
                reject(new Error('Invalid color family'));
            }
        });
    };

    let promises = [];

    if (level === 1) {
        promises = [
            getColor('red', 0),
            getColor('green', 0),
            getColor('blue', 0)
        ];
    }

    if (level === 2) {
        const red_num = generate_rand_num(1, 10);
        const green_num = generate_rand_num(1, 10);
        const blue_num = generate_rand_num(1, 10);

        promises = [
            getColor('red', red_num),
            getColor('green', green_num),
            getColor('blue', blue_num)
        ];
    }

    if (level === 3) {
        const red_num = generate_rand_num(11, 40);
        const green_num = generate_rand_num(11, 40);
        const blue_num = generate_rand_num(11, 40);

        promises = [
            getColor('red', red_num),
            getColor('green', green_num),
            getColor('blue', blue_num)
        ];
    }

    if (level === 4) {
        const red_num = generate_rand_num(41, 80);
        const green_num = generate_rand_num(41, 80);
        const blue_num = generate_rand_num(41, 80);

        promises = [
            getColor('red', red_num),
            getColor('green', green_num),
            getColor('blue', blue_num)
        ];
    }

    if (level === 5) {
        const red_num = generate_rand_num(81, 140);
        const green_num = generate_rand_num(81, 140);
        const blue_num = generate_rand_num(81, 140);

        promises = [
            getColor('red', red_num),
            getColor('green', green_num),
            getColor('blue', blue_num)
        ];
    }

    if (level === 6) {
        const num = generate_rand_num(10, 20);

        promises = [
            getColor('blue', num),
            getColor('blue', num + 2),
            getColor('blue', num + 4)
        ];
    }

    if (level === 7) {
        const num = generate_rand_num(10, 20);

        promises = [
            getColor('red', num),
            getColor('red', num + 1),
            getColor('red', num + 2)
        ];
    }

    if (level === 8) {
        const num = generate_rand_num(50, 100);

        promises = [
            getColor('green', num),
            getColor('green', num + 1),
            getColor('green', num + 2)
        ];
    }

    if (level === 9) {
        const num = generate_rand_num(50, 100);

        promises = [
            getColor('blue', num),
            getColor('blue', num + 1),
            getColor('blue', num + 2)
        ];
    }

    if (level === 10) {
        const num = generate_rand_num(50, 100);

        promises = [
            getColor('red', num),
            getColor('red', num + 1),
            getColor('red', num + 2)
        ];
    }

    // Return a promise that resolves with the three colors
    return Promise.all(promises).then(colorDataArray => {
        return colorDataArray; // Return the array of color data objects
    });
}

function set_game_level(level) {
    if (level > 10) {
        alert('You have completed the game!');
        document.getElementById('color-name').textContent = 'You Won! Thanks for playing! Refresh to start again.';
        //Show an image of the color wheel
        const img = document.createElement('img');
        img.src = './images/colors_3d_graph.png';
        img.style.width = '100%';
        img.style.margin = '0 auto'; // Center horizontally
        container.appendChild(img);        
        return;
    }

    const levelElement = document.getElementById('challenge-level');
    levelElement.textContent = "Challenge level: " + level;

    assemble_colors(level).then(colorDataArray => {
        const colors = colorDataArray.map(data => data.color);
        const swatchElements = colorDataArray.map(data => data.element);

        message = "Choose the color that is closest to the center color";
        console.log('Retrieved colors:', colors);
        
        // Choose random color from the array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        console.log('Random color:', randomColor);
        
        // Set the color-name div to the name of the color
        document.getElementById('color-name').textContent = randomColor;

        // Add click event listeners to the swatches
        swatchElements.forEach((swatch, index) => {
            swatch.addEventListener('click', function() {
                if (colors[index] === randomColor) {
                    nextLevel();
                } else {
                    alert('Incorrect! Restarting level...');
                    resetLevel();
                }
            });
        });
    });
}

function nextLevel () {
    // clear the color container
    container.innerHTML = '';
    const levelElement = document.getElementById('challenge-level');
    const level = parseInt(levelElement.textContent.split(' ')[2]);
    set_game_level(level + 1);
}

function resetLevel () {
    // clear the color container
    container.innerHTML = '';
    const levelElement = document.getElementById('challenge-level');
    levelElement.textContent = "Challenge level: " + 1;
    set_game_level(1);
}


