// stores.js
import { writable } from 'svelte/store';

export const hoveredDataStore = writable(null);

export const tooltipPositionStore = writable({ x: 0, y: 0 });

export const currentGEOIDStore = writable(null);
