const building = document.getElementById("building");
const elevatorPositionDisplay = document.getElementById("elevator-position");
const elevatorStateDisplay = document.getElementById("elevator-state");

// Configuração inicial
const floors = Math.floor(Math.random() * 5) + 3; // Entre 3 e 7 andares
let elevatorPosition = 1; // Começa no primeiro andar
let elevatorState = "Idle"; // Estado inicial

// Função para atualizar o estado do elevador
function updateElevatorState(state) {
  elevatorState = state;
  elevatorStateDisplay.textContent = elevatorState;
}

// Criação dos andares
for (let i = 1; i <= floors; i++) {
  const floorDiv = document.createElement("div");
  floorDiv.className = "floor";
  floorDiv.dataset.floor = i;

  const floorLabel = document.createElement("span");
  floorLabel.className = "floor-label";
  floorLabel.textContent = `Floor ${i}`;

  const upButton = document.createElement("button");
  upButton.textContent = "Up";
  upButton.onclick = () => moveElevator(i, "up");
  upButton.disabled = i === floors; // Desativa no último andar

  const downButton = document.createElement("button");
  downButton.textContent = "Down";
  downButton.onclick = () => moveElevator(i, "down");
  downButton.disabled = i === 1; // Desativa no primeiro andar

  floorDiv.appendChild(floorLabel);
  floorDiv.appendChild(upButton);
  floorDiv.appendChild(downButton);

  if (i === 1) {
    const elevatorDiv = document.createElement("div");
    elevatorDiv.className = "elevator";
    elevatorDiv.id = "elevator";
    floorDiv.appendChild(elevatorDiv);
  }

  building.appendChild(floorDiv);
}

// Movimento do elevador
function moveElevator(targetFloor, direction) {
  updateElevatorState(`Moving ${direction.toUpperCase()}`);
  const elevator = document.getElementById("elevator");
  const currentFloor = document.querySelector(`.floor[data-floor="${elevatorPosition}"]`);
  const targetFloorDiv = document.querySelector(`.floor[data-floor="${targetFloor}"]`);

  // Simula o movimento
  setTimeout(() => {
    if (currentFloor.contains(elevator)) {
      currentFloor.removeChild(elevator);
    }
    targetFloorDiv.appendChild(elevator);
    elevatorPosition = targetFloor;
    elevatorPositionDisplay.textContent = elevatorPosition;
    updateElevatorState("Idle");
  }, 1000); // Tempo de simulação (1 segundo por andar)
}
