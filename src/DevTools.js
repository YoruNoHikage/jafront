import React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Dispatcher from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-dispatch/lib/MultipleMonitors';

import * as acGame from './actions/game';
import * as acAuth from './actions/auth';
import * as acUser from './actions/user';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher actionCreators={{game: acGame, auth: acAuth, user: acUser}} />
    </MultipleMonitors>
  </DockMonitor>
);
