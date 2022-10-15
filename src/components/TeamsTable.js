import { Image, Table } from 'react-bootstrap';

function TeamsTable({ data }) {
    return (
        <Table data-testid="teams-table" striped bordered hover>
            <thead>
                <tr>
                <th>position</th>
                <th>name</th>
                <th>logo</th>
                <th>point</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((r, i) => {
                return (
                    <tr key={`teams-${i}`}>
                        <td data-testid={`teams-table-position-${i}`}>{r.position}</td>
                        <td data-testid={`teams-table-name-${i}`}>{r.team.name}</td>
                        <td data-testid={`teams-table-logo-${i}`}><Image src={r.team.logo} thumbnail /></td>
                        <td data-testid={`teams-table-points-${i}`}>{r.points}</td>
                    </tr>
                )
                })
            } 
            </tbody>  
        </Table>
    )
} 

export default TeamsTable;