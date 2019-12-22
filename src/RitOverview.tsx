import React from 'react';
import { Rit } from './Rit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faMountain, faRoute, faClock, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, Container, Row, Col } from 'react-bootstrap';

export interface Props {
    ritten: Rit[];
}
export interface State {

}


export class RitOverview extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render(){
        const rittenPerRow = 3;
        const ritten = this.chunk(this.props.ritten
            .sort((a: Rit, b: Rit) => a.ritnummer - b.ritnummer), rittenPerRow);
        

        return (
            <Container>
                {ritten.map((r,index) => {
                    return <Row>{r.map(rit => this.renderRit(rit))}</Row>
                })}
            </Container>
        );
    }

    chunk<T>(arr: T[], len: number): T[][] {
        let chunks = [],
            i = 0,
            n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    }


    renderRit(rit: Rit) {
        const previewImage = rit.thumbnail ? (<Card.Img variant="top" src={rit.thumbnail} />) : "";
        return (
            <Col key={rit.ritnummer} md="4">
                <Card style={{ width: '260' }} key={rit.ritnummer}>
                    {previewImage}
                    <Card.Body>
                        <Card.Title>Rit {rit.ritnummer}: {rit.naam}</Card.Title>
                        <Card.Text>
                            <FontAwesomeIcon icon={faRoute} />&nbsp;{rit.afstand} km -&nbsp;
                            <FontAwesomeIcon icon={faMountain} />&nbsp;{rit.hoogtemeters} m -&nbsp;
                            <FontAwesomeIcon icon={faClock} />&nbsp;{rit.vertrek}<br />
                            <Card.Link href={rit.gpx}><FontAwesomeIcon icon={faFileDownload} />&nbsp;Download GPX</Card.Link>
                            <Card.Link href="#"><FontAwesomeIcon icon={faMapMarkedAlt} />&nbsp;Toon op kaart</Card.Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}