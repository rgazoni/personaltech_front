
const DEFAULT_IMAGE_URL = '/src/assets/default-avatar.png';

export const AvatarProfileImg = ({ src, alt, size = 32 }: { src: string, alt: string, size: number }) => {

  if (!src) {
    src = DEFAULT_IMAGE_URL;
  } else {
    // Check if the src is a base64 image
    if (!src.startsWith('data:image/jpeg;base64')) {
      const base64Image = "data:image/jpeg;base64," + src;
      src = base64Image;
    }
  }

  return (
    <div
      className="rounded-full overflow-hidden"
      style={{ width: size + 'px', height: size + 'px' }}
    >
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
}
