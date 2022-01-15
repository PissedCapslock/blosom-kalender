import React from "react";
import "./App.css";
import { Rit } from "./Rit";
import * as RitOverview from "./RitOverview";
import * as Kalender from "./Kalender";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Map } from "./Map";
import { KalenderItem } from "./KalenderItem";

const huidig_jaar = 2022;
const vorig_jaar = huidig_jaar - 1;

interface Props {}
interface State {
  ritten: Rit[];
  kalender_nu: KalenderItem[];
  kalender_vorig: KalenderItem[];
  selectedTab: number;
  selectedGPX: string | undefined;
}

export default class App extends React.Component<Props, State> {
  private handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      selectedTab: newValue,
    });
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      ritten: [],
      kalender_nu: [],
      kalender_vorig: [],
      selectedTab: 0,
      selectedGPX: undefined,
    };
  }

  async componentDidMount() {
    const resp = await fetch("resources/ritten.json");
    const json = await resp.json();

    const kalenderresp_huidig = await fetch(
      `resources/kalender_${huidig_jaar}.json`
    );
    const kalenderjson_huidig =
      (await kalenderresp_huidig.json()) as KalenderItem[];

    const kalenderresp_vorig = await fetch(
      `resources/kalender_${vorig_jaar}.json`
    );
    const kalenderjson_vorig =
      (await kalenderresp_vorig.json()) as KalenderItem[];

    for (let i = 0; i < kalenderjson_huidig.length; i++) {
      const ritnummer = kalenderjson_huidig[i].ritNummer;
      if (ritnummer !== -1) {
        for (let j = 0; j < kalenderjson_huidig.length; j++) {
          if (j !== i && kalenderjson_huidig[j].ritNummer === ritnummer) {
            throw new Error(`Rit ${ritnummer} staat 2 maal op de kalender`);
          }
        }
      }
    }

    this.setState({
      ritten: json,
      kalender_nu: kalenderjson_huidig,
      kalender_vorig: kalenderjson_vorig,
    });
  }

  showGPXOnMap(gpx: string | undefined) {
    this.setState({
      selectedTab: 3,
      selectedGPX: gpx,
    });
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
            <Tab label={`Kalender ${huidig_jaar}`} />
            <Tab label={`Kalender ${vorig_jaar}`} />
            <Tab label="Kaart" />
          </Tabs>
        </Paper>

        <TabPanel value={this.state.selectedTab} index={0}>
          <RitOverview.default
            ritten={this.state.ritten}
            showOnMapCallBack={this.showGPXOnMap.bind(this)}
            kalender={this.state.kalender_nu}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          <Kalender.default
            ritten={this.state.ritten}
            showOnMapCallBack={this.showGPXOnMap.bind(this)}
            kalender={this.state.kalender_nu}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={2}>
          <Kalender.default
            ritten={this.state.ritten}
            showOnMapCallBack={this.showGPXOnMap.bind(this)}
            kalender={this.state.kalender_vorig}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={3}>
          <div id="leaflet-container">
            <Map gpx={this.state.selectedGPX} />
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
