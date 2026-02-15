export interface CSVColumn<T> {
  label: string;
  accessor: (row: T) => string | number | boolean | null | undefined;
}

function escapeCSV(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportToCSV<T>(
  data: T[],
  columns: CSVColumn<T>[],
  filename: string
): void {
  const header = columns.map((col) => escapeCSV(col.label)).join(',');
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const val = col.accessor(row);
        if (val === null || val === undefined) return '';
        return escapeCSV(String(val));
      })
      .join(',')
  );

  const csv = [header, ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
