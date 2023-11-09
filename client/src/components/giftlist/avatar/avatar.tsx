import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AvatarProps {
  img?: string;
  imgAlt?: string;
  fallback?: string;
}

const GAvatar: React.FC<AvatarProps> = ({ img, imgAlt, fallback }) => {
  return (
    <Avatar>
      {img && imgAlt && <AvatarImage src={img} alt={imgAlt} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default GAvatar;
