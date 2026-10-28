import { cacheLife } from "next/cache";

// Année mise en cache : recalculée au plus une fois par jour
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
