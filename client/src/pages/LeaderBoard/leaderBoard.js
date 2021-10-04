import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderBoardData } from "../../actions/index";
import './styles.css';
import ReactSelect from '../../components/ReactSelect/ReactSelect';
import { filterTable } from '../../utils/constantData/constantData';

const columns = [
  { id: "rank", label: "Rank", minWidth: 170 },
  { id: "namePl", label: "Name", minWidth: 100 },
  {
    id: "matchesWon",
    label: "Matches Won",
    minWidth: 170,
    align: "center",
  },
  {
    id: "matchesLost",
    label: "Matches Lost",
    minWidth: 170,
    align: "center",
  },
  {
    id: "total",
    label: "Total Matches",
    minWidth: 170,
    align: "center",
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 170,
    align: "center",
  },
];

const createData= (rank,namePl,matchesWon,matchesLost,total,rating)=>{
  return {
    rank,
    namePl,
    matchesWon,
    matchesLost,
    total,
    rating, 
  }
}



export default function LeaderBoard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const leaderDataValue = useSelector((state) => state.leaderBoardDataSet);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
const rows =leaderDataValue.map((ld,index)=>createData(index+1,ld.userName,ld.matchesWon,ld.matchesLost,ld.matchesPlayed,ld.rating))
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchLeaderBoardData());
    console.log(leaderDataValue);
  }, []);

  return (
    <>
      <Paper
        className="leaderboardPaper"
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <div className="tableHeading">
          <h2>Bingo Leaderboard</h2>
          <div className="tableDrop">
            <ReactSelect
              placeholder={"Filter Table"}
              height={"5vh"}
              width={"15vw"}
              data={filterTable}
              backgroundColor={"rgb(103, 58, 183)"}
            />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 460 }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: "20px",
                      fontFamily: "lithospro_black",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{
                              fontSize: "17px",
                              fontFamily: "Cursive",
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
