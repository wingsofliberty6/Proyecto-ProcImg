function setARVisibility(marker, isVisible) { 
  // Usa el marcador pasado como argumento para seleccionar SOLO su contenido
  const elements = marker.querySelectorAll('a-entity, a-plane, a-video, a-image'); 
  elements.forEach(el => {
    if (isVisible) {

      el.setAttribute('visible', true);
      el.emit('showContent'); 
    } else {

      el.emit('showContent', null, false); 
      // Dispara la animación en reversa
      setTimeout(() => {
          if (!marker.isMarkerVisible) {
              el.setAttribute('visible', false); 
          }
      }, 700);
    }
  });

  const videoPlayer = marker.querySelector('a-video');
  if (videoPlayer) {

    const videoElement = videoPlayer.getObject3D('mesh').material.map.image; 
    if (videoElement) {
      if (isVisible) {
        if (videoElement.paused) {

          videoElement.play().catch(e => 
          console.error(`Error al iniciar reproducción en
          ${marker.id}:`, e));
        }
      } else {
        if (!videoElement.paused) {

          videoElement.pause();
          videoElement.currentTime = 0; 
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const almMarker = document.getElementById('Alm-Marker');
  const argMarker = document.getElementById('Arg-Marker');
  const canMarker = document.getElementById('Can-Marker');
  const japMarker = document.getElementById('Jap-Marker');
  const mexMarker = document.getElementById('Mex-Marker');

  const nftMarkers = [
    almMarker, 
    argMarker, 
    canMarker, 
    japMarker, 
    mexMarker]
  .filter(m => m);

  const filterBtn = document.getElementById('filter-btn');
  const filterOverlay = document.getElementById('filter-overlay');

  // LÓGICA DE FILTROS
  const filterClasses = [
      '',                 // 0: Sin filtro
      'filter-cold',      // 1: Tono frío
      'filter-warm',      // 2: Tono cálido
      //'filter-grayscale' // Si logras aplicarlo al body/main
  ];
  let currentFilterIndex = 0;

  if (filterBtn && filterOverlay) {
      filterBtn.addEventListener('click', () => {

        const currentFilterClass = filterClasses[currentFilterIndex];
        // 1. Quitar la clase actual
        if (currentFilterClass) { filterOverlay.classList.remove(currentFilterClass); }
        // 2. Mover al siguiente índice (y volver a 0 al final)
        currentFilterIndex = (currentFilterIndex + 1) % filterClasses.length;
        // 3. Aplicar la nueva clase
        const newFilterClass = filterClasses[currentFilterIndex];
        if (newFilterClass) { filterOverlay.classList.add(newFilterClass); }
        filterBtn.textContent = `🎨 Filtro: ${newFilterClass || 'Ninguno'}`;
      });
  } else {

    console.warn("Falta el botón de filtro o la capa de superposición en el DOM.");
  }

  // INICIALIZACIÓN DE CADA MARCADOR
  nftMarkers.forEach(marker => {
    if (!marker) return;
    marker.isMarkerVisible = false;
    marker.addEventListener('markerFound', () => {

      console.log(`✅ Marcador ${marker.id} detectado.`);
      marker.isMarkerVisible = true;
      setARVisibility(marker, true); // Pasar el marcador actual
    });
    marker.addEventListener('markerLost', () => {

      console.log(`❌ Marcador ${marker.id} perdido.`);
      marker.isMarkerVisible = false; // Actualiza el estado
      setARVisibility(marker, false); // Pasar el marcador actual
    });
  });
});