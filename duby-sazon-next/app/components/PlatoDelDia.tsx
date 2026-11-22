
import { getMenuDelDia } from "@/app/actions/getMenu";

import PlatoDelDiaClient from "./PlatoDelDiaClient";

export default async function PlatoDelDia() {
  const result = await getMenuDelDia();

  const menu = result.success ? result.data : null;

  return (
    <PlatoDelDiaClient
      menu={menu}
      error={!result.success ? result.message : null}
    />
  );
}
