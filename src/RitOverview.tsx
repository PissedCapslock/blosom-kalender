import React from 'react';
import { Rit } from './Rit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faMountain, faRoute, faClock, faMapMarkedAlt, faFlagCheckered, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { KalenderItem } from './KalenderItem';
import Switch from '@material-ui/core/Switch';

export interface Props {
    ritten: Rit[],
    kalender: KalenderItem[],
    showOnMapCallBack(gpx: string | undefined): void
}

const useStyles = makeStyles({
    card: {
        maxWidth: 300,
    },
    media: {
        height: 256,
    },
});



export default function RitOverview(props: Props) {
    const [state, setState] = React.useState({
        sortOnDate: false
    });

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [name]: event.target.checked });
    };

    const classes = useStyles();
    const ritten = props.ritten.slice(0)
        .sort(state.sortOnDate ? (a: Rit, b: Rit) => toDateNumber(a, props) - toDateNumber(b, props) : (a: Rit, b: Rit) => a.ritnummer - b.ritnummer);

    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center">
                <div>
                    Sorteer op ritnummer
                <Switch checked={state.sortOnDate}
                        onChange={handleChange('sortOnDate')}
                        value="Sorteer op geplande datum"
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }} />
                    Sorteer op datum
            </div>
            </Grid>

            <Grid container spacing={3}>
                {ritten.map((r, index) => {
                    return <Grid item xs key={r.ritnummer}><Paper>{renderRit(props, r, classes)}</Paper></Grid>
                })}
            </Grid>
        </div>
    );
}

function retrieveDatum(rit: Rit, props: Props): Date | undefined {
    const kalenderItem = props.kalender
        .find(kalenderItem => kalenderItem.ritNummer === rit.ritnummer);
    return kalenderItem ? new Date(kalenderItem.datum) : undefined;
}

function toDateNumber(rit: Rit, props: Props): number {
    const ritDate = retrieveDatum(rit, props);
    return ritDate ? ritDate.getTime() : new Date(2050, 5).getTime();
}

function renderRit(properties: Props, rit: Rit, classes: Record<"card" | "media", string>) {
    const props = rit.gpx ? { href: rit.gpx } : { disabled: true };
    const datum = retrieveDatum(rit, properties);
    const datumString = datum ? datum.getDate() + "/" + (datum.getMonth() + 1) + "/" + datum.getFullYear() : "Niet gepland";
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={rit.thumbnail ? rit.thumbnail : 'resources/unknown_location.png'}
                    title="Minimap"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Rit {rit.ritnummer}: {rit.naam}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <FontAwesomeIcon icon={faRoute} />&nbsp;{rit.afstand} km<br />
                        <FontAwesomeIcon icon={faMountain} />&nbsp;{rit.hoogtemeters} m<br />
                        <FontAwesomeIcon icon={faClock} />&nbsp;{rit.vertrek}<br />
                        <FontAwesomeIcon icon={faFlagCheckered} />&nbsp;{rit.finish}<br />
                        <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;{datumString}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" {...props}>
                    <FontAwesomeIcon icon={faFileDownload} />&nbsp;Download
                </Button>
                <br />
                <Button size="small" color="primary" onClick={() => properties.showOnMapCallBack(rit.gpx)} disabled={rit.gpx === undefined}>
                    <FontAwesomeIcon icon={faMapMarkedAlt} />&nbsp;Kaart
                    </Button>
            </CardActions>
        </Card>
    )
}
