"use client";

import { ResourceManager } from "@/components/admin/resource-manager";
import { eventsConfig } from "@/components/admin/resources";

export default function Page() {
  return <ResourceManager config={eventsConfig} />;
}
