import React from 'react';
import { Rit } from './Rit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faMountain, faRoute, faClock, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
    ritten: Rit[];
}

const useStyles = makeStyles({
    card: {
        width: 300,
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
                return <Grid item xs key={r.ritnummer}><Paper>{renderRit(r, classes)}</Paper></Grid>
            })}
        </Grid>
    );
}

function renderRit(rit: Rit, classes: Record<"card" | "media", string>) {
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
                        <FontAwesomeIcon icon={faRoute} />&nbsp;{rit.afstand} km -&nbsp;
                            <FontAwesomeIcon icon={faMountain} />&nbsp;{rit.hoogtemeters} m -&nbsp;
                            <FontAwesomeIcon icon={faClock} />&nbsp;{rit.vertrek}<br />
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {rit.gpx ? 
                <Button size="small" color="primary" href={rit.gpx}>
                    <FontAwesomeIcon icon={faFileDownload} />&nbsp;Download GPX
                    </Button> : 
                    <Button size="small" color="primary" disabled>
                        <FontAwesomeIcon icon={faFileDownload} />&nbsp;Download GPX
                    </Button>}
                <Button size="small" color="primary">
                    <FontAwesomeIcon icon={faMapMarkedAlt} />&nbsp;Toon op kaart
                    </Button>
            </CardActions>
        </Card>
    )
}
