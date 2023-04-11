const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {

// Create function that updates panel with new sample selected in dropdown
function optionChanged(currentSample) {

    let newSample = Number(currentSample.target.value)
    let metadata = data.metadata.find(d => d.id === newSample)
    let sample = data.samples.find(d => d.id == newSample)
    let wfreq = metadata.wfreq
    let panel = d3.select("#sample-metadata");
    panel.html("");
    if (metadata){
        console.log(Object.entries(metadata))
        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
                }
            )
        }
        console.log(sample)
        chartsAll(sample)
        gaugePlot(wfreq)
    };

   
// Initialize panel with first sample
let metadata = data.metadata[0];
let sample = data.samples[0]
let wfreq = metadata.wfreq

// Call functions to initialize plots and panels from first objects in list
chartsAll(sample)
gaugePlot(wfreq)
console.log(metadata)
let panel = d3.select("#sample-metadata");
panel.html("");
Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
);

// Setup dropdown menu to display sample names
let selector = d3.select("#selDataset");
data.forEach((sample) => {
    selector
    .append("option")
    .text(sample)
    .property("value", sample);
});


// 
const select = document.getElementById("selDataset");
select.addEventListener("change", optionChanged);

  // Create a function plotting all charts based on dropdown menu

  function chartsAll(sample) {
    let sample_values = sample.sample_values;
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;

    // Create a bar chart

    let traceA = {
        x: sample_values.slice(0,10),
        y: otu_ids.slice(0,10).map(otuID => '${otuID}'),
        text: otu_labels.slice(0,10),
        name: "",
        type: "bar",
        orientation: "h"
    };

    // Bubble chart

    let traceB = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        mode: 'markers',
        marker: {
        color: "purple",
        size: sample_values
        }
    };

    let layout = {
        title: "",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "" }
    };

    let chartDataA = [traceA];
        Plotly.newPlot("bar", chartDataA);


    let chartDataB = [traceB];
    Plotly.newPlot("bubble", chartDataB, layout);

   


    
    }
  // Create function for gauge plot 
function gaugePlot(wfreq) {

        var data2 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [0, 9] }
                }
            }
        ];
        var layout2 = {
            width: 500,
            height: 400,
            margin: { t: 20, r: 20, l: 20, b: 20 },
            paper_bgcolor: "white",
            font: { color: "blue", family: "Arial" }
        };
        Plotly.newPlot('gauge', data2, layout2);

    }
    

});