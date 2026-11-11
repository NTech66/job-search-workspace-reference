import { ExtensionsCatalogPage } from "@/components/extensions-catalog-page";
import { configuredBoardSummary } from "@/lib/extensions/search";

export const dynamic = "force-dynamic";

export default function ExtensionsPage() {
  return <ExtensionsCatalogPage configured={configuredBoardSummary()} />;
}
