const building = document.getElementById("building");
const elevatorPositionDisplay = document.getElementById("elevator-position");
const elevatorStateDisplay = document.getElementById("elevator-state");
const floorCountInput = document.getElementById("floor-count");
const updateFloorsButton = document.getElementById("update-floors");

// Configuração inicial
let floors = 5; // Número inicial de andares
let elevatorPosition = 1; // Começa no primeiro andar
let elevatorState = "Idle"; // Estado inicial

// Função para atualizar o estado do elevador
function updateElevatorState(state) {
  elevatorState = state;
  elevatorStateDisplay.textContent = elevatorState;
}

// Função para criar os andares
function createFloors() {
  building.innerHTML = ""; // Limpa o prédio
  for (let i = 1; i <= floors; i++) {
    const floorDiv = document.createElement("div");
    floorDiv.className = "floor";
    floorDiv.dataset.floor = i;

    const floorLabel = document.createElement("span");
    floorLabel.className = "floor-label";
    floorLabel.textContent = `Floor ${i}`;

    const controlsDiv = document.createElement("div");
    controlsDiv.className = "controls";

    const upButton = document.createElement("button");
    upButton.textContent = "Up";
    upButton.onclick = () => moveElevator(i, "up");
    upButton.disabled = i === floors; // Desativa no último andar

    const downButton = document.createElement("button");
    downButton.textContent = "Down";
    downButton.onclick = () => moveElevator(i, "down");
    downButton.disabled = i === 1; // Desativa no primeiro andar

    controlsDiv.appendChild(upButton);
    controlsDiv.appendChild(downButton);

    floorDiv.appendChild(floorLabel);
    floorDiv.appendChild(controlsDiv);

    if (i === 1) {
      const elevatorDiv = document.createElement("div");
      elevatorDiv.className = "elevator";
      elevatorDiv.id = "elevator";
      floorDiv.appendChild(elevatorDiv);
    }

    building.appendChild(floorDiv);
  }
}

// Movimento do elevador
// Movimento do elevador
function moveElevator(targetFloor) {
  const elevator = document.getElementById("elevator");
  const targetFloorDiv = document.querySelector(
    `.floor[data-floor="${targetFloor}"]`
  );

  // Atualiza o estado do elevador
  if (targetFloor > elevatorPosition) {
    updateElevatorState("Moving Up");
  } else if (targetFloor < elevatorPosition) {
    updateElevatorState("Moving Down");
  } else {
    updateElevatorState("Idle"); // Caso já esteja no andar desejado
    return;
  }

  // Calcula a posição relativa do alvo dentro do contêiner
  const buildingRect = building.getBoundingClientRect();
  const targetFloorRect = targetFloorDiv.getBoundingClientRect();
  const elevatorHeight = elevator.offsetHeight;

  // Calcula a posição ajustada para alinhar o centro do elevador ao centro do andar
  const relativeOffset =
    buildingRect.bottom -
    targetFloorRect.bottom -
    targetFloorDiv.offsetHeight / 2;

  // Simula o movimento
  setTimeout(() => {
    elevator.style.transform = `translateY(-${relativeOffset}px)`;
    elevatorPosition = targetFloor;
    elevatorPositionDisplay.textContent = elevatorPosition;
    updateElevatorState("Idle");
  }, 1000); // Tempo de simulação (1 segundo por andar)
}

// Atualizar o número de andares dinamicamente
updateFloorsButton.addEventListener("click", () => {
  const newFloorCount = parseInt(floorCountInput.value, 10);
  if (newFloorCount >= 3 && newFloorCount <= 7) {
    floors = newFloorCount;
    elevatorPosition = 1; // Reseta o elevador para o andar 1
    createFloors();
    elevatorPositionDisplay.textContent = elevatorPosition;
    updateElevatorState("Idle");
  } else {
    alert("Please enter a valid floor count between 3 and 7.");
  }
});

// Inicializa os andares
createFloors();
