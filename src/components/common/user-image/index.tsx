type UserImageProps = {
  src?: string;
  height: string;
  width: string;
  borderRadius?: string;
};

//TODO: On source image, add a default image if src is not provided
// Default image URL
const DEFAULT_IMAGE_URL = '/src/assets/default-avatar.png';

export const UserImage = ({
  src = DEFAULT_IMAGE_URL,
  height,
  width,
  borderRadius = '0.75',
}: UserImageProps) => {
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
      className="container relative mx-auto overflow-hidden -z-50"
      style={{
        height: `${height}rem`,
        width: `${width}rem`,
        borderRadius: `${borderRadius}rem`,
      }}
    >
      <img
        src={src}
        alt="User profile image"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
};
