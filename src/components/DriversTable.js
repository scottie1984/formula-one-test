import { Image, Table } from "react-bootstrap";

function DriversTable({ data }) {
  return (
    <Table data-testid="drivers-table" striped bordered hover>
      <thead>
        <tr>
          <th>position</th>
          <th>name</th>
          <th>image</th>
          <th>number</th>
          <th>points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => {
          return (
            <tr key={`drivers-${i}`}>
              <td data-testid={`drivers-table-position-${i}`}>{r.position}</td>
              <td data-testid={`drivers-table-name-${i}`}>{r.driver.name}</td>
              <td data-testid={`drivers-table-image-${i}`}>
                <Image src={r.driver.image} thumbnail />
              </td>
              <td data-testid={`drivers-table-number-${i}`}>
                {r.driver.number}
              </td>
              <td data-testid={`drivers-table-points-${i}`}>{r.points}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default DriversTable;
