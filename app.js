const data = {
    wake: {
        msg: 'You wake up to the sound of an alarm. A fire is in the hotel building. You must evacuate the building now. Click GO to begin the escape.',
        img: 'media/fire-alarm.jpg',
        buttons: [
            {
                text: 'Go',
                goTo: 'hall',
                point: 0
            }
        ],
    },
    hall: {
        msg: 'You have just stepped out of your room and and look around to realize you are at the top floor of a twenty story building. You search for escape routes and see two: ELEVATOR and STAIRS. You must decide which route to take.',
        img: 'media/building.jpg',
        buttons: [
            {
                text: 'Elevator',
                goTo: 'elevator',
                point: 1
            },
            {
                text: 'Stairs',
                goTo: 'stairs',
                point: 1
            }
        ]
    },
    stairs: {
        msg: 'You have reached the stairs and look down to see that you are late in joining the huge line of people trying to evacuate. The line is not moving very fast as stairs are very overcrowded and many are still in their sleep. You can decide to get in the slow line and WAIT to evacuate or GO BACK.',
        img: 'media/stairs.jpg',
        buttons: [
            {
                text: 'Wait',
                goTo: 'wait',
                point: 1
            },
            {
                text: 'Go Back',
                goTo: 'hall',
                point: -1
            }
        ]
    },
    wait: {
        msg: 'You have decided to wait in line to evacuate. However, as you are waiting, the fire increases and catches up to you in the stairs. YOU DIE!',
        img: 'media/fire.jpg',
        buttons: [
            {
                text: 'Start Over',
                goTo: 'wake',
                point: 0
            }
        ]
    },
    elevator: {
        msg: 'You have reached the elevator. The alarm instructs you not to take the elevators. Will you listen to the alarm and GO BACK to take the recommended route of the stairs, or will you follow your intuition and RIDE the elevator?',
        img: 'media/elevator.jpg',
        buttons: [
            {
                text: 'Ride',
                goTo: 'ride',
                point: 1
            },
            {
                text: 'Go Back',
                goTo: 'hall',
                point: -1
            }
        ]
    },
    ride: {
        msg: 'You decided to take the elevator (Bold Move) and some other people join. They say that the elevator doors on the second and first floors are blocked by the fire. Everyone in the elevator decides to get off at the third floor. As you get out of the elevator, you look around and see two options for escape: the STAIRS, or an old FIRE ESCAPE on the outside of the building.',
        img: 'media/elevator-buttons.jpg',
        buttons: [
            {
                text: 'Fire Escape',
                goTo: 'fireEscape',
                point: 1
            },
            {
                text: 'Stairs',
                goTo: 'stairs3',
                point: 1
            }
        ]
    },
    fireEscape: {
        msg: 'You have decided to take the old fire escape. As you climb down this route, you realize there is broken part. You can decide to either JUMP over or GO BACK ',
        img: 'media/fire-escape.jpg',
        buttons: [
            {
                text: 'Jump',
                goTo: 'jump',
                point: 1
            },
            {
                text: 'Go Back',
                goTo: 'ride',
                point: -1
            }
        ]
    },
    jump: {
        msg: 'You jump over the broken part of the fire escape, but somehow mess up the landing to the other part fire escape. Your foot lands on the next part and slips, which guides you towards a window of the first floor. You go through the window and straight into the fire. you die...',
        img: 'media/fire.jpg',
        buttons: [
            {
                text: 'Start Over',
                goTo: 'wake',
                point: 0
            }
        ]
    },
    stairs3: {
        msg: 'You decided to take the stairs from the third floor. You arrive at the first floor along with some other people after some time and look around. There are fires around the doors that lead outside. You see three options of getting out of the building: LOOK FOR ITEMS to help you through the fire at the doors, RUN straight THROUGH the burning DOORS, or BREAK through a thick WINDOW.',
        img: 'media/stairs-bottom.jpg',
        buttons: [
            {
                text: 'Look for Items',
                goTo: 'items',
                point: 1
            },
            {
                text: 'Run Through Doors',
                goTo: 'runDoors',
                point: 1
            },
            {
                text: 'Break Window',
                goTo: 'breakWindow',
                point: 1
            }
        ]
    },
    items: {
        msg: 'You see a fire extinguisher that doesn\'t have much content left in it. Will you make USE of what you have, or will you go back to take another way to escape?',
        img: 'media/extinguisher.jpg',
        buttons: [
            {
                text: 'Use',
                goTo: 'out',
                point: 1
            },
            {
                text: 'Go Back',
                goTo: 'stairs3',
                point: -1
            }
        ]
    },
    runDoors: {
        msg: 'With the doors on heavy fire, you decide to run through them. However, the doors would not open and you got caught on fire. Others tried to save you, but it was too late. you are dead...',
        img: 'media/fire.jpg',
        buttons: [
            {
                text: 'Start Over',
                goTo: 'wake',
                point: 0
            }
        ]
    },
    breakWindow: {
        msg: 'You break the window through the window and end up on the other side with some other people. You see that some more people are trapped inside. You can decide to go back in and try to SAVE the OTHERS, or simply ESCAPE.',
        img: 'media/glass.jpg',
        buttons: [
            {
                text: 'Save Others',
                goTo: 'stairs3',
                point: -1
            },
            {
                text: 'Escape',
                goTo: 'out',
                point: 1
            }
        ]
    },
    out: {
        msg: 'CONGRATULATIONS! You made it out of the building somewhat intact. You Win!',
        img: 'media/out.jpg',
        buttons: [
            {
                text: 'Start Over',
                goTo: 'wake',
                point: 0
            }
        ]
    }
}

let progress = 0;
function appendScene(scene) {
    // access game div and create scene
    const game = document.getElementById('game');
    let div = document.createElement('div');
    div.className = 'scene';

    // add images to scene from data
    let img = document.createElement('img');
    img.src = data[scene].img;
    div.appendChild(img);
    
    // apply scene message to DOM and make it an h3 element
    div.innerHTML += `<h3>${data[scene].msg}</h3>`;

    //buttons
    for (const element of data[scene].buttons) {
        let button = document.createElement('button');
        button.addEventListener('click', handleClick);
        button.innerText = element.text;
        button.dataset.goto = element.goTo;
        button.dataset.point = element.point;
        div.appendChild(button);
    }
    game.appendChild(div);
}

// event listener for buttons
function handleClick(event) {
    console.log(event.target);
    const game = document.getElementById('game');
    game.innerHTML = '';
    // access points to progress bar
    const gameProgress = document.getElementById('game-progress');
    let point = Number(event.target.dataset.point)
    if(point == 0) {
        gameProgress.value = 0;
    } else {
        
    }
    gameProgress.value += point;
    appendScene(event.target.dataset.goto);
}

appendScene('wake');