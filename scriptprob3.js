// Function to handle unit conversions
const convertUnits = (value, unit) => {
    switch (unit) {
        case "Mbps":
            return value * 1000;
        case "Gbps":
            return value * 1000000;
        case "bps":
            return value / 1000;
        case "mK":
            return value * 1000;
        case "µK":
            return value * 1000000;
        default:
            return value;
    }
};

// Function to update modulation options based on BER
function updateModulationOptions() {
    const bitErrorRate = document.getElementById("bitErrorRate").value;
    const modulationType = document.getElementById("modulationType");
    const selectedModulation = modulationType.value;

    modulationType.innerHTML = '';

    const options = {
        "1e-1": ["8psk", "16psk", "bpsk/qpsk"],
        "1e-2": ["8psk", "16psk", "bpsk/qpsk"],
        "1e-3": ["8psk", "16psk", "bpsk/qpsk"],
        "1e-4": ["8psk", "16psk", "bpsk/qpsk"],
        "1e-5": ["8psk", "16psk", "bpsk/qpsk"],
        "1e-6": ["8psk", "bpsk/qpsk"],
        "1e-7": ["8psk", "bpsk/qpsk"],
        "1e-8": ["8psk", "bpsk/qpsk"]
    };

    if (options[bitErrorRate]) {
        options[bitErrorRate].forEach(function(modulation) {
            const option = document.createElement("option");
            option.value = modulation;
            option.text = modulation.toUpperCase();
            modulationType.add(option);
        });
    }

    if (!options[bitErrorRate] || !options[bitErrorRate].includes(selectedModulation)) {
        modulationType.value = options[bitErrorRate] ? options[bitErrorRate][0] : '';
    } else {
        modulationType.value = selectedModulation;
    }
}

// Main calculation function
function calculateTransmitPower() {
    const bitErrorRate = document.getElementById("bitErrorRate").value;
    const modulationType = document.getElementById("modulationType").value;
    const pathLoss = parseFloat(document.getElementById("pathLoss").value);
    const transmitAntennaGain = parseFloat(document.getElementById("transmitAntennaGain").value);
    const receiveAntennaGain = parseFloat(document.getElementById("receiveAntennaGain").value);
    const antennaFeedLineLoss = parseFloat(document.getElementById("antennaFeedLineLoss").value);
    const otherLosses = parseFloat(document.getElementById("otherLosses").value);
    const fadeMargin = parseFloat(document.getElementById("fadeMargin").value);
    const receiverAmplifierGain = parseFloat(document.getElementById("receiverAmplifierGain").value);
    const noiseFigure = parseFloat(document.getElementById("noiseFigure").value);
    const linkMargin = parseFloat(document.getElementById("linkMargin").value);

    let dataRate = parseFloat(document.getElementById("dataRate").value);
    const dataRateUnit = document.getElementById("dataRateUnit").value;
    dataRate = convertUnits(dataRate, dataRateUnit);

    let noiseTemperature = parseFloat(document.getElementById("noiseTemperature").value);
    const noiseTemperatureUnit = document.getElementById("noiseTemperatureUnit").value;
    noiseTemperature = convertUnits(noiseTemperature, noiseTemperatureUnit);

    const logNoiseTemperature = 10 * Math.log10(noiseTemperature);
    const logDataRate = 10 * Math.log10(dataRate * 1000);

    const ebNoValues = {
        "1e-1": { "16psk": 0.12, "8psk": 0.12, "bpsk/qpsk": 0.12 },
        "1e-2": { "16psk": 4.2, "8psk": 7.2, "bpsk/qpsk": 11.8 },
        "1e-3": { "16psk": 6.9, "8psk": 10.1, "bpsk/qpsk": 14.4 },
        "1e-4": { "16psk": 8.3, "8psk": 11.8, "bpsk/qpsk": 16 },
        "1e-5": { "16psk": 9.4, "8psk": 12.8, "bpsk/qpsk": 17.2 },
        "1e-6": { "8psk": 10.4, "bpsk/qpsk": 14 },
        "1e-7": { "8psk": 11.2, "bpsk/qpsk": 14.8 },
        "1e-8": { "8psk": 12, "bpsk/qpsk": 15.4 }
    };

    const ebNo = ebNoValues[bitErrorRate] ? ebNoValues[bitErrorRate][modulationType] : null;

    if (ebNo === null) {
        document.getElementById("result").innerText = "Error: Invalid modulation type for the selected bit error rate.";
        return;
    }

    const pr = linkMargin - 228.6 + logNoiseTemperature + noiseFigure + logDataRate + ebNo;
    const pt = pr + pathLoss + antennaFeedLineLoss + otherLosses + fadeMargin - transmitAntennaGain - receiveAntennaGain - receiverAmplifierGain;
    const ptwatt = Math.pow(10, pt / 10);

    document.getElementById("result").innerText = `
        PR = ${pr.toFixed(2)} dB
        PR = ${linkMargin.toFixed(2)} - 228.6 + ${logNoiseTemperature.toFixed(2)} + ${noiseFigure.toFixed(2)} + ${logDataRate.toFixed(2)} + ${ebNo.toFixed(2)}
        PT = ${pt.toFixed(2)} dB
        PT (Watt) = ${ptwatt.toFixed(5)} Watt
        PT = ${pr.toFixed(2)} + ${pathLoss.toFixed(2)} + ${antennaFeedLineLoss.toFixed(2)} + ${otherLosses.toFixed(2)} + ${fadeMargin.toFixed(2)} - ${transmitAntennaGain.toFixed(2)} - ${receiveAntennaGain.toFixed(2)} - ${receiverAmplifierGain.toFixed(2)}
    `;
    
    // Show the results section
    document.getElementById('result').style.display = 'block';
}

// Function to validate form inputs
function validateForm() {
    const fields = [
        "pathLoss", "transmitAntennaGain", "receiveAntennaGain", "dataRate",
        "antennaFeedLineLoss", "otherLosses", "fadeMargin", "receiverAmplifierGain",
        "noiseFigure", "noiseTemperature", "linkMargin"
    ];

    const pattern = /^-?\d*\.?\d+$/;

    for (let field of fields) {
        const input = document.getElementById(field);
        if (!pattern.test(input.value)) {
            alert(`Please enter a valid number for ${input.previousElementSibling.textContent}`);
            input.focus();
            return false;
        }
    }
    return true;
}


// For AI explanation ---
async function askAI() {
    const aiExplanationSection = document.getElementById('aiExplanationSection');
    const aiExplanationBox = document.getElementById('aiExplanation');

    // Display a loading message
    aiExplanationBox.innerHTML = '<p>Generating explanation... please wait.</p>';
    aiExplanationSection.classList.remove('hidden');

    // 1. Get all input values from the form
    const bitErrorRate = document.getElementById("bitErrorRate").value;
    const modulationType = document.getElementById("modulationType").value;
    const pathLoss = document.getElementById("pathLoss").value;
    const transmitAntennaGain = document.getElementById("transmitAntennaGain").value;
    const receiveAntennaGain = document.getElementById("receiveAntennaGain").value;
    const dataRate = document.getElementById("dataRate").value;
    const dataRateUnit = document.getElementById("dataRateUnit").value;
    const antennaFeedLineLoss = document.getElementById("antennaFeedLineLoss").value;
    const otherLosses = document.getElementById("otherLosses").value;
    const fadeMargin = document.getElementById("fadeMargin").value;
    const receiverAmplifierGain = document.getElementById("receiverAmplifierGain").value;
    const noiseFigure = document.getElementById("noiseFigure").value;
    const noiseTemperature = document.getElementById("noiseTemperature").value;
    const noiseTemperatureUnit = document.getElementById("noiseTemperatureUnit").value;
    const linkMargin = document.getElementById("linkMargin").value;

    // 2. Build the prompt for the AI
    const prompt = `
    I am performing a Link Budget Calculation for a wireless communication system.
    Here are the input parameters:
    - Maximum Bit Error Rate: ${bitErrorRate}
    - Modulation Type: ${modulationType}
    - Path Loss: ${pathLoss} dB
    - Transmit Antenna Gain: ${transmitAntennaGain} dB
    - Receive Antenna Gain: ${receiveAntennaGain} dB
    - Data Rate: ${dataRate} ${dataRateUnit}
    - Antenna Feed Line Loss: ${antennaFeedLineLoss} dB
    - Other Losses: ${otherLosses} dB
    - Fade Margin: ${fadeMargin} dB
    - Receiver Amplifier Gain: ${receiverAmplifierGain} dB
    - Noise Figure: ${noiseFigure} dB
    - Noise Temperature: ${noiseTemperature} ${noiseTemperatureUnit}
    - Link Margin: ${linkMargin} dB
    - Frequency: 900 MHz

    Please explain the step-by-step methodology to calculate the total transmit power (PT) and the received power (PR) based on these parameters. Provide the formulas used, explain each component of the link budget equation, and show the final calculated values for PT and PR based on the provided inputs. The environment is a flat rural environment.
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

// Add event listeners for the buttons
document.getElementById('calculate-button').addEventListener('click', () => {
    if (validateForm()) {
        calculateTransmitPower();
    }
});

document.getElementById('ask-ai-button').addEventListener('click', askAI);

// Initial call to update modulation options
document.addEventListener("DOMContentLoaded", updateModulationOptions);