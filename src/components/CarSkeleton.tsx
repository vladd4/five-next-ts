import React from "react";
import ContentLoader from "react-content-loader";

export default function CarSkeleton() {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 1100 300"
      backgroundColor="#a1a1a1"
      foregroundColor="#b0b0b0"
    >
      <rect x="0" y="263" rx="0" ry="0" width="600" height="17" />
      <rect x="0" y="295" rx="0" ry="0" width="350" height="17" />
      <rect x="0" y="338" rx="0" ry="0" width="83" height="15" />
      <rect x="0" y="9" rx="0" ry="0" width="1000" height="250" />
    </ContentLoader>
  );
}
