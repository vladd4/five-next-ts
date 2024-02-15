import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkeleton = () => (
  <ContentLoader
    speed={2}
    width={"94%"}
    height={"auto"}
    viewBox="0 0 900 435"
    backgroundColor="#ededed"
    foregroundColor="#d6d6d6"
  >
    <rect x="5" y="20" rx="0" ry="0" width="890" height="390" />
  </ContentLoader>
);

export default ProfileSkeleton;
