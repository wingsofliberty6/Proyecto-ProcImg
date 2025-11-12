document.addEventListener('DOMContentLoaded', () => {
  const btnImage = document.getElementById('thumb-btn-img');
  const btnVideo = document.getElementById('thumb-btn-vid');
  const modal = document.getElementById('media-modal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.close-modal');

  if (btnImage) {
    btnImage.addEventListener('click', () => {
      const src = btnImage.dataset.src;
      modalBody.innerHTML = `<img src="${src}" alt="Imagen ampliada">`;
      modal.classList.remove('hidden');
    });
  }

  if (btnVideo) {
    btnVideo.addEventListener('click', () => {
      const src = btnVideo.dataset.src;
      modalBody.innerHTML = `
        <video src="${src}" controls autoplay style="max-width:100%; max-height:80vh; border-radius:10px;"></video>
      `;
      modal.classList.remove('hidden');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      modalBody.innerHTML = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modalBody.innerHTML = '';
      }
    });
  }
});
