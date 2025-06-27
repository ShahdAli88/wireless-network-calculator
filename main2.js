function calculate() {
    const bwInput = document.getElementById('bw');
    const subcarrierSpacingInput = document.getElementById('subcarrierSpacing');
    const ofdmDurationInput = document.getElementById('ofdmDuration');
    const qamLevelInput = document.getElementById('qamLevel');
    const numParallelBlocksInput = document.getElementById('numParallelBlocks');
    const edurationInput = document.getElementById('eduration');

    incrementDecrement(bwInput);
    incrementDecrement(subcarrierSpacingInput);
    incrementDecrement(ofdmDurationInput);
    incrementDecrement(qamLevelInput);
    incrementDecrement(numParallelBlocksInput);
    incrementDecrement(edurationInput);

    const bw = convertToKHz(parseFloat(bwInput.value), document.getElementById('bw-unit').value);
    const subcarrierSpacing = convertToKHz(parseFloat(subcarrierSpacingInput.value), document.getElementById('subcarrierSpacing-unit').value);
    const ofdmDuration = parseFloat(ofdmDurationInput.value); // In seconds
    const qamLevel = parseInt(qamLevelInput.value);
    const numParallelBlocks = parseInt(numParallelBlocksInput.value);
    const eduration = convertToSeconds(parseFloat(edurationInput.value), document.getElementById('eduration-unit').value);

    const rsWarning = document.getElementById('rs-warning');

    if (qamLevel <= 0 || (qamLevel & (qamLevel - 1)) !== 0) {
        rsWarning.textContent = "QAM level must be a power of 2 greater than 0";
        return;
    } else {
        rsWarning.textContent = ""; // Clear any previous warning
    }

    const numSubcarriers = bw / subcarrierSpacing;

    if (numSubcarriers != Math.round(numSubcarriers)) {
        rsWarning.textContent = "The result of bw/subcarrierSpacing must be an integer";
        return;
    } else {
        rsWarning.textContent = ""; // Clear any previous warning
    }

    document.getElementById('output1').textContent = numSubcarriers;

    const bitsPerResourceElement = Math.log2(qamLevel);
    document.getElementById('output2').textContent = bitsPerResourceElement + ' bits';

    const bitsPerOfdmSymbol = bitsPerResourceElement * numSubcarriers;
    document.getElementById('output3').textContent = bitsPerOfdmSymbol + ' bits';

    const bitsPerOfdmResourceBlock = bitsPerOfdmSymbol * ofdmDuration;
    document.getElementById('output4').textContent = bitsPerOfdmResourceBlock + ' bits';

    const maxTransmissionRate = numParallelBlocks * bitsPerOfdmResourceBlock / eduration;
    document.getElementById('output5').textContent = maxTransmissionRate + ' bps';

    // حساب الكفاءة الطيفية (bit/s/Hz)
    const bwHz = bw * 1000; // تحويل kHz إلى Hz
    const spectralEfficiency = maxTransmissionRate / bwHz;
    document.getElementById('output6').textContent = spectralEfficiency.toFixed(4) + ' bit/s/Hz';
}

function incrementDecrement(input) {
    input.addEventListener('input', () => {
        const currentValue = input.value;
        if (isNaN(parseFloat(currentValue)) || !isFinite(currentValue)) {
            input.value = '';
        } else if (currentValue < 0) {
            input.value = 0;
        }
    });
    input.addEventListener('keypress', (e) => {
        if (!/\d|\.|\-/g.test(e.key)) {
            e.preventDefault();
        }
    });
}

function convertToKHz(value, unit) {
    switch (unit) {
        case 'nHz':
            return value / 1e12;
        case 'μHz':
            return value / 1e9;
        case 'mHz':
            return value / 1e6;
        case 'Hz':
            return value / 1e3;
        case 'KHz':
            return value;
        case 'MHz':
            return value * 1e3;
        case 'GHz':
            return value * 1e6;
        case 'THz':
            return value * 1e9;
        default:
            return value;
    }
}

function convertToSeconds(value, unit) {
    switch (unit) {
        case 'ns':
            return value / 1e9;
        case 'μs':
            return value / 1e6;
        case 'ms':
            return value / 1e3;
        case 's':
            return value;
        case 'min':
            return value * 60;
        case 'hr':
            return value * 3600;
        default:
            return value;
    }
}

document.getElementById('calculate-button').addEventListener('click', calculate);

// Add this function at the end of the file
async function askAI() {
    const aiExplanationSection = document.getElementById('aiExplanationSection');
    const aiExplanationBox = document.getElementById('aiExplanation');

    // Display a loading message
    aiExplanationBox.innerHTML = '<p>Generating explanation... please wait.</p>';
    aiExplanationSection.classList.remove('hidden');

    // 1. Get all input values from the form
    const bwInput = document.getElementById('bw').value;
    const bwUnit = document.getElementById('bw-unit').value;
    const subcarrierSpacing = document.getElementById('subcarrierSpacing').value;
    const subcarrierSpacingUnit = document.getElementById('subcarrierSpacing-unit').value;
    const ofdmDuration = document.getElementById('ofdmDuration').value;
    const qamLevel = document.getElementById('qamLevel').value;
    const numParallelBlocks = document.getElementById('numParallelBlocks').value;
    const eduration = document.getElementById('eduration').value;
    const edurationUnit = document.getElementById('eduration-unit').value;

    // 2. Build the prompt for the AI
    const prompt = `
    I am working on an OFDM system design.
    Here are the input parameters:
    - Bandwidth: ${bwInput} ${bwUnit}
    - Subcarrier Spacing: ${subcarrierSpacing} ${subcarrierSpacingUnit}
    - OFDM Symbols per Resource Block: ${ofdmDuration}
    - QAM Modulation Level: ${qamLevel}
    - Number of Parallel Resource Blocks: ${numParallelBlocks}
    - Resource Block Duration: ${eduration} ${edurationUnit}

    Please validate the inputs. If valid, explain the step-by-step methodology and provide the formulas to calculate the following parameters in an OFDM system in natural language, and also provide the final results using the given parameters:
    1. Number of subcarriers.
    2. Bits per resource element.
    3. Bits per OFDM symbol.
    4. Bits per OFDM resource block.
    5. Maximum transmission capacity using parallel resource blocks.
    6. Spectral Efficiency.
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

// Add a click event listener for the new AI button
document.getElementById('ask-ai-button').addEventListener('click', askAI);
