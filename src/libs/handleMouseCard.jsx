export default function handleMouseCard(event){
    const cardElement = event.currentTarget;
    const cardElementMouse = Math.abs(Math.floor(event.clientY / event.clientX * 10));
    
    
    if (event.type === 'mouseenter') {
      event.currentTarget.classList.add('card--hover');
      event.currentTarget.style = { 'transform': 'rotateY(0deg) rotateX(0deg)'}
    } if(event.type === 'mousemove') {
      cardElement.style.setProperty('--y', `${event.clientY / 10}% `);
      const addStyle = { '--y': `${event.clientY / 10}%`, '--x': `${event.clientX / 10}%` };
      cardElement.style.setProperty('--x', `${event.clientX / 10}%`);
    }
      else if (event.type === 'mouseleave') {
      event.currentTarget.classList.remove('card--hover');
    }
    console.log(cardElementMouse);
};