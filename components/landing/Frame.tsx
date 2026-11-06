import Image from "next/image";
import type { Pic } from "@/data/landing";

/**
 * An uncropped picture. The frame takes the image's own aspect ratio (next/image reserves it from the
 * static import), so nothing is ever cut. LandingMotion opens the frame with a clip-path and settles the
 * inner layer from a slight zoom to exactly 1, so at rest the whole image is visible.
 */
export default function Frame({
  pic,
  sizes,
  className,
  reveal = true,
  eager = false,
}: {
  pic: Pic;
  sizes: string;
  className?: string;
  reveal?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={"frame" + (className ? " " + className : "")} data-reveal={reveal ? "" : undefined}>
      <div className="frame-in">
        <Image
          src={pic.src}
          alt={pic.alt}
          sizes={sizes}
          placeholder="blur"
          loading={eager ? "eager" : "lazy"}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
