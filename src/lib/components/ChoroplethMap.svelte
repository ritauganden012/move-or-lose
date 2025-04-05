<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import Tooltip from './Tooltip.svelte';
    import Legend from './Legend.svelte';

    export let geoData;
    export let data;
    export let selectedLayer;
    export let colorScale = d3.scaleSequential().interpolator(d3.interpolateOranges);


    let svg;
    let width = 500;
    let height = 500;

    // let colorScale = d3.scaleSequential().interpolator(d3.interpolateOranges);

        let projection = d3.geoIdentity().reflectY(true);
        let path = d3.geoPath().projection(projection);
        let joinedFeatures = [];

        let tooltip = {
        visible: false,
        x: 0,
        y: 0,
        content: ''
    };

    function showTooltip(event, feature) {
        const value = feature.properties.value;
        tooltip = {
        visible: true,
        x: event.pageX,
        y: event.pageY,
        content: `
            <strong>GEOID:</strong> ${feature.properties.GEOID10}<br>
            <strong>${selectedLayer}:</strong> ${value !== null ? value.toFixed(2) : 'N/A'}
        `
        };
    }

    function hideTooltip() {
        tooltip.visible = false;
    }

    $: if (geoData && data && selectedLayer) {
      const dataMap = new Map(data.map(d => [String(d.GEOID), d]));

      ///// Join data //////
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

      // Zoom to only Boston features with valid data
      const bostonFeatures = joinedFeatures.filter(f => f.properties.value != null);

      projection = d3.geoIdentity().reflectY(true).fitSize([width, height], {
        type: "FeatureCollection",
        features: bostonFeatures
      });

      path = d3.geoPath().projection(projection);

      // Set color domain
      const values = bostonFeatures.map(f => f.properties.value);
      const [min, max] = d3.extent(values);
      colorScale.domain([min, max]);

      console.log('Matched values:', bostonFeatures.length);
    }


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
