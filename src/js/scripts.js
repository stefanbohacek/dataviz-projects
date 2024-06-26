window.helpers = {
    ready: (fn) => {
        if (document.readyState !== 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    getMonth: (index) => {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][index];
    },
    getMaxValueIndices: (arr) => {
      let max = -Infinity, indices = [];
      for (let i = 0; i < arr.length; ++i){
        if (arr[i] < max) continue;
        if (arr[i] > max) {
          indices = [];
          max = arr[i];
        }
        indices.push(i);
      }
      return indices;
    },
    sortArrayOfObjects: (arr, key, desc) => {
        if (desc){
            arr.sort((a, b) => (a[key] < b[key]) ? 1 : -1);
        } else {
            arr.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
        }
        return arr;
    },
    highlightMax: (chart, color) => {
        const tooltip = chart.tooltip;
        const chartArea = chart.chartArea;
        const maxValueIndices = window.helpers.getMaxValueIndices(chart.data.datasets[0].data);


        if (color){
            chart.data.datasets[0].backgroundColor = chart.data.datasets[0].backgroundColor || [];

            for (let i = 0; i < chart.data.datasets[0].data.length; i++){
                chart.data.datasets[0].backgroundColor[i] = Chart.defaults.backgroundColor;
            }
        }

        if (!window.helpers.isMobile()){
            maxValueIndices.forEach(maxValueIndex => {
                tooltip.setActiveElements(
                    [
                        {
                            datasetIndex: 0,
                            index: maxValueIndex,
                        }
                    ],
                    {
                        x: (chartArea.left + chartArea.right) / 2,
                        y: (chartArea.top + chartArea.bottom) / 2,
                    }
               );

                if (color){
                    chart.data.datasets[0].backgroundColor[maxValueIndex] = color;
                }

            });
        }

        chart.update();
    },
    median: (values) => {
      if(values.length ===0) throw new Error("No inputs");

      values.sort(function(a,b){
        return a-b;
      });

      var half = Math.floor(values.length / 2);
      
      if (values.length % 2)
        return values[half];
      
      return (values[half - 1] + values[half]) / 2.0;
    },
    mapboxHelper: {
        addMarkers: (map, locations, previousMarkers, colorDefault, colorHighlight, indexHighlight) => {
            if (previousMarkers && previousMarkers.length){
                previousMarkers.forEach(marker => {
                    marker.remove();
                });
            }

            let markers = [];
            locations.forEach((location, index) =>{
                const marker = new mapboxgl.Marker({
                    color: index === indexHighlight ? colorHighlight : colorDefault
                })
                .setLngLat([location[0], location[1]])
                .addTo(map);

                markers.push(marker);
            });

            return markers;
        },
    },
    preloadImages: (urls) => {
        urls.forEach((url) => {
            let img = new Image();
            img.src = url;
        });
    },
    isSafari: () => {
        return navigator.vendor &&
               navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') === -1 &&
               navigator.userAgent.indexOf('FxiOS') === -1;
    },
    isSafariMobile: () => {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        const webkit = !!ua.match(/WebKit/i);
        const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
        return iOSSafari;
    },
    isMobile: () => {
        var isMobile = false;
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(|\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg(g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }
        return isMobile;
    }
};

window.helpers.ready(() => {
    if (window.helpers.isSafari() && !window.helpers.isSafariMobile()){
        const stickyEls = document.querySelectorAll('.col-sm-12.sticky-top');
        if (stickyEls && stickyEls.length){
            for (let i = 0, j = stickyEls.length; i < j; i++){
                console.log(stickyEls[0].dataset.keepSticky);
                if (stickyEls[0].dataset && !stickyEls[0].dataset.keepSticky){
                    stickyEls[0].classList.remove('sticky-top');
                }
            }
        }
    }
});