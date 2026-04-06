import { galleryImages } from '../data/siteData';

export default function PhotoMosaic({ variant = 'friend' }) {
  const className = variant === 'lover' ? 'photo-mosaic photo-mosaic-lover' : 'photo-mosaic';

  return (
    <div className={className}>
      {galleryImages.slice(0, 5).map((image, index) => (
        <figure key={image.alt} className={`mosaic-card mosaic-card-${index + 1}`}>
          <img src={image.src} alt={image.alt} />
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
