function Table({ children }) {
  return (
    <div className="bg-neutral-200 text-black overflow-auto text-sm">
      <table className="w-full">{children}</table>
    </div>
  );
}

export default Table;

function TableHeader({ children }) {
  return (
    <thead>
      <tr className="bg-neutral-400">{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody className="text-center">{children}</tbody>;
}

function TableRow({ children }) {
  return (
    <tr className="border-b border-gray-700 last:border-none font-iranian-sans text-sm">
      {children}
    </tr>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
