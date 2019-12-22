import React from 'react';
import './App.css';
import {Rit} from './Rit';
import {RitOverview} from './RitOverview';
import {Container, Tabs, Tab} from 'react-bootstrap';

interface Props{

}
interface State{
  ritten: Rit[];
}

export default class App extends React.Component<Props,State>{
  constructor(props: Props){
    super(props);

    this.state = {
      ritten: []
    };
    fetch('resources/ritten.json')
    .then(response => response.json())
    .then(data => {
      this.setState({
        ritten: data as Rit[]
      })
    })
  }

  render(){
    return (
      <Container>
        <Tabs defaultActiveKey="overzicht" id="kalender-overzicht">
          <Tab eventKey="overzicht" title="Overzicht beschikbare ritten">
            <RitOverview ritten={this.state.ritten}/>
          </Tab>
          <Tab eventKey="kalender" title="Kalender 2020">
            Kalender 2020
          </Tab>
        </Tabs>
        
      </Container>
      
    );
  }
}
