function calculate() {
    // Get all input elements and their values
    const bwInput = document.getElementById('bw');
    const bwUnit = document.getElementById('bwUnit').value;
    const quantizerBitsInput = document.getElementById('quantizerBits');
    const sourceEncoderRateInput = document.getElementById('sourceEncoderRate');
    const channelEncoderRateInput = document.getElementById('channelEncoderRate');
    const interleaverBitsInput = document.getElementById('interleaverBits');
    const burstBitsInput = document.getElementById('burstBits');
    const burstDurationInput = document.getElementById('burstDuration');
    const rsWarning = document.getElementById('rs-warning');
    const resultsSection = document.getElementById('resultsSection'); 

    // Parse input values and convert units if needed
    let bw = parseFloat(bwInput.value);
    if (bwUnit === 'KHz') {
        bw *= 1000;
    }

    const quantizerBits = parseInt(quantizerBitsInput.value);
    const Rs = parseFloat(sourceEncoderRateInput.value);
    const Rc = parseFloat(channelEncoderRateInput.value);
    const interleaverBits = parseInt(interleaverBitsInput.value);
    const burstBits = parseInt(burstBitsInput.value);
    const burstTimeMs = parseFloat(burstDurationInput.value);

    // Validate inputs
    if (isNaN(bw) || isNaN(quantizerBits) || isNaN(Rs) || isNaN(Rc) || isNaN(interleaverBits) || isNaN(burstBits) || isNaN(burstTimeMs)) {
        alert('Please enter valid numbers for all inputs.');

        resultsSection.classList.add('hidden');
        return;
    }

    // Check the source encoder rate
    if (Rs >= 1) {
        rsWarning.style.display = 'block';
        // Clear all output values
        document.getElementById('output1').textContent = '__ Hz';
        document.getElementById('output2').textContent = '__ levels';
        document.getElementById('output3').textContent = '__ bps';
        document.getElementById('output4').textContent = '__ bps';
        document.getElementById('output5').textContent = '__ bps';
        document.getElementById('output6').textContent = '__ bps';
        // Update the main paragraph with placeholder values
        document.getElementById('bwText').textContent = '_';
        document.getElementById('quantizerBitsText').textContent = '_';
        document.getElementById('sourceEncoderRateText').textContent = '_';
        document.getElementById('channelEncoderRateText').textContent = '_';
        document.getElementById('interleaverBitsText').textContent = '_';

        resultsSection.classList.add('hidden');
        return;
    } else {
        rsWarning.style.display = 'none';
    }

    // --- Calculations ---

    // 1. Calculate the sampling frequency (fs) at the Nyquist rate
    const fs = 2 * bw;
    document.getElementById('output1').textContent = fs + ' Hz';

    // 2. Find the number of quantization levels (L)
    const L = Math.pow(2, quantizerBits);
    document.getElementById('output2').textContent = L + ' levels';

    // 3. Determine the bit rate at the output of the source encoder (Rb_s)
    const bitRateSource = (fs * quantizerBits) * Rs;
    document.getElementById('output3').textContent = bitRateSource.toFixed(2) + ' bps';

    // 4. Calculate the bit rate at the output of the channel encoder (Rb_c)
    const bitRateChannel = bitRateSource / Rc;
    document.getElementById('output4').textContent = bitRateChannel.toFixed(2) + ' bps';

    // 5. Calculate the bit rate at the output of the interleaver (Rb_i)
    const bitRateInterleaver = bitRateChannel;
    document.getElementById('output5').textContent = bitRateInterleaver.toFixed(2) + ' bps';
    
    // 6. Calculate the bit rate after burst formatting (Rb_b)
    const burstTimeSec = burstTimeMs / 1000;
    const bitRateBurst = burstBits / burstTimeSec;
    document.getElementById('output6').textContent = bitRateBurst.toFixed(2) + ' bps';

    // --- Update the main paragraph with input values ---
    document.getElementById('bwText').textContent = bwInput.value;
    document.getElementById('quantizerBitsText').textContent = quantizerBits;
    document.getElementById('sourceEncoderRateText').textContent = Rs;
    document.getElementById('channelEncoderRateText').textContent = Rc;
    document.getElementById('interleaverBitsText').textContent = interleaverBits;


    resultsSection.classList.remove('hidden');
}


async function askAI() {
    const aiExplanationSection = document.getElementById('aiExplanationSection');
    const aiExplanationBox = document.getElementById('aiExplanation');


    aiExplanationBox.innerHTML = '<p>Generating explanation... please wait.</p>';
    aiExplanationSection.classList.remove('hidden');


    const bwInput = document.getElementById('bw').value;
    const bwUnit = document.getElementById('bwUnit').value;
    const quantizerBits = document.getElementById('quantizerBits').value;
    const Rs = document.getElementById('sourceEncoderRate').value;
    const Rc = document.getElementById('channelEncoderRate').value;
    const interleaverBits = document.getElementById('interleaverBits').value;
    const burstBits = document.getElementById('burstBits').value;
    const burstDuration = document.getElementById('burstDuration').value;


    const prompt = `
    I am designing a wireless communication system.
    Here are the parameters:
    - Analog signal Bandwidth (B): ${bwInput} ${bwUnit}
    - Number of quantizer bits (N): ${quantizerBits} bits
    - Source encoder rate (Rs): ${Rs}
    - Channel encoder rate (Rc): ${Rc}
    - Interleaver bits: ${interleaverBits}
    - Burst bits: ${burstBits}
    - Burst duration: ${burstDuration} ms

    Please validate the inputs. If valid, explain the step-by-step methodology to calculate the following rates in a wireless communication system and provide the final formulas:
    1. Sampling frequency (fs)
    2. Number of quantization levels (L)
    3. Bit rate at the output of the source encoder (Rb_s)
    4. Bit rate at the output of the channel encoder (Rb_c)
    5. Bit rate at the output of the interleaver (Rb_i)
    6. Bit rate after burst formatting (Rb_b)

    Explain the concepts in natural language, and be sure to provide the formulas for each step.
    `;


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
        

        aiExplanationBox.innerHTML = `
            <h3>Methodology and Results:</h3>
            <p>${data.explanation.replace(/\n/g, '<br>')}</p>
        `;
        
    } catch (error) {
        console.error('Error fetching AI explanation:', error);
        aiExplanationBox.innerHTML = '<p style="color: red;">Error: Could not retrieve explanation. Please check the server connection and API key.</p>';
    }
}