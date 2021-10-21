import React, { useEffect, useState } from "react";
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

const createData = (rank, namePl, matchesWon, matchesLost, total, rating) => {
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
  const [filter, setFilter] = useState(1);
  const [r,setR] = useState(1); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [rows, setRows] = useState(leaderDataValue.map((ld, index) => createData(index + 1, ld.userName, ld.matchesWon, ld.matchesLost, ld.matchesPlayed, ld.rating.toFixed(2))));
  const handleChangeRowsPerPage = ( event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=> {
    var sortedData = leaderDataValue.sort((a,b)=> a.rating<b.rating?1:-1);
    var leaderboardData = sortedData.map((ld,index) => createData(index+1,ld.userName, ld.matchesWon, ld.matchesLost, ld.matchesPlayed, ld.rating.toFixed(2)));
    setRows(leaderboardData);
  },[leaderDataValue])

  useEffect(() => {
    dispatch(fetchLeaderBoardData());
    console.log(leaderDataValue);
  }, []);

  useEffect(() => {
    if(filter === 0){
      const sortByName = rows.sort((a,b) => a.namePl>b.namePl?1:-1);
      setRows(sortByName);
    } 
    else if(filter === 1){
      const sortByRating = rows.sort((a,b) => a.rank>b.rank?1:-1);
      setRows(sortByRating);
    }
    else if(filter === 2){
      const sortByWon = rows.sort((a,b) => a.matchesWon<b.matchesWon?1:-1);
      setRows(sortByWon);
    }
    else if(filter === 3){
      const sortByLost = rows.sort((a,b) => a.matchesLost<b.matchesLost?1:-1);
      setRows(sortByLost);
    }
  }, [filter])

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
              width={"17vw"}
              data={filterTable}
              onChange={(e) => { 
                console.log(rows);
                if(e.value === 0){
                  const sortByName = rows.sort((a,b) => a.namePl>b.namePl?1:-1);
                  setRows(sortByName);
                } 
                else if(e.value === 1){
                  const sortByRating = rows.sort((a,b) => a.rank>b.rank?1:-1);
                  setRows(sortByRating);
                }
                else if(e.value === 2){
                  const sortByWon = rows.sort((a,b) => a.matchesWon<b.matchesWon?1:-1);
                  setRows(sortByWon);
                }
                else if(e.value === 3){
                  const sortByLost = rows.sort((a,b) => a.matchesLost<b.matchesLost?1:-1);
                  setRows(sortByLost);
                }
                setFilter(e.value);
               }}
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
