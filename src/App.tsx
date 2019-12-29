import React from 'react';
import './App.css';
import { Rit } from './Rit';
import * as RitOverview from './RitOverview';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Map } from './Map';

interface Props {

}
interface State {
  ritten: Rit[],
  selectedTab: number,
  selectedGPX: string | undefined
}

export default class App extends React.Component<Props, State>{

  private handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      selectedTab: newValue
    });
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      ritten: [],
      selectedTab: 0,
      selectedGPX: undefined
    };
  }

  async componentDidMount() {
    const resp = await fetch('resources/ritten.json');
    const json = await resp.json();
    this.setState({ ritten: json });
  }

  showGPXOnMap(gpx: string | undefined){
    this.setState({
      selectedTab: 2,
      selectedGPX: gpx
    })
  }

  render() {
    return (
      <Container>
        <Paper square>
          <Tabs
            value={this.state.selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            centered
          >
            <Tab label="Beschikbare ritten" />
            <Tab label="Kalender 2020" />
            <Tab label="Kaart" />
          </Tabs>
        </Paper>

        <TabPanel value={this.state.selectedTab} index={0}>
          <RitOverview.default ritten={this.state.ritten} showOnMapCallBack={this.showGPXOnMap.bind(this)}/>
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          Kalender 2020
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={2}>
          <div id="leaflet-container">
            <Map gpx={this.state.selectedGPX}/>
          </div>            
        </TabPanel>
      </Container>
    );
  }
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}