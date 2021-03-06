var ROOT_PATH ='https://cdn.jsdelivr.net/gh/YIntel12138/jscdn@master/js/echarts/';
  
  
var chartDom = document.getElementById('time-line');
var myChart = echarts.init(chartDom);
var option;

$.get(
  ROOT_PATH + 'data/time-line.json',
  function (_rawData) {
    run(_rawData);
  }
);
function run(_rawData) {
  // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
  // const countries = [
  //   'Finland',
  //   'France',
  //   'Germany',
  //   'Iceland',
  //   'Norway',
  //   'Poland',
  //   'Russia',
  //   'United Kingdom'
  // ];
  const countries = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',];
  const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (country) {
    var datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 201401 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params) {
          return params.value[3] + ': ' + params.value[0];
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'Year',
        tooltip: ['Income']
      }
    });
  });
  option = {
    textStyle: {
      // fontSize: 18,//???????????? 
      color: '#ffffff'//???????????? 
    },
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData
      },
      ...datasetWithFilters
    ],
    // title: {
    //   text: "???????????????????????????????????????????????????"
    // },
    tooltip: {
      // order: 'valueDesc',
      trigger: 'axis',
      formatter: function (params) {
        if (params instanceof Array) {
          let str = '';
          str += `${params[0].axisValue}<br/>`;
          params.forEach((m, index) => {
            str +=  `<span class="chart-tooltip-color" style="display: inline-block; margin-right: 10px; background-color: ${m.color}; width: 10px; height: 10px; border-radius:100%; margin-right: 5px"></span>`;
            str += `${m.seriesName}???${m.value[0]}`;
            str += `${index % 3 === 0 ? '<br/>' : '<span style="mso-tab-count:1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>'}`; //??????????????????????????????????????????
          });
          return str;
        }
      },
      
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: '????????????'
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
  myChart.setOption(option);
}

option && myChart.setOption(option);

