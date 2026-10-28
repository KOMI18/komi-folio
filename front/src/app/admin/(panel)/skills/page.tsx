"use client";

import { ResourceManager } from "@/components/admin/resource-manager";
import { skillsConfig } from "@/components/admin/resources";

export default function Page() {
  return <ResourceManager config={skillsConfig} />;
}
