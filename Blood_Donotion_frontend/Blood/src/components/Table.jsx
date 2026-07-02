function Table({ headers, data, renderRow }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-red-600 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map(renderRow)
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-gray-500"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;