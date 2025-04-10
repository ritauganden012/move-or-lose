// stores.js
import { writable } from 'svelte/store';

export const layerDataStore = writable(null);

export const hoveredDataStore = writable(null);

export const clickedDataStore = writable(null);

export const tooltipPositionStore = writable({ x: 0, y: 0 });

export const currentGEOIDStore = writable(null);
