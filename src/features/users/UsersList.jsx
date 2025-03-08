import {
  useDeleteUser,
  useMultipleDeleteUsers,
  usePaginateUsers,
} from "./useUser";
import { TableLayout } from "@/layouts/TableLayout";
import { usePaginate } from "@/hooks/usePaginate";

export default function UsersList() {
  const { page, limit } = usePaginate();
  const { users, error, isLoading } = usePaginateUsers(page, limit);
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: multipledeleteUsers } = useMultipleDeleteUsers();
  return (
    <>
      <TableLayout
        data={users || []}
        isLoading={isLoading}
        error={error}
        resourceName="User"
        columns={[
          {
            key: "id",
            displayLabel: "ID",
            type: "number",
            visible: true,
          },
          {
            key: "username",
            displayLabel: "Username",
            type: "string",
            visible: true,
          },
          {
            key: "email",
            displayLabel: "Email",
            type: "string",
            visible: true,
          },
          {
            key: "role",
            displayLabel: "Role",
            type: "string",
            visible: true,
            format: (role) => (
              <span className=" capitalize">{role.slice(5).toLowerCase()}</span>
            ),
          },
        ]}
        fieldsToSearch={["username", "email"]}
        downloadOptions={{
          pdfFileName: "Users",
        }}
        onDelete={deleteUser}
        layoutOptions={{
          displayNewRecord: false,
          displayTableRecord: false,
          actions: (def) => [def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "user",
            onConfirm: (ids) => multipledeleteUsers(ids),
          },
        }}
      />
    </>
  );
}
