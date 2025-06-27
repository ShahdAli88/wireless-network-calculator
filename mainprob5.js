// Function to convert dB to watts
const dBtoWatts = (dB) => Math.pow(10, dB / 10);
let array = [
    [0.1, 0.2, 0.5, 0.01, 0.12, 0.13, 0.15, 0.02, 0.03, 0.05, 0.07, 0.10, 0.15, 0.20, 0.30],
    [0.001, 0.002, 0.005, 0.010, 0.012, 0.013, 0.02, 0.020, 0.031, 0.053, 0.075, 0.111, 0.176, 0.250, 0.429],
    [0.046, 0.065, 0.105, 0.153, 0.168, 0.176, 0.19, 0.223, 0.282, 0.381, 0.470, 0.595, 0.796, 1.00, 1.45],
    [0.194, 0.249, 0.349, 0.455, 0.489, 0.505, 0.53, 0.602, 0.715, 0.899, 1.057, 1.271, 1.602, 1.930, 2.633],
    [0.439, 0.535, 0.701, 0.869, 0.922, 0.946, 0.99, 1.092, 1.259, 1.525, 1.748, 2.045, 2.501, 2.95, 3.89],
    [0.762, 0.900, 1.132, 1.361, 1.431, 1.464, 1.52, 1.657, 1.875, 2.218, 2.504, 2.881, 3.454, 4.010, 5.189],
    [1.1, 1.3, 1.6, 1.9, 2.0, 2.0, 2.1, 2.3, 2.5, 3.0, 3.3, 3.8, 4.4, 5.1, 6.5],
    [1.6, 1.8, 2.2, 2.5, 2.6, 2.7, 2.7, 2.9, 3.2, 3.7, 4.1, 4.7, 5.5, 6.2, 7.9],
    [2.1, 2.3, 2.7, 3.1, 3.2, 3.3, 3.4, 3.6, 4.0, 4.5, 5.0, 5.6, 6.5, 7.4, 9.2],
    [2.6, 2.9, 3.3, 3.8, 3.9, 4.0, 4.1, 4.3, 4.7, 5.4, 5.9, 6.5, 7.6, 8.5, 10.6],
    [3.1, 3.4, 4.0, 4.5, 4.6, 4.7, 4.8, 5.1, 5.5, 6.2, 6.8, 7.5, 8.6, 9.7, 12.0],
    [3.7, 4.0, 4.6, 5.2, 5.3, 5.4, 5.5, 5.8, 6.3, 7.1, 7.7, 8.5, 9.7, 10.9, 13.3],
    [4.2, 4.6, 5.3, 5.9, 6.1, 6.1, 6.3, 6.6, 7.1, 8.0, 8.6, 9.5, 10.8, 12.0, 14.7],
    [4.8, 5.3, 6.0, 6.6, 6.8, 6.9, 7.0, 7.4, 8.0, 8.8, 9.5, 10.5, 11.9, 13.2, 16.1],
    [5.4, 5.9, 6.7, 7.4, 7.6, 7.7, 7.8, 8.2, 8.8, 9.7, 10.5, 11.5, 13.0, 14.4, 17.5],
    [6.1, 6.6, 7.4, 8.1, 8.3, 8.4, 8.6, 9.0, 9.6, 10.6, 11.4, 12.5, 14.1, 15.6, 18.9],
    [6.7, 7.3, 8.1, 8.9, 9.1, 9.2, 9.4, 9.8, 10.5, 11.5, 12.4, 13.5, 15.2, 16.8, 20.3],
    [7.4, 7.9, 8.8, 9.7, 9.9, 10.0, 10.2, 10.7, 11.4, 12.5, 13.4, 14.5, 16.3, 18.0, 21.7],
    [8.0, 8.6, 9.6, 10.4, 10.7, 10.8, 11.0, 11.5, 12.2, 13.4, 14.3, 15.5, 17.4, 19.2, 23.1],
    [8.7, 9.4, 10.3, 11.2, 11.5, 11.6, 11.8, 12.3, 13.1, 14.3, 15.3, 16.6, 18.5, 20.4, 24.5],
    [9.4, 10.1, 11.1, 12.0, 12.3, 12.4, 12.6, 13.2, 14.0, 15.2, 16.3, 17.6, 19.6, 21.6, 25.9],
    [10.1, 10.8, 11.9, 12.8, 13.1, 13.3, 13.5, 14.0, 14.9, 16.2, 17.3, 18.7, 20.8, 22.8, 27.3],
    [10.8, 11.5, 12.6, 13.7, 14.0, 14.1, 14.3, 14.9, 15.8, 17.1, 18.2, 19.7, 21.9, 24.1, 28.7],
    [11.5, 12.3, 13.4, 14.5, 14.8, 14.9, 15.2, 15.8, 16.7, 18.1, 19.2, 20.7, 23.0, 25.3, 30.1],
    [12.2, 13.0, 14.2, 15.3, 15.6, 15.8, 16.0, 16.6, 17.6, 19.0, 20.2, 21.8, 24.2, 26.5, 31.6],
    [13.0, 13.8, 15.0, 16.1, 16.5, 16.6, 16.9, 17.5, 18.5, 20.0, 21.2, 23.9, 26.4, 28.9, 34.4],
    [14.4, 15.3, 16.6, 17.8, 18.2, 18.3, 18.6, 19.3, 20.3, 21.9, 23.2, 24.9, 27.6, 30.2, 35.8],
    [15.2, 16.1, 17.4, 18.6, 19.0, 19.2, 19.5, 20.2, 21.2, 22.9, 24.2, 25.9, 28.7, 31.4, 37.2],
    [15.9, 16.8, 18.2, 19.5, 19.9, 20.0, 20.3, 21.0, 22.1, 23.8, 25.2, 26.9, 29.9, 32.6, 38.6],
    [16.7, 17.6, 19.0, 20.3, 20.7, 20.9, 21.2, 21.9, 23.1, 24.8, 26.2, 27.9, 30.9, 33.8, 40.0],
    [17.4, 18.4, 19.9, 21.2, 21.6, 21.8, 22.1, 22.8, 24.0, 25.8, 27.2, 28.9, 31.9, 34.9, 41.5],
    [18.2, 19.2, 20.7, 22.0, 22.5, 22.6, 22.9, 23.7, 24.9, 26.7, 28.2, 30.2, 32.9, 36.1, 42.9],
    [19.0, 20.0, 21.5, 22.9, 23.3, 23.5, 23.8, 24.6, 25.8, 27.7, 29.3, 31.3, 34.3, 37.3, 44.3],
    [19.7, 20.8, 22.3, 23.8, 24.2, 24.4, 24.7, 25.5, 26.8, 28.7, 30.3, 32.4, 35.6, 38.8, 45.7],
    [20.5, 21.6, 23.2, 24.6, 25.1, 25.3, 25.6, 26.4, 27.7, 29.7, 31.3, 33.4, 36.7, 40.0, 47.1],
    [21.3, 22.4, 24.0, 25.5, 26.0, 26.2, 26.5, 27.3, 28.6, 30.6, 32.3, 34.5, 37.9, 41.2, 48.6],
    [22.1, 23.2, 24.8, 26.4, 26.8, 27.0, 27.4, 28.3, 29.6, 31.6, 33.3, 35.6, 39.0, 42.4, 50.0],
    [22.9, 24.0, 25.7, 27.3, 27.7, 27.9, 28.3, 29.2, 30.5, 32.6, 34.4, 36.6, 40.2, 43.7, 51.4],
    [23.7, 24.8, 26.5, 28.1, 28.6, 28.8, 29.2, 30.1, 31.5, 33.6, 35.4, 37.7, 41.3, 44.9, 52.8],
    [24.4, 25.6, 27.4, 29.0, 29.5, 29.7, 30.1, 31.0, 32.4, 34.6, 36.4, 38.8, 42.5, 46.1, 54.2],
    [25.2, 26.4, 28.2, 29.9, 30.4, 30.6, 31.0, 31.9, 33.4, 35.6, 37.4, 39.9, 43.6, 47.4, 55.7],
    [26.0, 27.2, 29.1, 30.8, 31.3, 31.5, 31.9, 32.8, 34.3, 36.6, 38.5, 40.9, 44.8, 48.6, 57.1],
    [26.8, 28.1, 30.0, 31.7, 32.2, 32.4, 32.8, 33.8, 35.3, 37.6, 39.5, 42.0, 45.9, 49.9, 58.5],
    [27.6, 28.9, 30.9, 32.6, 33.1, 33.3, 33.7, 34.7, 36.2, 38.6, 40.5, 43.1, 47.1, 51.1, 59.9],
    [28.4, 29.7, 31.7, 33.5, 34.0, 34.2, 34.6, 35.6, 37.2, 39.6, 41.5, 44.2, 48.2, 52.3, 61.3]
];

// Function to convert various units to standard units
const convertUnits = (value, unit) => {
    switch (unit) {
        case "km²":
            return value * 1e6; // km² to m²
        case "hectares":
            return value * 1e4; // hectares to m²
        case "seconds":
            return value / 60; // seconds to minutes
        case "hours":
            return value * 60; // hours to minutes
        case "watts":
            return 10 * Math.log10(value); // watts to dB
        case "centimeters":
            return value / 100; // cm to meters
        case "nW":
            return value / 1000;
        case "mW":
            return value * 1000;
        case "W":
            return value * 1000000;
        default:
            return value;
    }
}

// Function to calculate all required values
function calculate() {
    // Getting inputs from HTML form
    const areaInput = document.getElementById('area');

    const subscribersInput = document.getElementById('subscribers');
    const callsPerDayInput = document.getElementById('callsPerDay');
    const callDurationInput = document.getElementById('callDuration');
    const callDropProbabilityInput = document.getElementById('callDropProbability');
    const minSIRInput = document.getElementById('minSIR');
    const powerAt10mInput = document.getElementById('powerAt10m');
    const referenceDistanceInput = document.getElementById('referenceDistance');
    const pathLossExponentInput = document.getElementById('pathLossExponent');
    const receiverSensitivityInput = document.getElementById('receiverSensitivity');
    const numberofcochannelinterferingcellsinput = document.getElementById('numberofcochannelinterferingcells');

    // Converting input values to appropriate data types
    let area = parseFloat(document.getElementById("area").value);
    const areaUnit = document.getElementById("areaUnit").value;
    area = convertUnits(area, areaUnit);

    const subscribers = parseFloat(subscribersInput.value); // number of subscribers
    const callsPerDay = parseFloat(callsPerDayInput.value); // average calls per day per subscriber
    let callDuration = parseFloat(document.getElementById("callDuration").value);
    const callDurationUnit = document.getElementById("callDurationUnit").value;
    callDuration = convertUnits(callDuration, callDurationUnit);

    const callDropProbability = parseFloat(callDropProbabilityInput.value); // call drop probability
    let minSIR = parseFloat(document.getElementById("minSIR").value);
    const minSIRUnit = document.getElementById("minSIRUnit").value;
    minSIR = convertUnits(minSIR, minSIRUnit);
    let powerAt10m = parseFloat(document.getElementById("powerAt10m").value);
    const powerAt10mUnit = document.getElementById("powerAt10mUnit").value;
    powerAt10m = convertUnits(powerAt10m, powerAt10mUnit);
    let referenceDistance = parseFloat(document.getElementById("referenceDistance").value);
    const referenceDistanceUnit = document.getElementById("referenceDistanceUnit").value;
    referenceDistance = convertUnits(referenceDistance, referenceDistanceUnit);
    const pathLossExponent = parseFloat(pathLossExponentInput.value); // path loss exponent
    let receiverSensitivity = parseFloat(document.getElementById("receiverSensitivity").value); // receiver sensitivity in watts
    const receiverSensitivityUnit = document.getElementById("receiverSensitivityUnit").value;
    receiverSensitivity = convertUnits(receiverSensitivity, receiverSensitivityUnit);

    // Calculations
    // a) Maximum distance between transmitter and receiver for reliable communication
    const p00 = dBtoWatts(powerAt10m); // reference power at 10 meters in watts
    const d = (p00 / receiverSensitivity); // distance according to the modified law
    const maxDistance = Math.pow(d * Math.pow(referenceDistance, pathLossExponent), 1 / pathLossExponent); // maximum distance in meters

    // b) Maximum cell size assuming hexagonal cells
    const sqrt3over2 = Math.sqrt(3) / 2;
    const R = (3 * sqrt3over2 * Math.pow(maxDistance, 2)); // assuming 6 cells per hexagon

    // c) Number of cells in the service area
    const numberOfCells = area / R;

    // d) Traffic load in the whole cellular system in Erlangs
    const totalTrafficLoad = subscribers * (callsPerDay * callDuration / (24 * 60));

    // e) Traffic load in each cell in Erlangs
    const trafficLoadPerCell = totalTrafficLoad / numberOfCells;

    // f) Number of cells in each cluster (hexagonal)
    const numberofcochannelinterferingcells = parseFloat(numberofcochannelinterferingcellsinput.value);
    const sirw = Math.pow(10, minSIR / 10);
    const cellsPerCluster = Math.pow(sirw * numberofcochannelinterferingcells, 2 / pathLossExponent) / 3;
    const roundedCellsPerCluster = Math.ceil(cellsPerCluster);
    // g) Minimum number of carriers needed to achieve the required QoS


    let correctcolumn5 = 0;
    let o = 0;
    for (let j5 = 0; j5 < array[0].length; j5++) {
        if (callDropProbability == array[0][j5]) {
            correctcolumn5 = j5;
            o = 1;
            break;
        }
    }

    let tolerance5 = 1;
    let correctrow5 = 0;
    let j15 = correctcolumn5;
    if (o == 1) {
        for (let i15 = 0; i15 < array.length; i15++) {
            if (Math.abs(array[i15][j15] - trafficLoadPerCell) <= tolerance5 && array[i15][j15] >= trafficLoadPerCell) {
                correctrow5 = i15;
                if (array[i15][j15] >= trafficLoadPerCell) {
                    tolerance5 = array[i15][j15] - trafficLoadPerCell;
                }
                if (array[i15][j15] < trafficLoadPerCell) {
                    tolerance5 = trafficLoadPerCell - array[i15][j15];
                }
            }
        }
    }

    const numberOfCarriersQoS = correctrow5 === 0 ? 'NaN' : Math.ceil(correctrow5 / 8);

    // h) Minimum number of carriers needed if QoS 0.05
    const newCallDropProbability = 0.05;
    let correctcolumn = 0;
    for (let j = 0; j < array[0].length; j++) {
        if (newCallDropProbability == array[0][j]) {
            correctcolumn = j;
            break;
        }
    }
    let tolerance = 1;
    let correctrow = 0;
    let j1 = correctcolumn;
    for (let i1 = 0; i1 < array.length; i1++) {
        if (Math.abs(array[i1][j1] - trafficLoadPerCell) <= tolerance && array[i1][j1] >= trafficLoadPerCell) {
            correctrow = i1;
            if (array[i1][j1] >= trafficLoadPerCell) {
                tolerance = array[i1][j1] - trafficLoadPerCell;
            }
            if (array[i1][j1] < trafficLoadPerCell) {
                tolerance = trafficLoadPerCell - array[i1][j1];
            }
        }
    }
    const numberOfCarriersQoSChanged = correctrow === 0 ? 'NaN' : Math.ceil(correctrow / 8);

    // Output results to HTML elements
    document.getElementById('output_a').textContent = maxDistance.toFixed(2) + ' meters';
    document.getElementById('output_b').textContent = R.toFixed(2) + ' meters';
    document.getElementById('output_c').textContent = numberOfCells.toFixed(0);
    document.getElementById('output_d').textContent = totalTrafficLoad.toFixed(2) + ' Erlangs';
    document.getElementById('output_e').textContent = trafficLoadPerCell.toFixed(2) + ' Erlangs';
    document.getElementById('output_f').textContent = roundedCellsPerCluster.toFixed(0);
    document.getElementById('output_g0').textContent = callDropProbability;
    document.getElementById('output_g1').textContent = correctrow5;
    document.getElementById('output_g2').textContent = numberOfCarriersQoS;
    document.getElementById('output_g3').textContent = numberOfCarriersQoS * roundedCellsPerCluster;
    document.getElementById('output_h1').textContent = correctrow;

    document.getElementById('output_h2').textContent = numberOfCarriersQoSChanged;

    document.getElementById('output_h3').textContent = numberOfCarriersQoSChanged * roundedCellsPerCluster;
}

// For AI explanation ---
async function askAI() {
    const aiExplanationSection = document.getElementById('aiExplanationSection');
    const aiExplanationBox = document.getElementById('aiExplanation');

    // Display a loading message
    aiExplanationBox.innerHTML = '<p>Generating explanation... please wait.</p>';
    aiExplanationSection.classList.remove('hidden');

    // 1. Get all input values from the form
    const area = document.getElementById("area").value;
    const areaUnit = document.getElementById("areaUnit").value;
    const subscribers = document.getElementById("subscribers").value;
    const callsPerDay = document.getElementById("callsPerDay").value;
    const callDuration = document.getElementById("callDuration").value;
    const callDurationUnit = document.getElementById("callDurationUnit").value;
    const callDropProbability = document.getElementById("callDropProbability").value;
    const minSIR = document.getElementById("minSIR").value;
    const minSIRUnit = document.getElementById("minSIRUnit").value;
    const powerAt10m = document.getElementById("powerAt10m").value;
    const powerAt10mUnit = document.getElementById("powerAt10mUnit").value;
    const referenceDistance = document.getElementById("referenceDistance").value;
    const referenceDistanceUnit = document.getElementById("referenceDistanceUnit").value;
    const pathLossExponent = document.getElementById("pathLossExponent").value;
    const receiverSensitivity = document.getElementById("receiverSensitivity").value;
    const receiverSensitivityUnit = document.getElementById("receiverSensitivityUnit").value;
    const numberofcochannelinterferingcells = document.getElementById("numberofcochannelinterferingcells").value;
    const timeslotsPerCarrier = 8;
    const frequency = 900; // GSM900 technology

    // 2. Build the prompt for the AI
    const prompt = `
    I am performing a cellular network design calculation for a city.
    Here are the input parameters:
    - City Area: ${area} ${areaUnit}
    - Number of subscribers: ${subscribers}
    - Average calls per day per subscriber: ${callsPerDay}
    - Average call duration: ${callDuration} ${callDurationUnit}
    - Target Call drop probability (QoS): ${callDropProbability}
    - Minimum Signal-to-Interference Ratio (SIR): ${minSIR} ${minSIRUnit}
    - Power measured at reference distance: ${powerAt10m} ${powerAt10mUnit}
    - Reference distance: ${referenceDistance} ${referenceDistanceUnit}
    - Path loss exponent: ${pathLossExponent}
    - Receiver sensitivity: ${receiverSensitivity} ${receiverSensitivityUnit}
    - Number of co-channel interfering cells: ${numberofcochannelinterferingcells}
    - Timeslots per carrier: ${timeslotsPerCarrier}
    - Technology: GSM900 (Frequency: ${frequency} MHz)
    - Traffic load lookup table (A=Erlangs, B=Call Drop Probability):
    ${JSON.stringify(array)}

    Please explain the step-by-step methodology and formulas used to calculate the following values based on the provided inputs:
    a) Maximum distance
    b) Maximum cell size (assuming hexagonal cells)
    c) Number of cells
    d) Total traffic load (Erlangs)
    e) Traffic load per cell (Erlangs)
    f) Number of cells per cluster
    g) Minimum carriers needed to meet the QoS based on the given call drop probability
    h) Minimum carriers needed if the QoS is 0.05
    Then, provide the final calculated values for each point.
    `;

    // 3. Send the request to the backend
    try {
        const response = await fetch('/ask-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 4. Display the explanation in the front-end
        aiExplanationBox.innerHTML = `
            <h3>Methodology and Results:</h3>
            <p>${data.explanation.replace(/\n/g, '<br>')}</p>
        `;

    } catch (error) {
        console.error('Error fetching AI explanation:', error);
        aiExplanationBox.innerHTML = '<p style="color: red;">Error: Could not retrieve explanation. Please check the server connection and API key.</p>';
    }
}

// Add event listener for the AI button
document.getElementById('ask-ai-button').addEventListener('click', askAI);