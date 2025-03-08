import { useTable } from "./useTable";
import { Button, CheckBox, DropDown } from "../../ui";
import { ListChecks, Sheet } from "lucide-react";

export function View() {
  const { columns, hiddenColumns, onChangeView, data, isLoading, disabled } =
    useTable();

  if (!isLoading && data?.length === 0) return null;

  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <Sheet size={18} />
        </Button>
      }
      options={{
        className: "max-h-[300px] overflow-auto",
        shouldCloseOnClick: false,
      }}
      togglerDisabled={disabled}
    >
      <DropDown.Option
        onClick={() => onChangeView(null, true)}
        disabled={hiddenColumns.length === 0}
      >
        <ListChecks size={16} />
        Check All
      </DropDown.Option>
      <DropDown.Divider />

      {columns.map(({ displayLabel }) => {
        const disabled =
          !hiddenColumns.includes(displayLabel) &&
          columns.length === hiddenColumns.length + 1;

        return (
          <DropDown.Option
            key={displayLabel}
            className="justify-between"
            disabled={disabled}
          >
            {displayLabel}
            <CheckBox
              checked={!hiddenColumns.includes(displayLabel)}
              onChange={() => onChangeView(displayLabel)}
              disabled={disabled}
            />
          </DropDown.Option>
        );
      })}
    </DropDown>
  );
}
