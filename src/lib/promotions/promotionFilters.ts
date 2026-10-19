import type {
  PromoHubCategoryFilterId,
  PromoHubCategoryId,
  PromoHubMobileCategoryFilterId,
  PromoHubMobileCategoryId,
} from "@/types/promotions";

/** กรองรายการโปรตามแท็บ desktop hub */
export function matchesPromoHubCategory(
  categories: PromoHubCategoryId[],
  filterId: PromoHubCategoryFilterId,
): boolean {
  if (filterId === "all") return true;
  return categories.includes(filterId);
}

/** กรองรายการโปรมือถือตามแท็บหมวด */
export function matchesPromoHubMobileCategory(
  categories: PromoHubMobileCategoryId[],
  filterId: PromoHubMobileCategoryFilterId,
): boolean {
  if (filterId === "all") return true;
  return categories.includes(filterId);
}
