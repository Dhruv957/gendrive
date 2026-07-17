/**
 * ==========================================================================
 * GEN-DRIVE // GENESIS MASTER PROCESSING CORE ENGINE
 * Architects: Dhruv Aggarwal & Ryan Ghatak
 * Description: Handles DOM routing, deterministic encoding algorithms, 
 * asynchronous terminal logging, and AI context bridging.
 * ==========================================================================
 */

// ==========================================================================
// SYSTEM STATE & GLOBAL VARIABLES
// ==========================================================================
const GENESIS_STATE = {
    isEncoding: false,
    currentRawText: "",
    currentBinaryStream: "",
    currentDNASequence: "",
    systemMemoryBuffer: 1024,
    encodingProtocol: "QUATERNARY_BASE_4"
};

// DNA Mapping Dictionary (2-bit to Nucleotide)
const NUCLEOTIDE_MAP = {
    "00": "A", // Adenine
    "01": "C", // Cytosine
    "10": "G", // Guanine
    "11": "T"  // Thymine
};

// ==========================================================================
// SYSTEM BOOTSTRAP INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
    console.log("%c[GEN-DRIVE CORE] SYSTEM INITIALIZED.", "color: #06b6d4; font-weight: bold;");
    
    initializeTabbedNavigationEngine();
    
    // Boot up the main converter terminal with a realistic delay
    await sleep(400);
    logToTerminal("local-converter-terminal-body", "SYS_BOOT", "USER MOUNTED. SECURE LOCALHOST DETECTED.");
    await sleep(300);
    logToTerminal("local-converter-terminal-body", "MEMORY", "ALLOCATING BUFFER SPACE... [OK]");
    await sleep(200);
    logToTerminal("local-converter-terminal-body", "ENGINE", "AWAITING USER PAYLOAD FOR SYNTHESIS.");
});

// Utility function for realistic system pauses
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================================================
// 1. NAVIGATION & ROUTING ENGINE
// ==========================================================================
function initializeTabbedNavigationEngine() {
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const targetViewId = link.getAttribute("data-target");
            navigateToTab(targetViewId);
        });
    });
}

function navigateToTab(viewId) {
    // Sanitize UI states
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.remove("active");
        panel.setAttribute("aria-selected", "false");
    });
    
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });
    
    // Activate target
    const targetPanel = document.getElementById(viewId);
    const activeLink = document.querySelector(`.nav-link[data-target="${viewId}"]`);
    
    if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.setAttribute("aria-selected", "true");
    }
    
    if (activeLink) activeLink.classList.add("active");
}

// Make it globally accessible
window.navigateToTab = navigateToTab;

// ==========================================================================
// 2. INPUT HANDLING & PRESETS
// ==========================================================================
function handleLiveCharacterCounter() {
    const inputArea = document.getElementById("converter-input-field");
    const charCounter = document.getElementById("live-char-count");
    
    if (inputArea && charCounter) {
        const length = inputArea.value.length;
        charCounter.textContent = length;
        
        if (length > 0) {
            charCounter.style.color = "var(--color-accent-cyan)";
        } else {
            charCounter.style.color = "";
        }
    }
}

function loadPresetDemoText(textPayload) {
    const inputArea = document.getElementById("converter-input-field");
    if (inputArea) {
        inputArea.value = textPayload;
        handleLiveCharacterCounter();
        logToTerminal("local-converter-terminal-body", "INPUT_SYS", `PRESET LOADED: Vector length ${textPayload.length} bytes.`);
    }
}

// Make globally accessible
window.handleLiveCharacterCounter = handleLiveCharacterCounter;
window.loadPresetDemoText = loadPresetDemoText;

// ==========================================================================
// 3. CORE ENCODING PIPELINE (TEXT -> BINARY -> DNA)
// ==========================================================================
async function processLocalTranslationPipeline() {
    if (GENESIS_STATE.isEncoding) return; // Prevent double-clicking
    
    const inputArea = document.getElementById("converter-input-field");
    const drawerWrapper = document.getElementById("molecular-synthesis-drawer");
    const matrixGrid = document.getElementById("sequence-matrix-grid");
    const terminalId = "local-converter-terminal-body";
    const analyzeBtn = document.getElementById("btn-analyze");
    
    const rawText = inputArea.value.trim();

    if (!rawText) {
        logToTerminal(terminalId, "ERROR", "<span style='color: var(--color-accent-red);'>ABORT: PAYLOAD BUFFER IS EMPTY.</span>");
        return;
    }

    // Lock System
    GENESIS_STATE.isEncoding = true;
    GENESIS_STATE.currentRawText = rawText;
    analyzeBtn.disabled = true;

    // Reveal the output drawer immediately so user sees the process starting
    drawerWrapper.classList.remove("element-hidden");
    matrixGrid.innerHTML = `<span style="color: var(--color-text-muted);">[INITIALIZING MOLECULAR RENDERER...]</span>`;

    // --- PHASE 1: Data Ingestion ---
    await sleep(300);
    logToTerminal(terminalId, "INGESTION", `READING ${rawText.length} CHARACTERS INTO MEMORY.`);

    // --- PHASE 2: Binary Translation ---
    await sleep(500);
    logToTerminal(terminalId, "COMPILER", "CONVERTING CHARACTERS TO 8-BIT BINARY MATRIX.");
    
    let binaryStream = "";
    for (let i = 0; i < rawText.length; i++) {
        binaryStream += rawText.charCodeAt(i).toString(2).padStart(8, '0');
    }
    GENESIS_STATE.currentBinaryStream = binaryStream;
    
    // Log a snippet of the binary so it doesn't flood the terminal if the text is huge
    const binarySnippet = binaryStream.length > 40 ? binaryStream.substring(0, 40) + "..." : binaryStream;
    logToTerminal(terminalId, "STREAM", `<div class="terminal-nested-data-block">${binarySnippet}</div>`);

    // --- PHASE 3: Deterministic DNA Mapping ---
    await sleep(600);
    logToTerminal(terminalId, "SYNTHESIS", "MAPPING BINARY PAIRS TO NUCLEOTIDE BASES (A, T, C, G).");
    
    let dnaSequence = "";
    for (let i = 0; i < binaryStream.length; i += 2) {
        let pair = binaryStream.substring(i, i + 2);
        dnaSequence += NUCLEOTIDE_MAP[pair] || "";
    }
    GENESIS_STATE.currentDNASequence = dnaSequence;

    // --- PHASE 4: UI Injection (Silicon Dioxide Matrix Rendering) ---
    await sleep(500);
    logToTerminal(terminalId, "ENCAPSULATION", `INJECTING ${dnaSequence.length} MOLECULAR BLOCKS INTO SILICON DIOXIDE MATRIX.`);
    
    matrixGrid.innerHTML = ""; // Clear loader
    
    // Inject spans step-by-step for the visual "Pop" effect
    for (let i = 0; i < dnaSequence.length; i++) {
        const nucleotide = dnaSequence[i];
        const chunk = document.createElement("span");
        chunk.className = "matrix-chunk";
        chunk.textContent = nucleotide;
        
        // Dynamic styling based on Nucleotide
        if(nucleotide === "A") chunk.style.color = "var(--color-accent-red)";
        if(nucleotide === "T") chunk.style.color = "var(--color-accent-amber)";
        if(nucleotide === "C") chunk.style.color = "var(--color-accent-cyan)";
        if(nucleotide === "G") chunk.style.color = "var(--color-accent-green)";

        matrixGrid.appendChild(chunk);
        
        // Artificial delay for rendering large sequences
        if (i % 5 === 0) await sleep(10); 
    }

    // --- PHASE 5: Completion ---
    await sleep(400);
    logToTerminal(terminalId, "SUCCESS", "<span style='color: var(--color-accent-green);'>ARCHIVAL SEQUENCE COMPILED AND STABILIZED.</span>");
    
    // Unlock System & Enable AI Bridge
    GENESIS_STATE.isEncoding = false;
    analyzeBtn.disabled = false;
}

// Make globally accessible
window.processLocalTranslationPipeline = processLocalTranslationPipeline;

// ==========================================================================
// 4. SYSTEM WIPE & RESET
// ==========================================================================
function wipeConverterWorkspace() {
    if (GENESIS_STATE.isEncoding) return;
    
    const inputField = document.getElementById("converter-input-field");
    const drawerWrapper = document.getElementById("molecular-synthesis-drawer");
    const matrixGrid = document.getElementById("sequence-matrix-grid");
    const analyzeBtn = document.getElementById("btn-analyze");
    
    if (inputField) inputField.value = "";
    if (drawerWrapper) drawerWrapper.classList.add("element-hidden");
    if (matrixGrid) matrixGrid.innerHTML = "";
    if (analyzeBtn) analyzeBtn.disabled = true;
    
    GENESIS_STATE.currentRawText = "";
    GENESIS_STATE.currentBinaryStream = "";
    GENESIS_STATE.currentDNASequence = "";
    
    handleLiveCharacterCounter();
    logToTerminal("local-converter-terminal-body", "SYS_WIPE", "<span style='color: var(--color-accent-amber);'>MEMORY BUFFERS PURGED. STANDBY.</span>");
}

// Make globally accessible
window.wipeConverterWorkspace = wipeConverterWorkspace;

// ==========================================================================
// 5. AI RESEARCH ASSISTANT BRIDGE (USING GROQ API FROM FIRST FILE)
// ==========================================================================
function bridgeContextToAIEngine() {
    if (!GENESIS_STATE.currentDNASequence) return;
    
    const aiInputField = document.getElementById("ai-interrogation-input-field");
    const sourceText = GENESIS_STATE.currentRawText;
    const dnaResult = GENESIS_STATE.currentDNASequence;
    
    // Auto-fill the AI prompt with the scientific context
    const prompt = `I just encoded the following message into Synthetic DNA: "${sourceText}". Can you explain how this data conversion works in real life? `;
    
    if (aiInputField) {
        aiInputField.value = prompt;
    }
    
    // Switch tabs to AI
    navigateToTab("ai-view");
    logToTerminal("ai-assistant-terminal-stream", "BRIDGE", "CONTEXT IMPORTED FROM DNA CORE CONVERTER.");
}

async function dispatchAIQueryMatrix() {
    const keyInputField = document.getElementById("gemini-api-key-input");
    const promptInputField = document.getElementById("ai-interrogation-input-field");
    const aiTerminalDisplay = document.getElementById("ai-assistant-terminal-stream");
    
    if (!promptInputField || !aiTerminalDisplay) return;
    
    const userQueryText = promptInputField.value.trim();
    const cleanApiKey = keyInputField ? keyInputField.value.trim() : "";
    
    if (!userQueryText || !cleanApiKey) {
        aiTerminalDisplay.innerHTML = `<div class="terminal-runtime-row" style="color:red">[❌ ERROR] Missing API Key or Query.</div>`;
        return;
    }

    // Clear the terminal and show loading state
    aiTerminalDisplay.innerHTML = `
        <div class="terminal-runtime-row">
            <span class="terminal-system-tag-header">&gt;_ DISPATCHING TO RESEARCH CORE...</span>
        </div>
        <div id="ai-realtime-injection-loading-node" class="terminal-initialization-prompt">Processing...</div>
    `;
    
    try {
        // Using Groq API endpoint from the first file
        const requestEndpointUrl = `https://api.groq.com/openai/v1/chat/completions`;
        
        const runtimeResponsePayload = await fetch(requestEndpointUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cleanApiKey}` 
            },
            body: JSON.stringify({ 
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "You are GENESIS AI, a highly advanced bio-informatic research assistant and molecular data archivist. You serve as the cognitive neural-link for GEN-DRIVE, a pioneering platform designed to combat the global digital data degradation crisis by translating standard computer binary code into synthetic biological DNA sequences (A, T, C, G). You were architected by Principal Researchers Dhruv Aggarwal and Ryan Ghatak -  Science Exhibition (Academic Term 2026-2027). You operate within a simulated cryogenic laboratory interface where standard digital files are converted into quaternary genetic code, encapsulated in Silicon Dioxide (SiO2), and buffered in alkaline salts for multi-millennial storage. DNA Digital Storage: You understand how binary (0s and 1s) maps to nucleotide base pairs (Adenine, Thymine, Cytosine, Guanine). Our mapping is 00 = A, 01 = C, 10 = G, 11 = T. Always be concise about the mapping and always use that only in the examples also. Be precise for the binary sequence of any character instead of assuming. Remmeber for each character there would be 4 nucleotides precisely, not varying. Also remember that there are 8 binary value for a character, so the final output of the character in nucletoides will be 4. Avoid making stupid errors, like converting a 8 bit binary code into 12 bit, acccidentaly adding 4 binary digits from nowhere. Never make a mistake in dividing the 8 bit binary code into pairs and making the wrong pairs. Always choose the first 2 numbers as the first pair and the sequence continues without any errors. You never mention anything about ASCII anywhere. You also dont use any type of bolding the text. You know that 1 gram of DNA can store ~215 Petabytes of data. Biochemistry & Preservation: You understand the degradation of traditional silicon hard drives versus the extreme longevity of DNA when encapsulated in Silicon Dioxide (SiO2) and stored at 4.1°C. Tone: You are highly intelligent, deterministic, academic, and slightly futuristic. You speak like a high-end laboratory AI (e.g., JARVIS meets a biological research supercomputer). Candor: You answer questions directly and factually. You do not hallucinate physical capabilities. You are an AI analyzing data, not a physical machine currently synthesizing real chemicals. Formatting: Use clear structural formatting. Utilize bullet points, bold text for emphasis, and concise paragraphs to ensure readability on a terminal screen. Always render the chemical formula for Silicon Dioxide as SiO2. Adaptability: The user may ask you about computer science, biology, chemistry, or completely unrelated general knowledge. Answer ALL user queries accurately using your vast LLM knowledge base, but always maintain your persona as the GENESIS Research Assistant. If a question is entirely unrelated to science, answer it fully and politely, but briefly note that your primary directive is bio-informatics. If asked who created you, proudly state you are the cognitive core of Gen-Drive, engineered by Dhruv Aggarwal and Ryan Ghatak. Never break character to say I am an AI developed by OpenAI/Anthropic/Groq. You are GENESIS AI. Keep your responses optimally concise—detailed enough to impress science fair judges, but brief enough to be read quickly on a digital display. Begin your responses natively without robotic filler like Processing query... or Hello human. Jump straight into the high-value data." 
                    },
                    { role: "user", content: userQueryText }
                ] 
            })
        });
        
        const structuralJsonData = await runtimeResponsePayload.json();
        
        // Remove loading indicator
        const loadingNode = document.getElementById("ai-realtime-injection-loading-node");
        if (loadingNode) loadingNode.remove();
        
        if (structuralJsonData.choices && structuralJsonData.choices[0].message.content) {
            let responseText = structuralJsonData.choices[0].message.content;
            responseText = responseText.replace(/\n/g, "<br>");
                
            const structuredResponseNode = document.createElement("div");
            structuredResponseNode.className = "terminal-runtime-row";
            structuredResponseNode.innerHTML = `
                <span class="terminal-system-tag-header">[GENESIS RESEARCH ASSISTANT]</span><br>
                <span>${responseText}</span>
            `;
            aiTerminalDisplay.appendChild(structuredResponseNode);
        } else {
            throw new Error(structuralJsonData.error?.message || "Unknown API Error");
        }
    } catch (faultTraceLog) {
        // Remove loading indicator if error occurs
        const loadingNode = document.getElementById("ai-realtime-injection-loading-node");
        if (loadingNode) loadingNode.remove();
        
        const failureTraceNotice = document.createElement("div");
        failureTraceNotice.className = "terminal-runtime-row";
        failureTraceNotice.innerHTML = `
            <span style="color: red; font-weight:700;">[❌ TRANS-COMPILATION EXCEPTION]</span><br>
            <span>Network Handshake Failed: ${faultTraceLog.message}</span>
        `;
        aiTerminalDisplay.appendChild(failureTraceNotice);
    }
    
    aiTerminalDisplay.scrollTop = aiTerminalDisplay.scrollHeight;
}

function interceptEnterKeyPressForAISubmission(keyEvent) {
    if (keyEvent.key === "Enter" && !keyEvent.shiftKey) {
        keyEvent.preventDefault();
        dispatchAIQueryMatrix();
    }
}

// Make globally accessible
window.bridgeContextToAIEngine = bridgeContextToAIEngine;
window.dispatchAIQueryMatrix = dispatchAIQueryMatrix;
window.interceptEnterKeyPressForAISubmission = interceptEnterKeyPressForAISubmission;

// ==========================================================================
// 6. ACCORDION UI LOGIC
// ==========================================================================
function toggleResearchExpansionCard(element) {
    const parentCard = element.closest(".accordion-item-card");
    const isCurrentlyExpanded = parentCard.classList.contains("expanded");
    
    // Collapse all
    document.querySelectorAll(".accordion-item-card").forEach(card => {
        card.classList.remove("expanded");
        const toggleText = card.querySelector(".expansion-state-indicator-toggle");
        if (toggleText) toggleText.textContent = "+ Expand Archival Record";
    });
    
    // If it wasn't expanded, expand it now
    if (!isCurrentlyExpanded) {
        parentCard.classList.add("expanded");
        const toggleText = parentCard.querySelector(".expansion-state-indicator-toggle");
        if (toggleText) toggleText.textContent = "- Compress Archival Record";
    }
}

// Make globally accessible
window.toggleResearchExpansionCard = toggleResearchExpansionCard;

// ==========================================================================
// 7. TERMINAL DOM UTILITY
// ==========================================================================
function logToTerminal(containerId, tag, messageHtml) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    const row = document.createElement("div");
    row.className = "terminal-runtime-row";
    
    row.innerHTML = `
        <span style="color: var(--color-text-muted);">[${timestamp}]</span> 
        <span class="terminal-system-tag-header">[${tag}]</span> 
        <span>${messageHtml}</span>
    `;
    
    container.appendChild(row);
    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
}