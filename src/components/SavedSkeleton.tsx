import React from "react";
import ContentLoader from "react-content-loader";

const SavedSkeleton = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={"auto"}
    viewBox="0 0 950 25"
    backgroundColor="#e6e6e6"
    foregroundColor="#d6d6d6"
  >
    <rect x="5" y="10" rx="0" ry="0" width="950" height="20" />
  </ContentLoader>
);

export default SavedSkeleton;
