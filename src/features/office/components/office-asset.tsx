import Image from "next/image";

import { getOfficeAsset } from "@/features/office/assets/office-assets";

type OfficeAssetProps = {
  assetId: string;
  className?: string;
};

export function OfficeAsset({ assetId, className }: OfficeAssetProps) {
  const asset = getOfficeAsset(assetId);

  if (!asset) {
    return null;
  }

  return (
    <Image
      alt={asset.name}
      className={["pixel-art-image object-contain", className ?? ""].join(
        " ",
      )}
      height={asset.height}
      src={asset.src}
      unoptimized
      width={asset.width}
    />
  );
}
