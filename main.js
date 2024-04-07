const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	automata = new Automata(gameEngine, canvas.width, canvas.height);
	gameEngine.addEntity(automata);

	setupControls();
});

function setupControls() {
	document.getElementById("startBtn").addEventListener("click", function () {
		console.log("Start button clicked");
		if (!gameEngine.running) {
			gameEngine.running = true;
			gameEngine.start();
		}
	});

	document.getElementById("stopBtn").addEventListener("click", function () {
		console.log("Stop button clicked");
		gameEngine.running = false; // This will stop the update loop
	});

	document.getElementById("resetBtn").addEventListener("click", function () {
		console.log("Reset button clicked");
		gameEngine.running = false; // Stop the loop before resetting
		automata.grid = automata.initializeGrid(); // Clear or reinitialize the grid
		automata.draw(gameEngine.ctx); // Draw the initial state of the grid
	});


}
