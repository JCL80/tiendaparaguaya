export function imageZoomReact(imgRef, lensRef, resultRef) {
    const cx = resultRef.current.offsetWidth / lensRef.current.offsetWidth;
    const cy = resultRef.current.offsetHeight / lensRef.current.offsetHeight;
    resultRef.current.style.backgroundImage = `url('${imgRef.current.src}')`;
    resultRef.current.style.backgroundSize = `${imgRef.current.width * cx}px ${
      imgRef.current.height * cy
    }px`;
  
    function getCursorPos(e) {
      let x = 0;
      let y = 0;
      e = e || window.event;
      const a = imgRef.current.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
  
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
  
      return { x, y };
    }
    function moveLens(e) {
      let x;
      let y;
      const pos = getCursorPos(e);
      x = pos.x - lensRef.current.offsetWidth / 2;
      y = pos.y - lensRef.current.offsetHeight / 2;
      if (x > imgRef.current.offsetWidth - lensRef.current.offsetWidth) {
        x = imgRef.current.offsetWidth - lensRef.current.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > imgRef.current.offsetHeight - lensRef.current.offsetHeight) {
        y = imgRef.current.offsetHeight - lensRef.current.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      lensRef.current.style.left = `${x}px`;
      lensRef.current.style.top = `${y}px`;
      resultRef.current.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }
  
    lensRef.current.addEventListener('mousemove', moveLens);
    imgRef.current.addEventListener('mousemove', moveLens);
  }