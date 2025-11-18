window.addEventListener("DOMContentLoaded", () => {
  const markers = document.querySelectorAll("a-nft");

  markers.forEach(marker => {
    marker.addEventListener("markerFound", () => {
      const children = marker.children;
      for (let c of children) c.setAttribute("visible", true);

      const video = marker.querySelector("a-video");
      if (video) video.components.material.material.map.image.play();
    });

    marker.addEventListener("markerLost", () => {
      const children = marker.children;
      for (let c of children) c.setAttribute("visible", false);

      const video = marker.querySelector("a-video");
      if (video) video.components.material.material.map.image.pause();
    });
  });
});
