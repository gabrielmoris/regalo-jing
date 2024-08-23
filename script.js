function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|android|blackberry|windows phone|opera mini/.test(
    userAgent
  );
}

function handleOrientation(event) {
  const beta = event.beta;
  const gamma = event.gamma;

  const tiltX = Math.max(-30, Math.min(30, gamma));
  const tiltY = Math.max(-30, Math.min(30, beta));

  const div = document.getElementById("tiltable-ticket");
  const rect = div.getBoundingClientRect();

  const shadowX = Math.abs(tiltX);
  const shadowY = Math.abs(tiltY);
  const shadowBlur = Math.abs(shadowX) + Math.abs(shadowY) * 3;
  const shineX = ((tiltX - rect.left) / rect.width) * 100;

  div.style.transform = `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
  div.style.background = `linear-gradient(${shineX}deg, #deabb4 0%, #ffffff90 55%, #ffffff90 50%, #ffffff90 75%, #deabb4 100%)`;
  div.style.boxShadow = `
    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3),
    ${-shadowX}px ${shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.3)
  `;
}

function handleMouseMove(event) {
  const div = document.getElementById("tiltable-ticket");
  const rect = div.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const tiltX = ((mouseX - centerX) / (rect.width / 2)) * 30;
  const tiltY = ((mouseY - centerY) / (rect.height / 2)) * -30;

  const shadowX = (mouseX - centerX) / 10;
  const shadowY = (mouseY - centerY) / 10;
  const shadowBlur = Math.abs(shadowX * 2) + Math.abs(shadowY * 2);

  const shineX = ((mouseX - rect.left) / rect.width) * 100;

  div.style.transform = `rotateY(${-tiltX}deg) rotateX(${tiltY}deg)`;
  div.style.background = `linear-gradient(${shineX}deg, #deabb4 0%, #ffffff90 55%, #ffffff90 50%, #ffffff90 75%, #deabb4 100%)`;

  div.style.boxShadow = `
  ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3),
   ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.3)
`;
}

// Initialize the function
if (isMobile()) {
  if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      // For iOS 13+ devices
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // For non iOS 13+ devices
      window.addEventListener("deviceorientation", handleOrientation);
    }
  } else {
    console.log("Device orientation not supported");
  }
} else {
  const div = document.getElementById("tiltable-ticket");

  div.addEventListener("mousemove", handleMouseMove);

  div.addEventListener("mouseleave", () => {
    div.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}
