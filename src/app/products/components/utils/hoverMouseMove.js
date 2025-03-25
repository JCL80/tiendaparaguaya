export function handle_zoom_mouse_move(e, containerRef) {
    var zoomer = containerRef.current;
    let bounds = containerRef.current.getBoundingClientRect()
  
    const x = (e.clientX - bounds.left)/zoomer.offsetWidth * 100
    const y = (e.clientY - bounds.top)/zoomer.offsetHeight * 100
    
    zoomer.style.backgroundPosition = x + '%' + y + '%'
  }