// SparkleOverlay.js
import PropType from "prop-types";
import { useIsMobile } from "../utils/tools";
import { useRef, useEffect } from "react";

const SparkleOverlay = ({ baseImageUrl, isTwinkling }) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef(null);
  const sparklesRef = useRef([]); // To store our sparkles
  const canvasWidth = isMobile ? 150 : 250;
  const canvasHeight = isMobile ? 150 : 250;

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Define a sparkle object
    const createSparkle = (x, y, size) => {
      return {
        x,
        y,
        size,
        opacity: Math.random(),
        opacityDirection: Math.random() > 0.5 ? "increasing" : "decreasing",
      };
    };

    // Function to draw a sparkle
    const drawSparkle = (sparkle) => {
      ctx.strokeStyle = `rgba(255, 255, 255, ${sparkle.opacity})`;
      ctx.beginPath();
      ctx.moveTo(sparkle.x, sparkle.y - sparkle.size / 2);
      ctx.lineTo(sparkle.x, sparkle.y + sparkle.size / 2);
      ctx.moveTo(sparkle.x - sparkle.size / 2, sparkle.y);
      ctx.lineTo(sparkle.x + sparkle.size / 2, sparkle.y);
      ctx.stroke();
      // Diagonal Lines for 8-point star effect
      const offset = sparkle.size * Math.random() * 0.2;

      ctx.beginPath();
      ctx.moveTo(sparkle.x - offset, sparkle.y - offset);
      ctx.lineTo(sparkle.x + offset, sparkle.y + offset);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(sparkle.x + offset, sparkle.y - offset);
      ctx.lineTo(sparkle.x - offset, sparkle.y + offset);
      ctx.stroke();
    };

    if (isTwinkling) {
      // Generate the sparkles
      sparklesRef.current = Array.from({ length: 33 }).map(() => {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * (canvasHeight - 10) + 10; // Buffer zone
        const size = Math.random() * 10 + 5;
        return createSparkle(x, y, size);
      });
    } else {
      sparklesRef.current = [];
    }

    const baseImage = new Image();
    baseImage.src = baseImageUrl;
    baseImage.onload = () => {
      const animate = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas
        ctx.drawImage(baseImage, 0, 0, canvasWidth, canvasHeight); // Draw base image
        if (!isTwinkling) {
          requestAnimationFrame(animate); // Call animate function again
          return;
        }
        // Draw and update each sparkle
        sparklesRef.current.forEach((sparkle) => {
          drawSparkle(sparkle);

          // Update sparkle opacity for the twinkling effect
          if (sparkle.opacityDirection === "increasing") {
            sparkle.opacity += 0.02;
            if (sparkle.opacity >= 1) {
              sparkle.opacityDirection = "decreasing";
            }
          } else {
            sparkle.opacity -= 0.02;
            if (sparkle.opacity <= 0.1) {
              sparkle.opacityDirection = "increasing";
            }
          }
        });

        requestAnimationFrame(animate); // Call animate function again
      };

      animate();
    };
  }, [baseImageUrl]);

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
  );
};

SparkleOverlay.propTypes = {
  baseImageUrl: PropType.string.isRequired,
  isTwinkling: PropType.bool.isRequired,
};

export default SparkleOverlay;
