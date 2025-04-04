<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let geoData;        // Boston map boundaries (GeoJSON)
  export let data;           // Eviction dataset (CSV rows)
  export let selectedLayer;  // Metric to display (e.g., 'eviction_rate')


    let svg;
    let width = 400;
    let height = 350;

    let colorScale = d3.scaleSequential().interpolator(d3.interpolateOranges);

    /// D3 Path Generator////
    let projection = d3.geoIdentity().reflectY(true).fitSize([width, height], geoData);
    let path = d3.geoPath().projection(projection);

//////Merge GeoJSON with CSV Data (via GEOID)/////////
    let joinedFeatures = [];

    $: if (geoData && data && selectedLayer) {
        const dataMap = new Map(data.map(d => [String(d.GEOID), d]));

        joinedFeatures = geoData.features.map(f => {
        const geoID = f.properties?.GEOID10;
        const row = dataMap.get(String(geoID));
        return {
        ...f,
        properties: {
        ...f.properties,
        value: row ? row[selectedLayer] : null
        }
    };
    });

    const values = joinedFeatures.map(f => f.properties.value).filter(d => d != null);
    const [min, max] = d3.extent(values);
    colorScale.domain([min, max]);
    }

    console.log('Matched values:', joinedFeatures.filter(f => f.properties.value != null).length);

  </script>

<svg width={width} height={height} class="map-svg">
    {#each joinedFeatures as feature}
      <path
        d={path(feature)}
        fill={feature.properties.value != null ? colorScale(feature.properties.value) : '#ccc'}
        stroke="#fff"
        stroke-width="0.5"
      />
    {/each}
</svg>
