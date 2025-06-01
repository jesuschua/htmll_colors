const container = document.getElementById('color-container');
let currentLevel = 1; // Add at the top of script.js to track current level

// import json_file from './sorted_via_absolute_red.json';

// Update the loadJSON function to look in the correct directory
function loadJSON(callback, color_family) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    // Update path to use color_lists directory
    var filename = './color_lists/sorted_via_absolute_'+ color_family +'.json';
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
                    swatch.textContent = ''; // Initially hide text for animation
                    swatch.style.color = 'black';
                    swatch.style.transform = 'scale(0.8)'; // Start small
                    swatch.style.opacity = '0'; // Start invisible
                    container.appendChild(swatch);
                    
                    // Add animation classes with a staggered delay
                    setTimeout(() => {
                        swatch.style.transition = 'all 0.5s ease-out';
                        swatch.style.transform = 'scale(1)';
                        swatch.style.opacity = '1';
                        
                        // Show the text after scale animation completes
                        setTimeout(() => {
                            swatch.textContent = color.name;
                        }, 300);
                    }, 100); // Small delay for staggered effect
                    
                    resolve({ color: color[0], element: swatch });
                });
            } else if (colorFamily === 'green') {
                // Similar implementation for green with a different delay
                get_color_from_green(num, function(color) {
                    const swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color[0];
                    swatch.textContent = '';
                    swatch.style.color = 'black';
                    swatch.style.transform = 'scale(0.8)';
                    swatch.style.opacity = '0';
                    container.appendChild(swatch);
                    
                    setTimeout(() => {
                        swatch.style.transition = 'all 0.5s ease-out';
                        swatch.style.transform = 'scale(1)';
                        swatch.style.opacity = '1';
                        
                        setTimeout(() => {
                            swatch.textContent = color.name;
                        }, 300);
                    }, 200); // Different delay for staggered effect
                    
                    resolve({ color: color[0], element: swatch });
                });
            } else if (colorFamily === 'blue') {
                // Similar implementation for blue with a different delay
                get_color_from_blue(num, function(color) {
                    const swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color[0];
                    swatch.textContent = '';
                    swatch.style.color = 'black';
                    swatch.style.transform = 'scale(0.8)';
                    swatch.style.opacity = '0';
                    container.appendChild(swatch);
                    
                    setTimeout(() => {
                        swatch.style.transition = 'all 0.5s ease-out';
                        swatch.style.transform = 'scale(1)';
                        swatch.style.opacity = '1';
                        
                        setTimeout(() => {
                            swatch.textContent = color.name;
                        }, 300);
                    }, 300); // Different delay for staggered effect
                    
                    resolve({ color: color[0], element: swatch });
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

// Update this function to add CSS classes to your color options
function createColorOption(color) {
    const div = document.createElement('div');
    div.className = 'color-option';
    div.style.backgroundColor = color;
    return div;
}

// Add visual feedback when selecting a color
function handleColorSelection(isCorrect) {
    const message = document.getElementById('message');
    
    if (isCorrect) {
        message.className = 'success';
        message.textContent = 'Correct! Great job!';
    } else {
        message.className = 'error';
        message.textContent = 'Incorrect! Try again.';
    }
    
    // Update progress bar when level changes
    updateProgressBar(currentLevel);
    
    // Add pulse animation to color name
    const colorName = document.getElementById('color-name');
    colorName.classList.add('pulse');
    setTimeout(() => colorName.classList.remove('pulse'), 500);
}

// Modify the set_game_level function to update currentLevel
function set_game_level(level) {
    currentLevel = level; // Track the current level
    
    if (level > 10) {
        // Clear previous content
        container.innerHTML = '';
        
        // Create celebration container
        const celebrationContainer = document.createElement('div');
        celebrationContainer.className = 'celebration-container';
        container.appendChild(celebrationContainer);
        
        // Update message
        document.getElementById('color-name').textContent = 'You Won! Master of HTML Colors!';
        document.getElementById('color-name').className = 'winner-text pulse';
        
        // Create confetti and color cascade
        const colors = [
            "Red", "Blue", "Green", "Yellow", "Purple", "Cyan", "Magenta", "Orange",
            "Pink", "Lime", "Teal", "Indigo", "Violet", "Gold", "Coral", "Turquoise"
        ];
        
        // Add confetti elements
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            celebrationContainer.appendChild(confetti);
        }
        
        // Create color showcase
        const colorShowcase = document.createElement('div');
        colorShowcase.className = 'color-showcase';
        container.appendChild(colorShowcase);
        
        // Get all HTML named colors from our reference
        const allHTMLColors = [
            "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", 
            "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", 
            "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", 
            "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki", 
            "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", 
            "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", 
            "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", 
            "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", 
            "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", 
            "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", 
            "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", 
            "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", 
            "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", 
            "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", 
            "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", 
            "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", 
            "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", 
            "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", 
            "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", 
            "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", 
            "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", 
            "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", 
            "White", "WhiteSmoke", "Yellow", "YellowGreen"
        ];
        
        // Create a color grid that will display colors in waves
        allHTMLColors.forEach((color, index) => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            colorBox.style.animationDelay = (index * 0.03) + 's';
            
            // Add tooltip with color name
            colorBox.setAttribute('title', color);
            
            // Add click behavior to show color name
            colorBox.addEventListener('click', () => {
                document.getElementById('color-name').textContent = color;
                colorBox.classList.add('pulse');
                setTimeout(() => colorBox.classList.remove('pulse'), 500);
            });
            
            colorShowcase.appendChild(colorBox);
        });
        
        // Add play again button
        const playAgainBtn = document.createElement('button');
        playAgainBtn.textContent = 'Play Again';
        playAgainBtn.className = 'play-again-btn';
        playAgainBtn.addEventListener('click', () => resetLevel());
        container.appendChild(playAgainBtn);
        
        // Add CSS for the animations
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .celebration-container {
                position: relative;
                height: 200px;
                overflow: hidden;
                margin-bottom: 20px;
            }
            
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                top: -10px;
                opacity: 0;
                border-radius: 50%;
                animation: confetti-fall 3s ease-in-out forwards;
            }
            
            @keyframes confetti-fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(200px) rotate(720deg); opacity: 0; }
            }
            
            .winner-text {
                font-size: 24px;
                color: #3498db;
                margin: 20px 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            
            .color-showcase {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 4px;
                margin: 20px 0;
            }
            
            .color-box {
                width: 24px;
                height: 24px;
                border-radius: 4px;
                transform: scale(0);
                animation: color-appear 0.5s ease forwards;
                cursor: pointer;
                transition: transform 0.2s;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .color-box:hover {
                transform: scale(1.2) !important;
                z-index: 10;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            @keyframes color-appear {
                0% { transform: scale(0) rotate(180deg); }
                60% { transform: scale(1.2) rotate(0deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            .play-again-btn {
                background-color: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 16px;
                cursor: pointer;
                margin: 20px 0;
                transition: all 0.3s;
            }
            
            .play-again-btn:hover {
                background-color: #2980b9;
                transform: scale(1.05);
            }
            
            .fade-out {
                animation: fadeOut 0.4s forwards;
            }
            
            .fade-in {
                animation: fadeIn 0.4s forwards;
            }
            
            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            .level-transition {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 32px;
                color: #2ecc71;
                opacity: 0;
                animation: fadeInUp 0.8s forwards;
            }
            
            @keyframes fadeInUp {
                0% { opacity: 0; transform: translate(-50%, -60%); }
                100% { opacity: 1; transform: translate(-50%, -50%); }
            }
            
            .reset-transition {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 32px;
                color: #e74c3c;
                opacity: 0;
                animation: fadeInDown 0.8s forwards;
            }
            
            @keyframes fadeInDown {
                0% { opacity: 0; transform: translate(-50%, -40%); }
                100% { opacity: 1; transform: translate(-50%, -50%); }
            }
        `;
        document.head.appendChild(styleSheet);
        
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
                    // Show all color names temporarily
                    swatchElements.forEach((s, i) => {
                        // Store original text
                        const originalText = s.textContent;
                        
                        // Get the hex value of the color
                        const rgbColor = getComputedStyle(s).backgroundColor;
                        const hexColor = rgbToHex(rgbColor);
                        
                        // Mark the correct one
                        if (colors[i] === randomColor) {
                            s.textContent = colors[i] + " " + hexColor + " ✓";
                            s.style.border = "3px solid #2ecc71";
                        } else {
                            s.textContent = colors[i] + " " + hexColor;
                        }
                        
                        // Add a visual indicator for the one they clicked
                        if (s === swatch) {
                            s.style.border = "3px solid #e74c3c";
                        }
                    });
                    
                    // Update message
                    const message = document.getElementById('message');
                    message.className = 'error';
                    message.textContent = 'Incorrect! The correct color was ' + randomColor;
                    
                    // Delay before resetting
                    setTimeout(() => {
                        resetLevel();
                    }, 2500); // Show for 2.5 seconds before resetting
                }
            });
        });
    });
}

// // Update the challenge level display
// const challengeLevel = document.getElementById('challenge-level');
// challengeLevel.textContent = `Level ${level} of 10`;
    
// // Update the progress bar
// updateProgressBar(level);

function nextLevel() {
    // Get the next level information
    const levelElement = document.getElementById('challenge-level');
    const level = parseInt(levelElement.textContent.split(' ')[2]);
    const newLevel = level + 1;
    
    // Check if this is the end of the game
    if (newLevel > 10) {
        // Go directly to the winning screen without showing "Level 11"
        container.classList.add('fade-out');
        
        setTimeout(() => {
            // Clear the container after fade out
            container.innerHTML = '';
            
            // Update progress bar to 100%
            updateProgressBar(10);
            
            // Show completion message instead of Level 11
            const completionMessage = document.createElement('div');
            completionMessage.className = 'level-transition';
            completionMessage.textContent = 'Game Complete!';
            container.appendChild(completionMessage);
            
            // Remove the fade-out class and add fade-in
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
            
            // After showing completion message, show the victory screen
            setTimeout(() => {
                container.innerHTML = '';
                container.classList.remove('fade-in');
                set_game_level(11); // Use 11 to trigger the winning screen
            }, 800);
        }, 400);
        
        return;
    }
    
    // Original code for normal level transitions
    container.classList.add('fade-out');
    
    setTimeout(() => {
        // Clear the container after fade out
        container.innerHTML = '';
        
        // Update progress bar when advancing to next level
        updateProgressBar(newLevel);
        
        // Show level transition indicator
        const levelTransition = document.createElement('div');
        levelTransition.className = 'level-transition';
        levelTransition.textContent = 'Level ' + newLevel;
        container.appendChild(levelTransition);
        
        // Remove the fade-out class and add fade-in
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
        
        // Preload next level's colors
        preloadNextLevel(newLevel);
        
        // After showing transition, load the next level with staggered animations
        setTimeout(() => {
            container.innerHTML = '';
            container.classList.remove('fade-in');
            set_game_level(newLevel);
        }, 800);
    }, 400);
}

// Function to preload the next level's colors
function preloadNextLevel(level) {
    // Create an invisible container to preload images
    const preloader = document.createElement('div');
    preloader.style.position = 'absolute';
    preloader.style.visibility = 'hidden';
    preloader.style.pointerEvents = 'none';
    document.body.appendChild(preloader);
    
    // Based on the level, determine which colors to preload
    const getColorPromises = [];
    
    if (level === 1) {
        getColorPromises.push(preloadColor('red', 0));
        getColorPromises.push(preloadColor('green', 0));
        getColorPromises.push(preloadColor('blue', 0));
    } else if (level === 2) {
        // Preload a range of possible colors for level 2
        for (let i = 1; i <= 10; i++) {
            getColorPromises.push(preloadColor('red', i));
            getColorPromises.push(preloadColor('green', i));
            getColorPromises.push(preloadColor('blue', i));
        }
    }
    // Similar logic for other levels could be added
    
    // Remove the preloader after colors are loaded
    Promise.all(getColorPromises).then(() => {
        document.body.removeChild(preloader);
    });
    
    function preloadColor(family, num) {
        return new Promise((resolve) => {
            const familyMap = {
                'red': 'sorted_via_absolute_red.json',
                'green': 'sorted_via_absolute_green.json',
                'blue': 'sorted_via_absolute_blue.json'
            };
            
            // Create a dummy element to preload the color
            const dummy = document.createElement('div');
            dummy.style.backgroundColor = 'transparent';
            preloader.appendChild(dummy);
            
            // Load the color data
            const xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open('GET', './color_lists/' + familyMap[family], true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == "200") {
                    const data = JSON.parse(xhr.responseText);
                    if (data[num]) {
                        dummy.style.backgroundColor = data[num][0];
                        resolve();
                    }
                }
            };
            xhr.send(null);
        });
    }
}

function resetLevel() {
    // Fade out current content
    container.classList.add('fade-out');
    
    setTimeout(() => {
        // Clear the container after fade out
        container.innerHTML = '';
        
        // Clear the error message
        const message = document.getElementById('message');
        message.textContent = '';
        message.className = ''; // Remove any classes (error/success)
        
        const levelElement = document.getElementById('challenge-level');
        levelElement.textContent = "Challenge level: " + 1;
        
        // Reset progress bar to level 1
        updateProgressBar(1);
        
        // Show reset transition indicator
        const resetTransition = document.createElement('div');
        resetTransition.className = 'reset-transition';
        resetTransition.textContent = 'Starting Over';
        container.appendChild(resetTransition);
        
        // Remove the fade-out class and add fade-in
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
        
        // After showing transition, load level 1
        setTimeout(() => {
            container.innerHTML = '';
            container.classList.remove('fade-in');
            set_game_level(1);
        }, 800);
    }, 400);
}

// Update the transition CSS
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    #color-container {
        transition: opacity 0.5s ease;
        min-height: 150px; /* Maintain consistent height to prevent layout shifts */
        position: relative;
    }
    
    #color-container.fade-out {
        opacity: 0;
    }
    
    #color-container.fade-in {
        opacity: 1;
    }
    
    .color-swatch {
        width: 120px;
        height: 120px;
        border-radius: var(--border-radius);
        cursor: pointer;
        box-shadow: var(--box-shadow);
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        will-change: transform, opacity; /* Performance optimization */
    }
    
    .color-swatch:hover {
        transform: translateY(-5px) scale(1.05) !important;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        z-index: 2;
    }
    
    .level-transition {
        font-size: 32px;
        color: var(--primary);
        font-weight: bold;
        animation: scale-in 0.6s ease-out;
        margin: 40px 0;
        text-align: center;
    }
    
    .reset-transition {
        font-size: 28px;
        color: var(--accent);
        font-weight: bold;
        animation: scale-in 0.6s ease-out;
        margin: 40px 0;
        text-align: center;
    }
    
    @keyframes scale-in {
        0% { transform: scale(0.5); opacity: 0; }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    /* Staggered animation for swatches */
    @keyframes swatch-appear {
        0% { transform: scale(0.8) translateY(10px); opacity: 0; }
        100% { transform: scale(1) translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(transitionStyles);

// Helper function to convert RGB to Hex
function rgbToHex(rgb) {
    // Extract numbers from rgb(r, g, b) format
    const rgbArray = rgb.match(/\d+/g);
    if (!rgbArray || rgbArray.length !== 3) return "";
    
    // Convert to hex and format
    return "#" + rgbArray.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('').toUpperCase();
}


