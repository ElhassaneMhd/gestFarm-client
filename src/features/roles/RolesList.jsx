import { TableLayout } from "@/layouts/TableLayout";
import {
  useAddRole,
  usePaginateRoles,
  usePermissions,
  useUpdateRole,
} from "./useRole";
import { Button, CheckBox, DropDown } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { RULES } from "@/utils/constants";
import { usePaginate } from "../../hooks/usePaginate";

export function RolesList() {
  const { page, limit } = usePaginate();
  const { roles, error, isLoading } = usePaginateRoles(page, limit);
  const { mutate: addrole } = useAddRole();
  const { mutate: updateRole } = useUpdateRole();

  return (
    <>
      <TableLayout
        data={roles}
        isLoading={isLoading}
        error={error}
        resourceName="Role"
        columns={[
          {
            key: "name",
            displayLabel: "Name",
            type: "text",
            visible: true,
            format: (role) => role.slice(5).toLowerCase(),
          },
          {
            key: "users",
            displayLabel: "Users",
            type: "text",
            visible: true,
            format: (users) => users.length,
          },
          {
            key: "permissions",
            displayLabel: "Permissions",
            type: "text",
            visible: true,
            format: (permissions) => permissions.length,
          },
        ]}
        formFields={[
          {
            name: "name",
            label: "Role",
            type: "text",
            required: true,
            rules: { ...RULES.role },
          },
          {
            name: "permissions",
            required: true,
            customComponent: <PermissionsDropDown />,
          },
        ]}
        formDefaults={{
          name: "ROLE_",
          permissions: [],
        }}
        onAdd={addrole}
        onUpdate={updateRole}
        fieldsToSearch={["name"]}
        layoutOptions={{
          gridLayout: false,
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [def.edit],
        }}
      />
    </>
  );
}

const PermissionsDropDown = ({ getValue, setValue }) => {
  const { permissions } = usePermissions();
  const oldPermissions = getValue("permissions");

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Permission</p>
      <DropDown
        options={{
          className: "w-60",
          shouldCloseOnClick: false,
          disabled: true,
        }}
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
            disabled={true}
          >
            <span className="text-sm font-medium w-full text-start ">
              Permissions ({oldPermissions?.length})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        {permissions?.map((permission) => (
          <div key={permission.id} className="flex flex-col gap-1">
            <div className="flex  gap-1 text-text-tertiary p-1">
              <span className="w-full text-sm text-text-tertiary capitalize">
                {permission?.name.replace("_", " ").toLowerCase()}
              </span>
              <CheckBox
                checked={oldPermissions
                  ?.map((e) => e.id)
                  ?.includes(permission.id)}
                onChange={() => {
                  if (
                    oldPermissions?.map((e) => e.id)?.includes(permission.id)
                  ) {
                    setValue(
                      "permissions",
                      oldPermissions?.filter((s) => s.id !== permission.id)
                    );
                  } else {
                    setValue("permissions", [...oldPermissions, permission]);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </DropDown>
    </div>
  );
};
