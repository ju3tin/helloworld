// src/components/PoseNet.jsx
import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

export default function PoseNet() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function loadPosenetModel() {
      const net = await posenet.load();
      detectPose(net);
    }

    async function detectPose(net) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const pose = await net.estimateSinglePose(video, {
        flipHorizontal: false,
      });

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw keypoints on the canvas
      pose.keypoints.forEach((keypoint) => {
        if (keypoint.score > 0.5) {
          const { y, x } = keypoint.position;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'aqua';
          ctx.fill();
        }
      });

      requestAnimationFrame(() => detectPose(net));
    }

    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }

    setupCamera().then(loadPosenetModel);
  }, []);

  return (
    <div>
      <h1>Pose Detection using PoseNet</h1>
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          style={{ position: 'absolute', top: 0, left: 0 }}
          autoPlay
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}