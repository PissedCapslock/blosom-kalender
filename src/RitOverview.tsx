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

export interface Props {
    ritten: Rit[],
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
    const classes = useStyles();
    const ritten = props.ritten.slice(0)
        .sort((a: Rit, b: Rit) => a.ritnummer - b.ritnummer);

    return (
        <Grid container spacing={3}>
            {ritten.map((r, index) => {
                return <Grid item xs key={r.ritnummer}><Paper>{renderRit(props, r, classes)}</Paper></Grid>
            })}
        </Grid>
    );
}

function renderRit(properties: Props, rit: Rit, classes: Record<"card" | "media", string>) {
    const props = rit.gpx ? { href: rit.gpx } : { disabled: true };
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
                        <FontAwesomeIcon icon={faRoute} />&nbsp;{rit.afstand} km<br/>
                            <FontAwesomeIcon icon={faMountain} />&nbsp;{rit.hoogtemeters} m<br/>
                            <FontAwesomeIcon icon={faClock} />&nbsp;{rit.vertrek}<br/>
                            <FontAwesomeIcon icon={faFlagCheckered} />&nbsp;{rit.finish}<br/>
                            <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" {...props}> 
                    <FontAwesomeIcon icon={faFileDownload} />&nbsp;Download
                </Button>
                <br/>
                <Button size="small" color="primary" onClick={() => properties.showOnMapCallBack(rit.gpx)} >
                    <FontAwesomeIcon icon={faMapMarkedAlt} />&nbsp;Kaart
                    </Button>
            </CardActions>
        </Card>
    )
}
