import { Upload } from "lucide-react";
import { Button } from ".";
import { ErrorTooltip } from "./InputField";
import { useUploadFile } from "../../hooks/useUploadFile";

export function File({
  type,
  file: { name, size } = {},
  onChange,
  image,
  options = {},
}) {
  const { openFilePicker } = useUploadFile({
    onChange,
    options: {
      type,
      ...options,
    },
  });

  return (
    <div className="flex items-center gap-3 rounded-lg  px-3 py-1 bg-background-secondary">
      <div className="relative h-12 w-12">
        {image ? (
          <img
            key={"image"}
            src={image}
            alt={"image"}
            className={`absolute transition-transform duration-500 ${
              image ? "scale-100" : "scale-0"
            }`}
          />
        ) : (
          <img
            src={`/images/add.png`}
            alt="add"
            className={`absolute transition-transform duration-500 ${
              name ? "scale-0" : "scale-100"
            }`}
          />
        )}
      </div>
      <div className="flex-1 space-y-0.5">
        <h4 className="flex items-center gap-2 text-sm font-medium text-text-primary">
          {name || type}
          {!name && <ErrorTooltip message={`${type} is required`} />}
        </h4>
        <span className="text-xs text-text-secondary">
          {name
            ? "Already Provided"
            : size
            ? size / 1024 / 1024 < 1
              ? `${(size / 1024).toFixed(2)} KB`
              : `${(size / 1024 / 1024).toFixed(2)} MB`
            : "No file uploaded"}{" "}
        </span>
      </div>
      <div className="flex gap-1.5">
        <Button
          onClick={openFilePicker}
          shape="icon"
          color="secondary"
          size="small"
        >
          <Upload />
        </Button>
      </div>
    </div>
  );
}

export function FileUploader({ resource, getValue, setValue }) {
  const { upload } = useUploadFile({});

  const handlChange = async (e) => {
    const data = await upload(e.file);
    if (data.url) {
      setValue("image", data.url);
      setValue(resource);
    }
  };
  return (
    <div>
      <span className="text-sm font-medium text-text-tertiary">Image</span>
      <div className="border border-border h-min rounded-lg mt-0.5">
        <File
          key={resource}
          type={resource}
          file={getValue(resource)?.file || {}}
          image={getValue("image") || null}
          onChange={handlChange}
        />
      </div>
    </div>
  );
}
