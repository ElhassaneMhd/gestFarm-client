import {
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
  useMultipleDeleteCategory,
  usePaginateCategories,
} from "./useCategory";
import { TableLayout } from "@/layouts/TableLayout";
import { FileUploader } from "@/components/ui/File";
import { usePaginate } from "../../hooks/usePaginate";

export function CategoriesList() {
  const { page, limit } = usePaginate();
  const { categories, isLoading, error } = usePaginateCategories(page, limit);
  const { mutate: addCategory } = useAddCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: multipleDelete } = useMultipleDeleteCategory();

  return (
    <>
      <TableLayout
        data={categories || []}
        isLoading={isLoading}
        error={error}
        resourceName="Categories"
        columns={[
          {
            key: "name",
            displayLabel: "Name",
            type: "string",
            visible: true,
          },
          {
            key: "price",
            displayLabel: "Price (Dh/kg)",
            type: "number",
            visible: true,
          },
          {
            key: "description",
            displayLabel: "Description",
            type: "text",
            visible: true,
            format: (d) => (d?.length > 15 ? d.slice(0, 15) + "..." : d),
          },
          {
            key: "sheep",
            displayLabel: "Total",
            type: "text",
            visible: true,
            format: (sheep) => sheep.length,
          },
          {
            key: "image",
            displayLabel: "Image",
            visible: true,
            format: (image) => (
              <div className=" w-10">
                <img src={image} alt={"category image"} />
              </div>
            ),
          },
          {
            key: "sheep",
            displayLabel: "Sheep",
            visible: true,
            format: (sheep) => <CategorySheepStatus sheep={sheep} />,
          },
        ]}
        formFields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
          },
          {
            name: "price",
            label: "Price (Dh/Kg)",
            type: "number",
            required: true,
            min: 0,
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
            required: true,
            placeholder: "Enter category description ...",
            rows: "5",
          },

          {
            name: "image",
            label: "Image",
            type: "image",
            required: true,
            customComponent: <FileUploader resource={"Category image"} />,
          },
        ]}
        fieldsToSearch={["name"]}
        downloadOptions={{
          pdfFileName: "Categories",
        }}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [def.edit, def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "Categories",
            onConfirm: (ids) => multipleDelete(ids),
          },
        }}
      />
    </>
  );
}

function CategorySheepStatus({ sheep }) {
  let reserved = 0;
  let totalSheep = sheep.length;
  let availableSheep = 0;
  let soldSheep = 0;
  sheep.forEach((sheep) => {
    if (sheep.status === "Sold") soldSheep += 1;
    if (sheep.status === "Reserved") reserved += 1;
  });
  availableSheep = totalSheep - soldSheep - reserved;

  return (
    <div className="flex items-center">
      <span className="pending rounded-r-none bg-[#e5f5e0] text-green-600 ">
        {availableSheep} Available
      </span>
      <span className="pending rounded-none text-blue-700 bg-blue-200">
        {soldSheep} Sold
      </span>
      <span className="pending  rounded-l-none"> {reserved} Reserved</span>
    </div>
  );
}
