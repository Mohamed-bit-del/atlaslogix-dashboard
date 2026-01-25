import type { TableCompoundProps } from "../../types";

function Table({ children }: TableCompoundProps) {
    return (
        <table className="table-fixed w-full text-sm text-left">{children}</table>
    );
}

export default Table;

Table.header = function TableHeader({ children }: TableCompoundProps) {
    return (
        <thead>
            <tr className="bg-white border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">{children}</tr>
        </thead>
    );
};

Table.body = function TableBody({ children }: TableCompoundProps) {
    return <tbody className="divide-y divide-slate-100">{children}</tbody>;
};

Table.footer = function TableFooter({ children }: TableCompoundProps) {
    return (
        <tfoot>
            <tr>{children}</tr>
        </tfoot>
    );
};