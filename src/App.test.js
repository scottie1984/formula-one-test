import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import nock from 'nock';

nock('http://localhost')
    .persist()
    .get('/api/seasons')
    .reply(200, {
        response: ['2001', '2002'],
    });

nock('http://localhost')
    .persist()
    .get('/api/rankings/drivers')
    .query({season : 2001})
    .reply(200, {
        response: [
          { position: 1, driver: { name: 'Stephen Scott', number: 10 }, points: 44 }
        ],
    });

nock('http://localhost')
    .persist()
    .get('/api/rankings/teams')
    .query({season : 2001})
    .reply(200, {
        response: [
          { position: 1, team: { name: 'Audi' }, points: 6 }
        ],
    });

test('should display the list of seasons', async () => {
  render(<App />);

  await waitFor(() => {
    const seasonBtn2001 = screen.getByTestId("season-button-2001");
    const seasonBtn2002 = screen.getByTestId("season-button-2002");

    expect(seasonBtn2001).toBeInTheDocument();
    expect(seasonBtn2002).toBeInTheDocument();
  })
});

test('clicking season should display drivers rankings by default', async () => {
  render(<App />);
  
  await waitFor(() => {
    const seasonBtn2001 = screen.getByTestId("season-button-2001");
    fireEvent.click(seasonBtn2001)

    const season2001 = screen.getByText("Rankings for season 2001");
    const driversTable = screen.getByTestId("drivers-table");
    expect(season2001).toBeInTheDocument();
    expect(driversTable).toBeInTheDocument();
  });
});

test('clicking season should display drivers position, name, image, number and points', async () => {
  render(<App />);

  await waitFor(() => {
    const seasonBtn2001 = screen.getByTestId("season-button-2001");
    fireEvent.click(seasonBtn2001)
    
    const driversTablePosition0 = screen.getByTestId("drivers-table-position-0");
    const driversTableName0 = screen.getByTestId("drivers-table-name-0");
    const driversTableImage0 = screen.getByTestId("drivers-table-image-0");
    const driversTableNumber0 = screen.getByTestId("drivers-table-number-0");
    const driversTablePoints0 = screen.getByTestId("drivers-table-points-0");

    expect(driversTablePosition0.textContent).toBe("1");
    expect(driversTableName0.textContent).toBe("Stephen Scott");
    expect(driversTableImage0).toBeInTheDocument();;
    expect(driversTableNumber0.textContent).toBe("10");
    expect(driversTablePoints0.textContent).toBe("44");
  });
});

test('clicking toggle switch should switch to teams rankings', async () => {
  render(<App />);

  await waitFor(() => {
    const seasonBtn2001 = screen.getByTestId("season-button-2001");
    fireEvent.click(seasonBtn2001)

    const teamsBtnSwitch = screen.getByTestId("teams-button");
    fireEvent.click(teamsBtnSwitch)
    
    const season2001 = screen.getByText("Rankings for season 2001");
    const teamsTable = screen.getByTestId("teams-table");
    expect(season2001).toBeInTheDocument();
    expect(teamsTable).toBeInTheDocument();
  });
});

test('teams table should show position, name, logo, points', async () => {
  render(<App />);

  await waitFor(() => {
    const seasonBtn2001 = screen.getByTestId("season-button-2001");
    fireEvent.click(seasonBtn2001)

    const teamsBtnSwitch = screen.getByTestId("teams-button");
    fireEvent.click(teamsBtnSwitch)

    // //await the change
    // const season2001 = await screen.findByText("Rankings for season 2001");
    // const teamsTable = await screen.getByTestId("teams-table");
    
    const teamsTablePosition0 = screen.getByTestId("teams-table-position-0");
    const teamsTableName0 = screen.getByTestId("teams-table-name-0");
    const teamsTableLogo0 = screen.getByTestId("teams-table-logo-0");
    const teamsTablePoints0 = screen.getByTestId("teams-table-points-0");

    expect(teamsTablePosition0.textContent).toBe("1");
    expect(teamsTableName0.textContent).toBe("Audi");
    expect(teamsTableLogo0).toBeInTheDocument();;
    expect(teamsTablePoints0.textContent).toBe("6");
  });
});