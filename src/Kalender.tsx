import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Rit } from './Rit';
import { KalenderItem } from './KalenderItem';
import { faFileDownload, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface Props {
  ritten: Rit[],
  kalender: KalenderItem[],
  showOnMapCallBack(gpx: string | undefined): void
}

let undefinedRitNummer = -1;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface Data {
  datum: Date;
  ritnummer: number;
  naam: string;
  afstand: number;
  hoogtemeters: number;
  vertrek: string;
  aankomst: string;
  bk: boolean;
  wk: boolean;
  gpx?: string;
}

function toData(kalenderItem: KalenderItem, ritten: Rit[]): Data {
  const rit = ritten.find(rit => rit.ritnummer === kalenderItem.ritNummer);
  if (rit) {
    return {
      datum: new Date(kalenderItem.datum),
      ritnummer: rit.ritnummer,
      naam: rit.naam,
      afstand: rit.afstand,
      hoogtemeters: rit.hoogtemeters,
      vertrek: rit.vertrek,
      aankomst: rit.finish,
      bk: kalenderItem.bk,
      wk: kalenderItem.wk,
      gpx: rit.gpx
    }
  } else {
    return {
      datum: new Date(kalenderItem.datum),
      ritnummer: undefinedRitNummer--,
      naam: "Rit niet gevonden",
      afstand: 0,
      hoogtemeters: 0,
      vertrek: "0h00",
      aankomst: "?",
      bk: false,
      wk: false
    }
  }
}

export default function SimpleTable(props: Props) {

  const classes = useStyles();
  const rows = props.kalender.map(item => toData(item, props.ritten));
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell align="right">Ritnummer</TableCell>
            <TableCell>Naam</TableCell>
            <TableCell align="right">Afstand&nbsp;(km)</TableCell>
            <TableCell align="right">Hoogtemeters&nbsp;(m)</TableCell>
            <TableCell align="right">Vertrekuur</TableCell>
            <TableCell>Aankomst</TableCell>
            <TableCell>Download GPX</TableCell>
            <TableCell>Kaart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => renderRow(row, props))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function renderRow(row: Data, properties: Props) {
  const buttonProperties = row.gpx ? { href: row.gpx } : { disabled: true };
  return (
    <TableRow key={row.ritnummer}>
      <TableCell>{`${row.datum.getDate()}/${row.datum.getMonth() + 1}/${row.datum.getFullYear()}`}</TableCell>
      <TableCell align="right">{row.ritnummer}</TableCell>
      <TableCell>{row.naam}{row.bk ? " (BK)" : ""}{row.wk ? " (WK)" : ""}</TableCell>
      <TableCell align="right">{row.afstand}</TableCell>
      <TableCell align="right">{row.hoogtemeters}</TableCell>
      <TableCell align="right">{row.vertrek}</TableCell>
      <TableCell>{row.aankomst}</TableCell>
      <TableCell>
        <Button size="small" color="primary" {...buttonProperties}>
          <FontAwesomeIcon icon={faFileDownload} />
        </Button>
      </TableCell>
      <TableCell>
        <Button size="small" color="primary" onClick={() => properties.showOnMapCallBack(row.gpx)} disabled={row.gpx === undefined}>
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </Button>
      </TableCell>
    </TableRow >
  );
}