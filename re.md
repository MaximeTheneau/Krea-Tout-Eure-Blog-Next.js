import React from 'react';

const ShareButton = () => {
  const shareToFacebook = () => {
    // Utilisez l'API de partage de Facebook pour partager le contenu
    // Vous pouvez trouver des informations sur l'utilisation de cette API sur le site de Facebook développeur
    // https://developers.facebook.com/docs/sharing
    http://www.facebook.com/sharer.php?u=https://krea-tout-eure.fr&t=krea-tout-eure
    http://twitter.com/share?url=krea-tout-eure.fr
  };

  return (
    <button onClick={shareToFacebook}>
      Partager sur Facebook
    </button>
  );
};