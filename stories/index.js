/**
 * quinoa-vis-module stories definition
 * ============
 * each story allows to visually assess the lib's components in the browser
 * run `npm storybook` to see them in action
 */

import React from 'react';
import { storiesOf, action, linkTo } from '@storybook/react';

/*
 * TIMELINE COMPONENT STORIES
 */

import Timeline from '../src/Timeline/Timeline';

import TimelineStoryContainer from './TimelineStoryContainer';
import parseTimelineData from '../src/utils/timelineDataParser';
import mapTimelineData from '../src/utils/timelineDataMapper';
import timelineDataRaw from 'raw-loader!./mock_data/milestones-datavis.csv';

const timelineDataMap = {
  year: 'year',
  title: (d) => d.content,
  description: 'content',
  source: 'content',
  category: 'category',
  endYear: 'end year'
};
const timelineBaseViewParameters = {
  fromDate: new Date().setFullYear(1900),
  toDate: new Date().setFullYear(1960),
  colorsMap: {
    main: {
      cartography: '#F24D98',
      computation: '#813B7C',
      mathematics: '#59D044',
      statistics: '#F3A002',
      default: 'lightgrey'
    },
    default: 'lightgrey'
  }
};

const timelineData = mapTimelineData(parseTimelineData(timelineDataRaw), {main: timelineDataMap});
storiesOf('Timeline', module)
  .add('default', () => (
    <Timeline
      allowUserViewChange ={true}
      data={timelineData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {timelineBaseViewParameters}
    />
  ))
  .add('with a filter', () => (
    <Timeline
      allowUserViewChange ={true}
      data={timelineData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {{
        ...timelineBaseViewParameters,
        shownCategories: {
          main: ['computation']
        }
      }}
    />
  ))
  .add('with an object selected', () => (
    <Timeline
      allowUserViewChange ={true}
      data={timelineData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {{
        ...timelineBaseViewParameters,
        selectedObjectId: 209
      }}
    />
  ))
  .add('without categories', () => (
    <Timeline
      allowUserViewChange ={true}
      data={
        mapTimelineData(parseTimelineData(timelineDataRaw), {main: {
          ...timelineDataMap,
          category: undefined
        }})
      }
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {{
        ...timelineBaseViewParameters,
        showCategories: {
          main: ['computation']
        }
      }}
    />
  ))
  .add('locked', () => (
    <Timeline
      allowUserViewChange ={false}
      data={timelineData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {timelineBaseViewParameters}
    />
  ))
  .add('switch between view states (navigable)', () => (
    <TimelineStoryContainer
      timelineData={timelineData}
      baseParameters={timelineBaseViewParameters}
      allowUserViewChange={true}
    />
  ))
  .add('switch between view states (locked)', () => (
    <TimelineStoryContainer
      timelineData={timelineData}
      baseParameters={timelineBaseViewParameters}
      allowUserViewChange={false}
    />
  ))
  .add('very small layouts', () => (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'darkgrey',
      left: '0',
      top: '0'
    }}>
      <div style={{
        position: 'absolute',
        height: '88%',
        overflow: 'hidden',
        width: '20%',
        top: '1%',
        left: '1%',
        background: 'white'
      }}>
      <Timeline
        allowUserViewChange ={true}
        data={timelineData}
        onUserViewChange={(e) => console.log('on view change', e)}
        viewParameters = {timelineBaseViewParameters}
      />
      </div>
      <div style={{
        position: 'absolute',
        height: '50%',
        overflow: 'hidden',
        width: '60%',
        left: '30%',
        top: '1%',
        background: 'white'
      }}>
      <Timeline
        allowUserViewChange ={true}
        data={timelineData}
        onUserViewChange={(e) => console.log('on view change', e)}
        viewParameters = {timelineBaseViewParameters}
      />
      </div>
    </div>
  ));

/*
 * MAP COMPONENT STORIES
 */

import Map from '../src/Map/Map';
import parseMapData from '../src/utils/mapDataParser';
import mapMapData from '../src/utils/mapDataMapper';

import MapStoryContainer from './MapStoryContainer';
import MapLockSwitcher from './MapLockSwitcher';

import mapDataRaw from 'raw-loader!./mock_data/bornes-recharge-electrique.csv';
import mapGeoJSONData from 'raw-loader!./mock_data/amaps-et-regions.geojson';

const mapDataMap = {
  latitude: 'latitude',
  longitude: 'longitude',
  title: 'nom_station',
  category: 'type_charge'
};
const mapBaseViewParameters = {
  cameraX: 48.8674345,
  cameraY: 2.3455482,
  cameraZoom: 4,
  colorsMap: {
    main: {
      'accélérée': '#F24D98',
      'normale': '#813B7C',
      default: 'lightgrey'
    },
    default: 'lightgrey'
  },
  tilesUrl: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'
};

const mapData = mapMapData(parseMapData(mapDataRaw, 'csv'), {
  main: mapDataMap
});

const mapGeoJSONDataMap = {
  // for now these two are not exposed to mapping
  // latitude: 'latitude',
  // longitude: 'longitude',
  title: 'nom',
  category: 'basemap'
};
const mapGeoJSONBaseViewParameters = {
  cameraX: 48.8674345,
  cameraY: 2.3455482,
  cameraZoom: 4,
  tilesUrl: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
  colorsMap: {
    main: {
      osm_mapnik: 'orange',
      noCategory: 'lightgrey',
      default: 'lightgrey'
    },
    default: 'lightgrey'
  }
};
const geoJSONData = mapMapData(parseMapData(mapGeoJSONData, 'geojson'), {
  main: mapGeoJSONDataMap
});

storiesOf('Map', module)
  .add('default', () => (
    <Map
      allowUserViewChange ={true}
      data={mapData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {mapBaseViewParameters}
    />
  ))
  .add('with a filter', () => (
    <Map
      allowUserViewChange ={true}
      data={mapData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {{
        ...mapBaseViewParameters,
        showCategories: {
          main: ['osm_mapnik']
        }
      }}
    />
  ))
  .add('default (with geojson)', () => (
    <Map
      allowUserViewChange ={true}
      data={geoJSONData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {mapGeoJSONBaseViewParameters}
    />
  ))
  .add('locked', () => (
    <Map
      allowUserViewChange ={false}
      data={mapData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {mapBaseViewParameters}
    />
  ))
  .add('switch between lock mode and unlock mode', () => (
    <MapLockSwitcher
      mapData={mapData}
      baseParameters={mapBaseViewParameters}
      allowUserViewChange={true}
    />
  ))
  .add('switch between view states (navigable)', () => (
    <MapStoryContainer
      mapData={mapData}
      baseParameters={mapBaseViewParameters}
      allowUserViewChange={true}
    />
  ))
  .add('switch between view states (locked)', () => (
    <MapStoryContainer
      mapData={mapData}
      baseParameters={mapBaseViewParameters}
      allowUserViewChange={false}
    />
  ))
  .add('very small layouts', () => (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'darkgrey',
      left: '0',
      top: '0'
    }}>
      <div style={{
        position: 'absolute',
        height: '88%',
        overflow: 'hidden',
        width: '20%',
        top: '1%',
        left: '1%',
        background: 'white'
      }}>
      <Map
        allowUserViewChange ={true}
        data={mapData}
        onUserViewChange={(e) => console.log('on view change', e)}
        viewParameters = {mapBaseViewParameters}
      />
      </div>
      <div style={{
        position: 'absolute',
        height: '50%',
        overflow: 'hidden',
        width: '60%',
        left: '30%',
        top: '1%',
        background: 'white'
      }}>
      <Map
        allowUserViewChange ={true}
        data={mapData}
        onUserViewChange={(e) => console.log('on view change', e)}
        viewParameters = {mapBaseViewParameters}
      />
      </div>
    </div>
  ));

/*
 * NETWORK COMPONENT STORIES
 */

import Network from '../src/Network/Network';
import NetworkStoryContainer from './NetworkStoryContainer';
import NetworkSpatializerContainer from './NetworkSpatializerContainer';

import parseNetworkData from '../src/utils/networkDataParser';
import mapNetworkData from '../src/utils/networkDataMapper';

import networkJSONDataRaw from './mock_data/miserables.json';
import networkGexfDataRaw from 'raw-loader!./mock_data/arctic.gexf';
// import networkGraphMLData from 'raw-loader!./mock_data/primer.graphml';
import networkGraphMLDataRaw from 'raw-loader!./mock_data/family-belongings.xml';

const networkJSONDataMap = {
  nodes: {
    category: 'group',
    label: 'name'
  }
};
const networkJSONBaseViewParameters = {
  cameraX: 0,
  cameraY: 0,
  cameraRatio: 2,
  cameraAngle: 0,
  labelThreshold: 7,
  minNodeSize: 2,
  sideMargin: 0,
  colorsMap: {
    nodes: {
      1: '#813B7C',
      2: '#41d9f4',
      3: '#64f441',
      default: '#F24D98'
    },
    edges: {
      default: '#c0c6c6'
    },
    default: '#c0c6c6'
  }
};
const networkJSONData = mapNetworkData(parseNetworkData(JSON.stringify(networkJSONDataRaw), 'json'), networkJSONDataMap)

const networkGexfDataMap = {
  nodes: {
    label: 'label',
    category: 'color'
  }
};
const networkGexfBaseViewParameters = {
  cameraX: 0,
  cameraY: 0,
  cameraRatio: 2,
  cameraAngle: 0,
  labelThreshold: 7,
  minNodeSize: 1,
  sideMargin: 0,
  dataMap: networkGexfDataMap,
  colorsMap: {
    nodes: {
      "rgb(255,51,51)": "rgb(255,51,51)",
      "rgb(0,204,204)": "rgb(0,204,204)",
      "rgb(255,255,51)": "rgb(255,255,51)",
      "rgb(204,204,255)": "rgb(204,204,255)",
      "rgb(153,0,0)": "rgb(153,0,0)",
      "rgb(102,102,0)": "rgb(102,102,0)",
      "rgb(255,204,102)": "rgb(255,204,102)",
      "rgb(153,255,0)": "rgb(153,255,0)",
      "rgb(102,0,102)": "rgb(102,0,102)",
      "rgb(153,255,255)": "rgb(153,255,255)",
      "rgb(102,255,102)": "rgb(102,255,102)",
      "rgb(0,153,0)": "rgb(0,153,0)",
      "rgb(255,153,153)": "rgb(255,153,153)",
      "rgb(255,255,0)": "rgb(255,255,0)",
      "rgb(204,0,0)": "rgb(204,0,0)",
      "rgb(0,204,51)": "rgb(0,204,51)",
      "rgb(51,153,255)": "rgb(51,153,255)",
      "rgb(255,204,51)": "rgb(255,204,51)",
      default: '#c0c6c6'
    },
    default: '#c0c6c6'
  }
};

const networkGexfData = mapNetworkData(parseNetworkData(networkGexfDataRaw, 'gexf'), networkGexfDataMap)

const networkGraphMLDataMap = {
  nodes: {
    label: 'name',
    category: 'type',
    description: 'description'
  }
};

const networkGraphMLBaseViewParameters = {
  cameraX: 20.29133217993082,
  cameraY: -4.05826643598615,
  cameraRatio: 1.176,
  cameraAngle: 0,

  labelThreshold: 7,
  minNodeSize: 2,
  sideMargin: 0,
  dataMap: networkGraphMLDataMap,
  colorsMap: {
    nodes: {
      'person': '#F24D98',
      'object': '#813B7C',
      'animal': '#e5f442',
      default: '#c0c6c6'
    },
    edges: {
      default: '#c0c6c6'
    },
    default: '#c0c6c6'
  }
};

const networkGraphMLData = mapNetworkData(parseNetworkData(networkGraphMLDataRaw, 'graphml'), networkGraphMLDataMap)
storiesOf('Network', module)
  .add('with gexf (default)', () => (
    <Network
      allowUserViewChange ={true}
      data={networkGexfData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {networkGexfBaseViewParameters}
    />
  ))
  .add('with gexf and force atlas active', () => (
    <Network
      allowUserViewChange ={true}
      data={networkGexfData}
      forceAtlasActive = {true}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {networkGexfBaseViewParameters}
    />
  ))
  .add('camera transitions', () => (
    <NetworkStoryContainer
      data={networkGexfData}
      baseParameters={networkGexfBaseViewParameters}
      allowUserViewChange={true}
    />
  ))
  .add('with json', () => (
    <Network
      allowUserViewChange ={true}
      data={networkJSONData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {networkJSONBaseViewParameters}
    />
  ))
  .add('with json and filter', () => (
    <Network
      allowUserViewChange ={true}
      data={networkJSONData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {{
        ...networkJSONBaseViewParameters,
        shownCategories: {
          nodes: [2, 3, 6]
        }
      }}
    />
  ))
  .add('with json and force atlas active', () => (
    <NetworkSpatializerContainer
      allowUserViewChange ={true}
      data={networkJSONData}
      baseParameters={networkJSONBaseViewParameters}
    />
  ))
  .add('with graphml', () => (
    <Network
      allowUserViewChange ={true}
      data={networkGraphMLData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {networkGraphMLBaseViewParameters}
    />
  ))
  .add('Locked', () => (
    <Network
      allowUserViewChange ={false}
      data={networkGexfData}
      onUserViewChange={(e) => console.log('on view change', e)}
      viewParameters = {networkGexfBaseViewParameters}
    />
  ));

/**
 * SVGVIEWER COMPONENT STORIES
 */

import SVGViewer from '../src/SVGViewer/SVGViewer';
import TEST_RAW_SVG from 'raw-loader!./mock_data/svgviewer-test.svg.txt';
import SVGStoryContainer from './SVGStoryContainer';

const defaultSVGViewParameters = {
  maxZoomLevel : 1000,
  minZoomLevel : -2000,
  perspectiveLevel : 1000,
  x : 0,
  y : 0,
  zoomFactor : 50,
  zoomLevel : 1,
};

storiesOf('SVGViewer', module)
  .add('default, load raw SVG file', () => (
    <SVGViewer data={TEST_RAW_SVG} onUserViewChange={e => console.log('on user view change', e)} />
  ))
  .add('locked', () => (
    <SVGViewer data={TEST_RAW_SVG} allowUserViewChange={false} />
  ))
  .add('change view from upstream', () => (
    <SVGStoryContainer data={TEST_RAW_SVG} baseParameters={defaultSVGViewParameters} />
  ))
