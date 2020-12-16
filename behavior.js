const datavisEl = document.getElementById("dataViz");
const selectedCountry = document.getElementById("countrySelector");
const selectedCountry2 = document.getElementById("countrySelector2");
var chosenYear = '1990';
var chosenCountry1 = 'Afghanistan';
var chosenCountry2 = 'Afghanistan';
var x, i, j, selElmnt, a, b, c;

Plotly.d3.csv("normalizedPercentageDataset.csv", getThisData);

function uniqueValuesInArray(array) {
    return Array.from(new Set(array));
}

function getThisData(csvData) {
    const countryNames = uniqueValuesInArray(csvData.map((row) => row.Country));

    countryNames.forEach((Country) => {
        const option = document.createElement("option");
        option.textContent = Country;
        selectedCountry.appendChild(option);
    });

    // Dropdown formatting obtained from https://www.w3schools.com/howto/howto_custom_select.asp
    x = document.getElementsByClassName("select-wrapper");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];

        // for each element, create a new DIV that will act as the selected item
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);

        // for each element, create a new DIV that will contain the option list
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {

            // for each option in the original select element, create a new DIV that will act as an option item
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {

                // when an item is clicked, update the original select box, and the selected item
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {

            // when the select box is clicked, close any other select boxes, and open/close the current select box
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
            chosenCountry1 = selectedCountry.value;
            setPlot(csvData, chosenCountry1, chosenCountry2, chosenYear);
        });
    }

    countryNames.forEach((Country) => {
        const option = document.createElement("option");
        option.textContent = Country;
        selectedCountry2.appendChild(option);
    });

    // Dropdown formatting obtained from https://www.w3schools.com/howto/howto_custom_select.asp
    x = document.getElementsByClassName("select-wrapper2");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];

        // for each element, create a new DIV that will act as the selected item
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);

        // for each element, create a new DIV that will contain the option list
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {

            // for each option in the original select element, create a new DIV that will act as an option item
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {

                // when an item is clicked, update the original select box, and the selected item
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);

        a.addEventListener("click", function (e) {
            // when the select box is clicked, close any other select boxes, and open/close the current select box:
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
            chosenCountry2 = selectedCountry2.value;
            setPlot(csvData, chosenCountry1, chosenCountry2, chosenYear);
        });
    }

    setPlot(csvData, chosenCountry1, chosenCountry2, chosenYear);
}

function setPlot(csvData, chosenCountry1, chosenCountry2, chosenYear) {
    let frames = [];
    const sliderSteps = [];
    const years = uniqueValuesInArray(csvData.map((row) => row.Year));
    const rValues = [];
    const rValues2 = [];

    // filling rValues
    csvData.filter((row) => (row.Country === chosenCountry1 && row.Year === chosenYear))
        .forEach((row) => rValues.push(+row.Diseases, +row.Nutrition, +row.Chronic, +row.InfectiousDiseases, +row.DrugUse, +row.Pregnancy, +row.PoliticalDeaths, +row.Homicide, +row.Suicide, +row.Misadventure, +row.Diseases));

    csvData.filter((row) => (row.Country === chosenCountry2 && row.Year === chosenYear))
        .forEach((row) => rValues2.push(+row.Diseases, +row.Nutrition, +row.Chronic, +row.InfectiousDiseases, +row.DrugUse, +row.Pregnancy, +row.PoliticalDeaths, +row.Homicide, +row.Suicide, +row.Misadventure, +row.Diseases));

    years.forEach((year, index) => {
        var newFrameData = [];
        var newFrameData2 = [];
        csvData.filter((row) => (row.Country === chosenCountry1 && row.Year === year))
            .forEach((row) => newFrameData.push(+row.Diseases, +row.Nutrition, +row.Chronic, +row.InfectiousDiseases, +row.DrugUse,
                +row.Pregnancy, +row.PoliticalDeaths, +row.Homicide, +row.Suicide, +row.Misadventure, +row.Diseases));

        csvData.filter((row) => (row.Country === chosenCountry2 && row.Year === year))
            .forEach((row) => newFrameData2.push(+row.Diseases, +row.Nutrition, +row.Chronic, +row.InfectiousDiseases, +row.DrugUse,
                +row.Pregnancy, +row.PoliticalDeaths, +row.Homicide, +row.Suicide, +row.Misadventure, +row.Diseases));


        frames[index] = {
            data: [{
                    r: newFrameData
                },
                {
                    r: newFrameData2
                }
            ],
            name: year,
        };

        sliderSteps.push({
            label: year,
            method: "animate",
            args: [
                [year],
                {
                    mode: "immediate",
                    transition: {
                        duration: 300,
                    },
                    frame: {
                        duration: 300,
                    },
                },
            ],
        });
    });

    const trace1 = {
        r: rValues,
        type: 'scatterpolar',
        theta: ['Non-Infectious Diseases', 'Nutritional Disorders', 'Chronic Diseases', 'Infectious Diseases', 'Drug Use', 'Birth Disorders', 'Politically Motivated', 'Homicide', 'Suicide', 'Misadventure', 'Non-Infectious Diseases'],
        fill: 'toself',
        fillcolor: 'rgba(69,217,190,0.9)',
        name: `${chosenCountry1}`,
        hovertemplate: `<b>${chosenCountry1}</b><br>%{theta}<br>%{r}%<extra></extra>`,
        hoveron: 'points',
        marker: {
            opacity: 1,
        },

        line: {
            color: 'rgba(69,217,190,1)',
            shape: 'linear',
        },
    };

    const trace2 = {
        r: rValues2,
        type: 'scatterpolar',
        theta: ['Non-Infectious Diseases', 'Nutritional Disorders', 'Chronic Diseases', 'Infectious Diseases', 'Drug Use', 'Birth Disorders', 'Politically Motivated', 'Homicide', 'Suicide', 'Misadventure', 'Non-Infectious Diseases'],
        fill: 'toself',
        fillcolor: 'rgba(99,44,247,0.9)',
        name: `${chosenCountry2}`,
        hovertemplate: `<b>${chosenCountry2}</b><br>%{theta}<br>%{r}%<extra></extra>`,
        hoveron: 'points',
        marker: {
            opacity: 1,
        },

        line: {
            color: 'rgba(99,44,247,1)',
            shape: 'linear',
        },
    };

    const data = [trace1, trace2];

    const plotConfig = {
        displayModeBar: false,
    };

    const layout = {
        height: '925',
        margin: {
            t: 70,
        },
        dragmode: false,
        font: {
            family: "'Roboto', sans-serif",
            color: '#ffffff',
            size: '15',
        },
        coloraxis: {
            colorbar: {
                bordercolor: 'rgba(255,0,0,1)',
            },
        },
        title: {
            yref: 'container',
            yanchor: 'top',
            y: '.985',
            pad: {
                t: '5',
            },
            text: `Estimated Percentages of causes of death in <b style="color: rgba(69,217,190,1);">${chosenCountry1}</b><br>and <b style="color: rgba(99,44,247,1);">${chosenCountry2}</b> (1990 - 2017)`,
            font: {
                family: "'Roboto', sans-serif",
                color: '#ffffff',
                size: '24',
            },
        },
        showlegend: true,
        legend: {
            orientation: 'h',
            itemclick: 'toggle',
            x: '0.5',
            y: '-0.06',
            xanchor: 'center',
            yanchor: 'center',
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        polar: {
            bgcolor: 'rgba(0,0,0,0)',
            radialaxis: {
                visible: true,
            },
            angularaxis: {
                visible: true,
                color: 'rgba(255,255,255,100)',
                linewidth: '0',
                gridwidth: '2',
                showticklabels: true,
                ticks: 'inside',
            },
        },
        updatemenus: [{
            x: '0.5',
            y: '-0.25',
            xanchor: "center",
            yanchor: "center",
            showactive: false,
            direction: "left",
            type: "buttons",
            bgcolor: "#C9CACC",
            font: {
                color: "#000000",
            },
            buttons: [{
                    method: "animate",
                    args: [
                        null,
                        {
                            fromcurrent: true,
                            transition: {
                                duration: 500,
                            },
                            frame: {
                                duration: 500,
                            },
                        },
                    ],
                    label: "  ►  ",
                },
                {
                    method: "animate",
                    args: [
                        [null],
                        {
                            mode: "immediate",
                            transition: {
                                duration: 0,
                            },
                            frame: {
                                duration: 0,
                            },
                        },
                    ],
                    label: "▕ ▏",
                },
            ],
        }, ],

        sliders: [{
            steps: sliderSteps,
            len: 1.1,
            x: '0.5',
            y: '-0.05',
            xanchor: "center",
            yanchor: "center",
            tickcolor: "#FFFFFF",
            ticklen: "7",
            minorticklen: "4",
            currentvalue: {
                visible: true,
                prefix: "Year: ",
                xanchor: "left",
                font: {
                    size: 20,
                    color: "#FFFFFF",
                    family: "'Roboto', sans-serif",
                },
            },
            transition: {
                duration: 300,
                easing: "cubic-in-out",
            },
        }],
    };

    Plotly.newPlot(datavisEl, {
        frames: frames,
        data: data,
        layout: layout,
        config: plotConfig,
    });
}