// Generate the materials locally: no third-party image hosting or network requests.
export function createSurfaceTexture(THREE, colour, pattern = 'laminate') {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, 256, 256);

  if (pattern === 'wood') {
    for (let y = 0; y < 256; y += 3) {
      ctx.strokeStyle = `rgba(100, 57, 22, ${0.08 + (y % 7) * 0.012})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (let x = 0; x <= 256; x += 4) {
        const grainY = y + Math.sin(x / 45 + y / 19) * 2;
        if (x === 0) ctx.moveTo(x, grainY);
        else ctx.lineTo(x, grainY);
      }
      ctx.stroke();
    }
  } else if (pattern === 'edge') {
    // Alternating veneer layers on the exposed plywood edges.
    for (let y = 0; y < 256; y += 16) {
      ctx.fillStyle = '#aa8050';
      ctx.fillRect(0, y, 256, 5);
      ctx.fillStyle = '#e6c593';
      ctx.fillRect(0, y + 5, 256, 10);
      ctx.fillStyle = '#8c6743';
      ctx.fillRect(0, y + 15, 256, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
