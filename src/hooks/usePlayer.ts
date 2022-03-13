import React from 'react';

import { PlayerContext } from '../contexts/PlayerContext';

export const usePlayer = () => React.useContext(PlayerContext);
