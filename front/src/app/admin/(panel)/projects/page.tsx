"use client";

import { ResourceManager } from "@/components/admin/resource-manager";
import { projectsConfig } from "@/components/admin/resources";

export default function Page() {
  return <ResourceManager config={projectsConfig} />;
}
