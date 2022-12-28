export default function handleMouseCard(event) {
  const cardElement = event.currentTarget;

  if (event.type === 'mouseenter') {
    cardElement.classList.add('card--hover');
    cardElement.style = { transform: 'rotateY(0deg) rotateX(0deg)' };
  } if (event.type === 'mousemove') {
    cardElement.style.setProperty('--y', `${event.clientY / 10}% `);
    cardElement.style.setProperty('--x', `${event.clientX / 10}%`);
  } else if (event.type === 'mouseleave') {
    cardElement.classList.remove('card--hover');
  }
}
