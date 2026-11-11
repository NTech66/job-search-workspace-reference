import type { ExtensionManifest } from "./contracts";

// Empty by design: community packages must pass automated checks and owner review before registration.
const reviewedManifests: ExtensionManifest[] = [];

export function getApprovedExtensions(): ExtensionManifest[] {
  return reviewedManifests.filter((manifest) => manifest.reviewState === "approved");
}
