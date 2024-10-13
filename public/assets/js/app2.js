async function setup() {
    try {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play();
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                resolve();
            };
        });

        console.log("Video stream is working.");

        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        });

        console.log("MoveNet model loaded successfully.");

        let allKeypointPositions = [];

        async function detectPose() {
            const poses = await detector.estimatePoses(video);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (poses.length > 0 && poses[0].keypoints) {
                const currentKeypointPositions = poses[0].keypoints.map(keypoint => ({
                    name: keypoint.name,
                    x: keypoint.x,
                    y: keypoint.y
                }));

                allKeypointPositions.push(currentKeypointPositions);
                
                drawKeypoints(poses[0].keypoints, ctx);

                console.log("Current Keypoint Positions:", currentKeypointPositions);
            } else {
                console.log("No keypoints detected.");
            }
            if (poses.length > 0 && poses[0].keypoints) {
                    drawKeypoints(poses[0].keypoints, ctx);
                    checkEyePosition(poses[0].keypoints);
                }

            requestAnimationFrame(detectPose);
        }

        function drawKeypoints(keypoints, ctx) {
keypoints.forEach(keypoint => {
if (keypoint.score > 0.3) { // Ensure keypoint confidence is high
    ctx.beginPath();
    ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI); // Draw circle
    ctx.fillStyle = "red";
    ctx.fill();
}
});

// Draw line from keypoint 0 to keypoint 1
if (keypoints[0].score > 0.3 && keypoints[1].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[0].x, keypoints[0].y);
ctx.lineTo(keypoints[1].x, keypoints[1].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[2].score > 0.3 && keypoints[0].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[2].x, keypoints[2].y);
ctx.lineTo(keypoints[0].x, keypoints[0].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[3].score > 0.3 && keypoints[1].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[3].x, keypoints[3].y);
ctx.lineTo(keypoints[1].x, keypoints[1].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[4].score > 0.3 && keypoints[2].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[4].x, keypoints[4].y);
ctx.lineTo(keypoints[2].x, keypoints[2].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[5].score > 0.3 && keypoints[6].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[5].x, keypoints[5].y);
ctx.lineTo(keypoints[6].x, keypoints[6].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[5].score > 0.3 && keypoints[7].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[5].x, keypoints[5].y);
ctx.lineTo(keypoints[7].x, keypoints[7].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[6].score > 0.3 && keypoints[8].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[6].x, keypoints[6].y);
ctx.lineTo(keypoints[8].x, keypoints[8].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[7].score > 0.3 && keypoints[9].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[7].x, keypoints[7].y);
ctx.lineTo(keypoints[9].x, keypoints[9].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[8].score > 0.3 && keypoints[10].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[8].x, keypoints[8].y);
ctx.lineTo(keypoints[10].x, keypoints[10].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[5].score > 0.3 && keypoints[11].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[5].x, keypoints[5].y);
ctx.lineTo(keypoints[11].x, keypoints[11].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[6].score > 0.3 && keypoints[12].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[6].x, keypoints[6].y);
ctx.lineTo(keypoints[12].x, keypoints[12].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[11].score > 0.3 && keypoints[12].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[11].x, keypoints[11].y);
ctx.lineTo(keypoints[12].x, keypoints[12].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[11].score > 0.3 && keypoints[13].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[11].x, keypoints[11].y);
ctx.lineTo(keypoints[13].x, keypoints[13].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[12].score > 0.3 && keypoints[14].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[12].x, keypoints[12].y);
ctx.lineTo(keypoints[14].x, keypoints[14].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[14].score > 0.3 && keypoints[16].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[14].x, keypoints[14].y);
ctx.lineTo(keypoints[16].x, keypoints[16].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
if (keypoints[13].score > 0.3 && keypoints[15].score > 0.3) {
ctx.beginPath();
ctx.moveTo(keypoints[13].x, keypoints[13].y);
ctx.lineTo(keypoints[15].x, keypoints[15].y);
ctx.strokeStyle = "yellow"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}
ctx.beginPath();
ctx.moveTo(0, canvas.height / 4); // Start at the middle of the canvas height
ctx.lineTo(canvas.width, canvas.height / 4); // End at the middle of the canvas height
ctx.strokeStyle = "red"; // Line color
ctx.lineWidth = 3; // Line width
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, canvas.height * 0.75); // Start at 3/4 of the canvas height
ctx.lineTo(canvas.width, canvas.height * 0.75); // End at the full width of the canvas
ctx.strokeStyle = "red"; // Line color
ctx.lineWidth = 2; // Line width
ctx.stroke();
}

async function checkEyePosition(keypoints) {
                const leftEye = keypoints[2]; // Left Eye
                const rightEye = keypoints[1]; // Right Eye
                const leftHip = keypoints[11]; // Left Hip
                const rightHip = keypoints[12]; // Right Hip
                const thresholdY = canvas.height / 4;
                const redLineY = canvas.height * 0.75;
                if(leftHip.y > redLineY || rightHip.y > redLineY) {
                    document.getElementById('info1').innerText = "Crouch";
                    //////////////////

                    const spacebarEvent = new KeyboardEvent('keyup', {
    key: ' ',
    code: 'Space',
    keyCode: 32, // Deprecated, but still used in some cases
    which: 32,   // Deprecated, but still used in some cases
    bubbles: true // Allow the event to bubble up
});

document.dispatchEvent(spacebarEvent);



                    //////////////////
                } else {
                    document.getElementById('info1').innerText = "Idle";
                    const spacebarEvent = new KeyboardEvent('keydown', {
    key: ' ',
    code: 'Space',
    keyCode: 32, // Deprecated, but still used in some cases
    which: 32,   // Deprecated, but still used in some cases
    bubbles: true // Allow the event to bubble up
});

document.dispatchEvent(spacebarEvent);

                }
                if (leftEye.y > thresholdY || rightEye.y > thresholdY) {
                    document.getElementById('info1').innerText = "Eyes Below Threshold";

                    const arrowDownEvent = new KeyboardEvent('keydown', {
    key: 'ArrowDown',
    code: 'ArrowDown',
    keyCode: 40, // Deprecated, but still used in some cases
    which: 40,   // Deprecated, but still used in some cases
    bubbles: true // Allow the event to bubble up
});

document.dispatchEvent(arrowDownEvent);

                } else {
                    document.getElementById('info1').innerText = "Eyes Above Threshold";
                    const arrowDownReleaseEvent = new KeyboardEvent('keyup', {
    key: 'ArrowDown',
    code: 'ArrowDown',
    keyCode: 40, // Deprecated, but still used in some cases
    which: 40,   // Deprecated, but still used in some cases
    bubbles: true // Allow the event to bubble up
});

document.dispatchEvent(arrowDownReleaseEvent);
                }
            }

        detectPose();

    } catch (error) {
        console.error("An error occurred: " + error.message);
    }
}

setup();



async function detectPose() {
const poses = await detector.estimatePoses(video);

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

if (poses.length > 0 && poses[0].keypoints) {
const currentKeypointPositions = poses[0].keypoints.map(keypoint => ({
    name: keypoint.name,
    x: keypoint.x,
    y: keypoint.y
}));

allKeypointPositions.push(currentKeypointPositions);

drawKeypoints(poses[0].keypoints, ctx);

// Check if keypoints 1 and 2 are below the red line
const redLineY = canvas.height / 4;
const infoDiv = document.getElementById('info1');

if (poses[0].keypoints[1].y > redLineY && poses[0].keypoints[2].y > redLineY) {
    infoDiv.innerHTML = "Crouch"; // Change to "Crouch"
    console.log("Crouch")
} else {
    infoDiv.innerHTML = "Idle"; // Change to "Idle"
    console.log("Idle")
}

console.log("Current Keypoint Positions:", currentKeypointPositions);
} else {
console.log("No keypoints detected.");
}

requestAnimationFrame(detectPose);
}
