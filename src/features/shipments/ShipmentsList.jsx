import { TableLayout } from "@/layouts/TableLayout";
import {
  useAddShipment,
  useDeleteShipment,
  usePaginateShipments,
  useUpdateShipment,
  useMultipleDeleteShipments,
} from "./useShipments";
import {
  Boxes,
  ChevronDown,
  Loader,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
} from "lucide-react";
import { Button, DropDown } from "@/components/ui";
import { CostumDropDown } from "../sheep/SheepList";
import { useSales } from "../sales/useSale";
import { useShippers } from "../users/useUser";
import { usePaginate } from "@/hooks/usePaginate";
import { SHIPMENT_STATUS } from "@/utils/constants";

export function ShipmentsList() {
  const { page, limit } = usePaginate();
  const { shipments, error, isLoading } = usePaginateShipments(page, limit);
  const { mutate: addShipment } = useAddShipment();
  const { mutate: updateShipment } = useUpdateShipment();
  const { mutate: deleteShipment } = useDeleteShipment();
  const { mutate: deleteMultipleShipment } = useMultipleDeleteShipments();

  return (
    <>
      <TableLayout
        data={shipments || []}
        isLoading={isLoading}
        error={error}
        resourceName="shipment"
        columns={[
          {
            key: "id",
            displayLabel: "Id",
            type: "number",
            visible: true,
          },
          {
            key: "phone",
            displayLabel: "Phone",
            type: "string",
            visible: true,
          },
          {
            key: "address",
            displayLabel: "Address",
            type: "string",
            visible: true,
          },
          {
            key: "status",
            displayLabel: "Status",
            type: "string",
            visible: true,
            format: (status) => <StatusBar status={status} />,
          },
          {
            key: "shippingDate",
            displayLabel: "Shipping Date",
            type: "date",
            visible: true,
          },
        ]}
        formFields={[
          {
            name: "phone",
            label: "Phone",
            type: "text",
            required: true,
          },
          {
            name: "address",
            label: "Address",
            type: "text",
            required: true,
          },
          {
            name: "shippingDate",
            label: "Shipping Date",
            type: "date",
            required: true,
          },
          {
            name: "status",
            required: true,
            customComponent: (
              <CostumDropDown dataName="status" data={SHIPMENT_STATUS} />
            ),
          },
          {
            name: "sale",
            required: true,
            customComponent: <SalesDropDown />,
          },
          {
            name: "shipper",
            required: true,
            customComponent: <ShippersDropDown />,
          },
        ]}
        defaultValues={{
          name: "",
          phone: "",
          address: "",
          status: "PENDING",
          shippingDate: "",
          sale: {},
        }}
        fieldsToSearch={["id", "address", "phone", "status"]}
        downloadOptions={{
          pdfFileName: "Shipments",
        }}
        onAdd={addShipment}
        onUpdate={updateShipment}
        onDelete={deleteShipment}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [def.edit, def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "shipment",
            onConfirm: (ids) => deleteMultipleShipment(ids),
          },
        }}
      />
    </>
  );
}
export const SalesDropDown = ({ setValue, getValue }) => {
  const { sales } = useSales();
  const pendingSales = sales?.filter(
    (sale) =>
      (!["DELIVERED", "CANCELLED"].includes(sale?.status?.toLowerCase()) &&
        sale?.shipment === null) ||
      sale?.id === getValue("sale")?.id
  );
  console.log(getValue("sale"));

  const selectedSale = getValue("sale") || null;
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Sale</p>
      <DropDown
        options={{
          className: "w-48 ",
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
              Sale ({selectedSale ? 1 : 0})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        {pendingSales?.map((e) => (
          <DropDown.Option
            onClick={() =>
              getValue("sale")?.id === e.id
                ? setValue("sale", null)
                : setValue("sale", e)
            }
            isCurrent={getValue("sale")?.id === e.id}
            key={e.id}
          >
            {e?.id} | {e?.name} | {e?.sheep.length} sheep
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};

export const ShippersDropDown = ({ setValue, getValue }) => {
  const { shippers, isLoading, error } = useShippers();
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Shipper</p>
      <DropDown
        options={{
          className: "w-48 ",
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
              Shipper ({getValue("shipper") ? 1 : 0})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        {isLoading && <Loader className=" animate-spin m-auto " />}
        {error && <p>{error}</p>}

        {shippers?.map((e) => (
          <DropDown.Option
            onClick={() =>
              getValue("shipper")?.id === e.id
                ? setValue("shipper", null)
                : setValue("shipper", e)
            }
            isCurrent={getValue("shipper")?.id === e.id}
            key={e.id}
          >
            {e?.username}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};

function StatusBar({ status }) {
  const icons = {
    pending: <Package size={16} />,
    shipped: <Boxes size={16} />,
    delivered: <PackageCheck size={16} />,
    cancelled: <PackageX size={16} />,
    returned: <PackageMinus size={16} />,
  };
  return (
    <div className={`${status.toLowerCase()} w-fit`}>
      <span className="me-2 ">{status}</span>
      {icons[status.toLowerCase()]}
    </div>
  );
}
