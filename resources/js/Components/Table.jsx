import React from 'react';

const Table = ({ className = '', children }) => {
    return (
        <div className={`overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700`}>
            <table className={`table dark:bg-gray-800 ${className}`}>
                {children}
            </table>
        </div>
    );
};

const TableHeader = ({ className = '', children }) => {
    return (
        <thead className={`text-gray-600 text-sm bg-gray-100 dark:bg-gray-900 rounded-t-lg ${className}`}>
            {children}
        </thead>
    );
};

const TableBody = ({ className = '', children }) => {
    return (
        <tbody className={`rounded-b-lg ${className}`}>
            {children}
        </tbody>
    );
};

const TableRow = ({ className = '', children }) => {
    return (
        <tr className={`border-b border-gray-300 dark:border-gray-700${className}`}>
            {children}
        </tr>
    );
};

const TableCell = ({ className = '', children }) => {
    return (
        <td className={`py-3 px-4 text-gray-900 dark:text-gray-200 ${className}`}>
            {children}
        </td>
    );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
