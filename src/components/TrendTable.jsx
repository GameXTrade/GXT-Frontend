import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



function createData(nr, server, index, img) {
  return { nr, server, index , img};
}


const rows = [
  createData(1, "seishin", 100, "https://seishin.xyz/images/icon.gif1"),
  createData(2, "Deine Mutteeer", 99,"https://ascension.rodnia.to/images/favicon.ico?v=4.7"),
  createData(3, "Deine Mutter 2", 50,"https://unitedmt2.com/favicon.ico"),
  createData(4, "Metin2.de", 25,"https://ascension.rodnia.to/images/favicon.ico?v=4.7"),
  createData(5, "Random Server", 10,""),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
      <Table aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell style={{ fontWeight:600, color:"grey"}}>#</TableCell>
            <TableCell align="left" style={{ fontWeight:600,color:"grey"}}>Server</TableCell>
            <Tooltip title={
                <React.Fragment>
                    <i>{"Certified Artist Assets:"}</i><br/><i>{"Usage of assets from verified artists."}</i>
                </React.Fragment>} 
                arrow placement="top"
                slotProps={{
                    popper: {
                        modifiers: [{
                            name: 'offset',
                            options: {
                                offset: [0, -24],
                            },
                        }],
                    },
                }}>
                <TableCell align="left" style={{ fontWeight:600,color:"#E6C1C1"}}>CAA-Index <InfoOutlinedIcon sx={{fontSize:16}}/></TableCell>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
                className='hover:bg-slate-100'
                key={row.nr}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // style={{height: "100px"}}
            >
             
                <TableCell align="left">{row.nr}</TableCell>
                <TableCell align="left">
                    <div className='flex'>
                        {row.img && (
                            <img style={{width:"21px", height:"21px"}} src={row.img} alt="" onError={(e) => { e.target.style.display = 'none'; }}/>
                        )}
                        {row.server}
                    </div>
                </TableCell>
                <TableCell align="left">{row.index}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}