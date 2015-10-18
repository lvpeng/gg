;(function () {

    // This file contains the code to define the graphics and then
    // renders them using data randomly generated by data.js.

    // Define graphics ...

    var scatterplot = gg({
        layers: [{ geometry: 'point', mapping: { x: 'd', y: 'r' } }]
    });

    var symmetric = gg({
        layers: [
            { geometry: 'line', mapping: { x: 'd', y: 'r' } },
        ],
        scales: [
            { type: 'linear', aesthetic: 'y', center: 0 }
        ]
    });

    var linechart = gg({
        layers: [
            { geometry: 'line', mapping: { x: 'd', y: 'r', group: 'subject', color: 'subject'} },
            { geometry: 'text', mapping: { x: 'd', y: 'r', }, text: '{d}, {r}', show: 'hover' }
        ],
        scales: [
            { aesthetic: 'color', type: 'color', range: ['#CFF09E', '#A8DBA8', '#79BD9A', '#3B8686'] }
        ]
    });

    var barchart = gg({
        layers: [
            { geometry: 'interval', mapping: { x: 'd', y: 'r' }, color: 'blue', width: 2 }
        ],
        scales: [
            { type: 'linear', aesthetic: 'y', min: 0 }
        ]
    });

    var histogram = gg({
        layers: [{
            geometry: 'interval',
            mapping: { x: 'group', y: 'count', color: 'group' },
            width: 20,
            statistic: { kind: 'sum', group: 'who', variable: 'purchases' }
        }],
        scales: [
            { type: 'categorical', aesthetic: 'x' },
            { type: 'linear', aesthetic: 'y', min: 0 }
        ]
    });

    var combined = gg({
        layers: [
            { geometry: 'point', mapping: { x: 'd', y: 'r' }, size: 3 },
            { geometry: 'line', mapping: { x: 'd', y: 'r' } }
            //{ geometry: 'interval', mapping: { x: 'd', y: 'r' }, width: 2 },
        ]
    });

    var semilog = gg({
        layers: [
            { geometry: 'point', mapping: { x: 'd', y: 'r' }, size: 3 },
            { geometry: 'line', mapping: { x: 'd', y: 'r' } }
        ],
        scales: [ { type: 'log', aesthetic: 'y', legend: 'whatever' },
                      { aesthetic: 'x', legend: 'foo' } ]
    });

    var heightHistogram = gg({
        layers: [
            {
                geometry: 'interval',
                mapping: { x: 'bin', y: 'count' },
                statistic: { kind: 'bin', variable: 'height', bins: 30 }
            }
        ],
        scales: [
            { type: 'categorical', aesthetic: 'x' },
            { type: 'linear', aesthetic: 'y', min: 0 }
        ]
    });

    var boxplot = gg({
        layers: [ {
            geometry: 'box',
            mapping: { x: 'group', y: false },
            statistic: { kind: 'box', group: 'grade', variable: 'value' }
        }],
        scales: [
            { type: 'categorical', aesthetic: 'x' }
        ]
    });

    var twoPopulations = gg({
        layers: [ {
            geometry: 'point',
            mapping: { x: 'intelligence', y: 'wisdom', color: 'group' },
            size: 2,
            alpha: 0.5
        }]
    });

    var quadrants = gg({
        layers: [
            {
                geometry: 'point',
                mapping: { x: 'x', y: 'y', size: 'size' }
            },
            { geometry: 'text', mapping: { x: 'x', y: 'y' }, text: '{name}: {size}',  show: 'hover' }
        ],
        scales: [ { aesthetic: 'size', range: [ 1, 5 ]} ]
    });

    var areachartSmooth = gg({
        layers: [ { geometry: 'area', mapping: { x: 'a', y: false, y0: 'top', y1: 'bottom' }, smooth: true } ]
    });

    var areachart = gg({
        layers: [ { geometry: 'area', mapping: { x: 'a', y: false, y0: 'top', y1: 'bottom' } } ]
    });

    // ... and render 'em

    var data = gg.sampleData;
    var div  = d3.select('#examples');
    var opts = { width: 300, height: 200, padding: 35 };

    linechart.renderer(div, opts)(data.upwardSubjects);
    combined.renderer(div, opts)(data.upward);
    barchart.renderer(div, opts)(_.map(data.upward, function (d) { return { d: d.d, r: Math.max(d.r, 0) }; }));
    quadrants.renderer(div, opts)(data.quadrants);
    histogram.renderer(div, opts)(data.purchases);
    semilog.renderer(div, opts)(data.semiLogData);
    heightHistogram.renderer(div, opts)(data.heightWeight);
    twoPopulations.renderer(div, opts)(data.twoPopulations);
    boxplot.renderer(div, opts)(data.forBoxPlots);
    symmetric.renderer(div, opts)(data.toBeCentered);
    areachartSmooth.renderer(div, opts)(data.upwardPairs);
    areachart.renderer(div, opts)(data.upwardPairs);

})();
