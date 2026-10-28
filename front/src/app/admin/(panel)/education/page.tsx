"use client";

import { ResourceManager } from "@/components/admin/resource-manager";
import { educationConfig } from "@/components/admin/resources";

export default function Page() {
  return <ResourceManager config={educationConfig} />;
}
