import { useEditPersonalContext } from "@/providers/edit-personal-page-provider";
import { Camera } from "lucide-react";
import { useState } from "react";
import imageCompression from 'browser-image-compression';

type UserImageProps = {
  src?: string;
  height: string;
  width: string;
  borderRadius?: string;
};

// Default image URL
const DEFAULT_IMAGE_URL = '/src/assets/default-avatar.png';

export const UserEditImage = ({
  src = DEFAULT_IMAGE_URL,
  height,
  width,
  borderRadius = '0.75',
}: UserImageProps) => {

  if (src === '') {
    src = DEFAULT_IMAGE_URL;
  } else {
    // Check if the src is a base64 image
    if (!src.startsWith('data:image/jpeg;base64')) {
      const base64Image = "data:image/jpeg;base64," + src;
      src = base64Image;
    }
  }

  const [_, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);



  const { dispatch } = useEditPersonalContext();

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Set the compression options
        const options = {
          maxSizeMB: 1, // Set the max size to 1 MB
          maxWidthOrHeight: 600, // Limit the image size
          useWebWorker: true,
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);
        console.log('Compressed file:', compressedFile);
        console.log('Original file:', file);

        setAvatar(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          dispatch({
            type: 'update-avatar',
            payload: {
              avatar: reader.result as string,
              avatarFile: compressedFile
            },
          });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div>
      <div
        className="container relative mx-auto overflow-hidden"
        style={{
          height: `${height}rem`,
          width: `${width}rem`,
          borderRadius: `${borderRadius}rem`,
        }}
      >
        {preview ? (
          <img
            src={preview as string}
            alt="User profile image"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <img
            src={src}
            alt="User profile image"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute bottom-1 left-1 rounded-full bg-white p-1 cursor-pointer flex items-center" onClick={handleClick} >
          <Camera size={16} />
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

