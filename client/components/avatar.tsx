import NextImage from "next/image";
import { useEffect, useState } from "react";

type AvatarProps = {
  size: number;
  username: string;
  src?: string | null;
};

const Avatar = ({ size, src, username }: AvatarProps) => {
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => setImageReady(true);
    img.src = src;
  }, [src]);

  return imageReady ? (
    <NextImage
      src={src!}
      alt={username}
      width={size}
      height={size}
      className="dark:border-dark-secondary size-8 rounded-full border-2 border-white object-cover"
      title={username}
    />
  ) : (
    <div
      className="default-avatar"
      style={{ width: size, height: size }}
      title={username}
    >
      <span className="text-xs capitalize">{username.charAt(0)}</span>
    </div>
  );
};

export default Avatar;
