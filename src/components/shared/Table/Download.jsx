import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "../../ui";
import { useTable } from "./useTable";
import { ArrowDownToLine } from "lucide-react";

const exportAsPdf = ({ data, config, headers }) => {
  const { filename, tableHeaders } = config;
  const tableData = data.map((row) => Object.values(row));
  const doc = new jsPDF(headers.length > 4 ? "landscape" : "portrait");

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: "#f0f0f0", textColor: "#000000" },
    styles: { cellPadding: 3 },
  });
  doc.save(filename);
};

const cleanData = (data, columns) => {
  console.log(data);
  return (
    data
      // Filter the visible columns
      .map((el) =>
        Object.fromEntries(
          Object.entries(el).filter(([key]) =>
            columns.map((c) => c.key).includes(key)
          )
        )
      )
      // Sort the columns same as the headers
      .map((el) =>
        columns.reduce((acc, h) => {
          acc[h.key] = el[h.key];
          return acc;
        }, {})
      )
      // Format the columns that needs to be formatted
      .map((el) =>
        Object.keys(el).reduce((acc, k) => {
          const format = columns.find((h) => h.key === k).format; // value,id,isDownload
          acc[k] = format ? format(el[k], null, true) : el[k];
          return acc;
        }, {})
      )
  );
};

//* Download
export function Download() {
  const { rows, pdfConfig, columns, hiddenColumns, page } = useTable();

  const download = (downloadType, selectedRows = null) => {
    const headers = columns.filter(
      (c) => !hiddenColumns.includes(c.displayLabel)
    );
    const data = cleanData(selectedRows, headers);

    const options = { data, headers };

    if (downloadType === "pdf") exportAsPdf({ ...options, config: pdfConfig });
  };

  return (
    <Button
      onClick={() => download("pdf", rows, page)}
      display="with-icon"
      type="outline"
      color="tertiary"
    >
      <ArrowDownToLine size={18} /> Download
    </Button>
  );
}
