import { UserRole } from "./types";

const permissions: Record<UserRole, string[]> = {
  admin: ["*"],
  compliance_manager: ["frameworks:read", "frameworks:write", "policies:write", "risks:write", "evidence:write", "vendors:write"],
  auditor: ["frameworks:read", "policies:read", "risks:read", "evidence:read", "audit:read"],
  viewer: ["frameworks:read", "policies:read", "dashboard:read"]
};

export function hasPermission(role: UserRole, action: string) {
  return permissions[role]?.includes("*") || permissions[role]?.includes(action);
}
