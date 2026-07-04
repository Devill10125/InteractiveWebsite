const footsteps =
    new Audio("/sounds/jokerzillagames-walking-shortened.wav");

    footsteps.volume = 0.4;

const scenes = {

    intro: {

        text:
`You're an explorer and you have just entered a newly discovered pyramid.
Your mission is to reach the deepest part of the tomb and recover a valuable artifact...`,

		// walking:"/sounds/jokerzillagames-walking-shortened.wav",
		voice:"/audio/EnteringThePyramid.mp3",

        leftChoice:
        "Go to the pyramid",

        rightChoice:
        "Go to the pyramid",

        leftNext:
        "corridor",

        rightNext:
        "corridor"
    },

    corridor: {

        text:
`As you descend down the stairs you're met with a corridor that seems to split in two directions. 
The left path seems to have water running down from it, although it is not that much as to make it not an option. 
The right path of the corridor, while at first glance seeming better, radiates an unsettling warmth. 
Which path do you wish to traverse?`,

		voice:"/audio/FirstChoice.mp3",

        leftChoice:
        "Go to the left path",

        rightChoice:
        "Go to the right path",

        leftNext:
        "waterPath",

        rightNext:
        "heatPath"
    },

    waterPath: {

        text:
`You decide to continue down the left path of the corridor. 
The water reaches your ankles and the water level seems to rise slightly as you go further in.
 As you walk you notice a slight bit of a smudge on the left side of the wall. 
 Do you wish to inspect it?`,

		voice: "/audio/LeftPathA.mp3",

        leftChoice:
        "Inspect the symbols",

        rightChoice:
        "Ignore them and continue",

        leftNext:
        "symbolPuzzle",

        rightNext:
        "ignorantDeath"
    },

    symbolPuzzle: {

		voice:"/audio/LeftPathCheckedSymbols.mp3",

        text:
`The symbols seem to represent a horse, carrying two bags with gold coins. You take note of this and go further into the tunnel. 
 You reach a room that seems to be a dead end. 
 You hear a loud sound and turn around. The door slammed shut. 
 There are two pedestals in the room and 4 figures on a table.
 You are immediatly reminded of the symbols on the wall. 
 You put the horse figure and the bag of gold coins on the two pedestals. 
 The door opens. Before leaving, do you wish to take the bag of gold coins or the bag of silver coins?`,

        leftChoice:
        "Take the gold coins",

        rightChoice:
        "Take the silver coins",

        leftNext:
        "goldDeath",

        rightNext:
        "silverWin"
    },

    goldDeath: {

		voice:"/audio/LeftPathTookGold.mp3",

        text:
`As you lift the bag of gold coins the door behind you slams shut yet again,
 but this time the room also starts filling with water.
 You hurry to put the bag back on the pedestal but it doesn't seem to do anything. 
 The water keeps rising until it fills the room completely.
  You hold your breath for a long time, but it is in vain. You drowned!`,

        ending: true,

        result:
        "GAME OVER"
    },

    silverWin: {

		voice:"/audio/LeftPathTookSilver.mp3",

        text:
`You take the bag of silver coins and head back.
 It seems that the way back is easier to traverse than it was before.
  You quickly make it outside the pyramid with your loot. You win!`,

        ending: true,

        result:
        "YOU WIN"
    },

    ignorantDeath: {

		voice:"/audio/LeftPathIgnoredSymbols.mp3",

        text:
`You pay no mind to the symbols and continue further down. 
You reach a room that seems to be a dead end. 
A loud bang sounds and you realize that the door behind you had slammed shut. 
There are two pedestals in the room and 4 figures on a table between the pedestals. 
There lay a figure of a horse, a donkey, a bag of silver coins and a bag of gold coins. 
You try and guess the order in which to put the figures.
After making your choice the room starts to fill with water. 
The room fills up with water. You drowned!`,

        ending: true,

        result:
        "GAME OVER"
    },

    heatPath: {

		voice:"/audio/RightPathB.mp3",

        text:
`You go down the normal seeming corridor,
 but as you go further and further the temperature starts feeling warmer and warmer. 
You bear through it and reach a room with treasures made entirely out of gold.
There seems to be a pedestal with nothing on it. 
As you go into the room the door behind you slams shut. 
You notice some symbols on the wall behind the pedestal. 
They seem to be forming a riddle.
"What walks on four legs in the morning, two legs at noon and three legs in the evening?"`,

        leftChoice:
        "Place the figure of a man",

        rightChoice:
        "Place the chimera figure",

        leftNext:
        "heatWin",

        rightNext:
        "heatDeath"
    },

    heatWin: {

		voice:"/audio/RightPathChoseMan.mp3",

        text:
`The door behind you swings open. 
You take as much of the treasures as you can carry and decide to head back. 
You make it out of the pyramid. You feel your body freezing at the usual hot temperature of the desert.
 How hot exactly was it in that room? You faint on the spot. 
 You're later discovered by fellow explorers who help you get back. 
 You made it out alive! You win!`,

        ending: true,

        result:
        "YOU WIN"
    },

    heatDeath: {

		voice:"/audio/RightPathChoseChimera.mp3",

        text:
`The room starts feeling way too hot and the door doesn't seem to move. 
You lay down on the ground exhausted from the awful heat that you were ignoring up until now. 
You lose consciousness. You died!`,

        ending: true,

        result:
        "GAME OVER"
    }

};


let currentScene = "intro";

let gameStarted = false;

let selectedChoice = null;	

const sceneText =
document.getElementById("scene-text");

const leftChoice =
document.getElementById("left-choice");

const rightChoice =
document.getElementById("right-choice");

const voiceAudio =
document.getElementById("voice-audio");

const ambientAudio =
document.getElementById("ambient-audio");

/* START GAME */

document.addEventListener("keydown", async (event) => {

    const key =
    event.key.toLowerCase();

    /* START */

	if(event.code === "Space") 
	{

    	if(gameStarted) return;

    	gameStarted = true;

    	ambientAudio.volume = 0.25;

    	ambientAudio.play();

    	currentScene = "intro";

 		renderScene();
	}


    /* REPLAY AUDIO */

    if(key === "r") {

        voiceAudio.currentTime = 0;

        voiceAudio.play();
    }

    /* LEFT */

    if(key === "a") {

        handleChoice("left");
    }

    /* RIGHT */

    if(key === "d") {

        handleChoice("right");
    }

});

/* RENDER */

async function renderScene() {

    const scene = scenes[currentScene];

    sceneText.innerText = scene.text;

	playSceneAudio()

	playVoice(scene.walking);

	await wait(3000);

	playVoice(scene.voice);

    /* ENDINGS */

    if(scene.ending) {

        leftChoice.style.display = "none";
        rightChoice.style.display = "none";

        document.getElementById("title")
        .innerText = scene.result;

        return;
    }

    /* NORMAL SCENES */

    leftChoice.style.display = "block";
    rightChoice.style.display = "block";

    leftChoice.innerText =
    "[A] " + scene.leftChoice;

    rightChoice.innerText =
    "[D] " + scene.rightChoice;

}


/* AUDIO SEQUENCE */

async function playSceneAudio(voiceSrc) {

    /* FOOTSTEPS */

    const footsteps =
    new Audio("/sounds/jokerzillagames-walking-shortened.wav");

    footsteps.volume = 0.4;

    await footsteps.play();

    /* WAIT */

    await wait(1200);

    /* VOICE */

    voiceAudio.src = voiceSrc;

    voiceAudio.volume = 1;

    voiceAudio.play();
}

/* WAIT FUNCTION */

function wait(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}

/* CHOICE HANDLING */

function handleChoice(direction) {

    /* SECOND PRESS */

    if(selectedChoice === direction) {

        confirmChoice(direction);

        return;
    }

    selectedChoice = direction;

    /* RESET */

    document.body.classList.remove(
        "left-active",
        "right-active"
    );

    leftChoice.classList.remove("active");
    rightChoice.classList.remove("active");

    /* LEFT */

    if(direction === "left") {

        document.body.classList.add(
            "left-active"
        );

        leftChoice.classList.add(
            "active"
        );
    }

    /* RIGHT */

    else {

        document.body.classList.add(
            "right-active"
        );

        rightChoice.classList.add(
            "active"
        );
    }
}

/* CONFIRM */

function confirmChoice(direction) {

    const scene = scenes[currentScene];

    if(direction === "left") {

        currentScene =
        scene.leftNext;
    }

    else {

        currentScene =
        scene.rightNext;
    }

    selectedChoice = null;

    document.body.classList.remove(
        "left-active",
        "right-active"
    );

    leftChoice.classList.remove("active");
    rightChoice.classList.remove("active");

    renderScene();
}

function playVoice(src) {

    voiceAudio.pause();

    voiceAudio.currentTime = 0;

    voiceAudio.src = src;

    voiceAudio.play();
}

function playWalking(src) {

	walkingAudio.currentTime = 0;

	walkingAudio.src = src;

	walkingAudio.play();
	
}
