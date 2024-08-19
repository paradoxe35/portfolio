export function animate(
  el: HTMLElement,
  amplitude: number,
  speed = 150,
  maxAmplitude = 80,
) {
  let x = 0;
  let y = 0;
  let z = 0;
  let timeout: NodeJS.Timeout | null = null;

  const move = () => {
    const deltaX = Math.random() * amplitude * 2 - amplitude;
    const deltaY = Math.random() * amplitude * 2 - amplitude;
    const deltaZ = Math.random() * amplitude * 2 - amplitude;
    let delay = 30;
    if (
      Math.pow(x + deltaX, 2) +
        Math.pow(y + deltaY, 2) +
        Math.pow(z + deltaZ, 2) <
      Math.pow(maxAmplitude, 2)
    ) {
      x += deltaX;
      y += deltaY;
      z += deltaZ;
      delay =
        Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)) * speed;
      el.style.transitionDuration = delay + "ms";
      el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    timeout = setTimeout(move, delay);
  };
  move();

  return () => timeout && clearTimeout(timeout);
}
