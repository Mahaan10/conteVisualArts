function Table({ children }) {
  return (
    <div className="border border-gray-400/40 dark:border-grayish-violet/10 text-inherit overflow-auto text-sm rounded-xl">
      <table className="w-full min-w-[800px]">{children}</table>
    </div>
  );
}

export default Table;

function TableHeader({ children }) {
  return (
    <thead>
      <tr className="border-b border-gray-400/40 dark:border-grayish-violet/10">
        {children}
      </tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody className="text-center text-xs">{children}</tbody>;
}

function TableRow({ children }) {
  return (
    <tr className="border-b border-gray-400/40 dark:border-grayish-violet/10 last:border-none">
      {children}
    </tr>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
