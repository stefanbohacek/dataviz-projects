/* globals Papa */

$(document).ready(function () {
    $('.js-tilt').tilt({
        maxTilt: 10,
        glare: true,
        maxGlare: 0.5,
        reset: false
    });

    const colorBiden = '#2b8cbe', colorTrump = '#e34a33';

    const demographics = ['$100,000+', '65', 'married', 'small town', '$25,000 - $49,999', 'catholic', 'men', 'some college', '$50,000 - $74,999', 'college grad', 'moderate', 'suburban', '$75,000 - $99,999', 'did not vote in 2016', 'post grad', 'under $25,000', '18-29', 'early voting', 'protestant', 'urban', '30-44', 'election day', 'rural', 'white', '45-64', 'hs or less', 'single', 'women'];
    let promises = [], data = [];

    $(demographics).each(function(index, demo){
      let p = $.ajax({
          url: `/projects/makeover-monday/2021w27/data/${ demo.split(' ').join('-').toLowerCase() }.csv`,
          success: function(resp) {
            data[demo] = Papa.parse(resp, {
              header: true
            });
            // console.log(data)
            return resp;
          }
      });

      p.done(function(resp) {
        return resp;
      });

      promises.push(p);
    });

    $.when.apply($, promises).then(function(resp) {
      // console.log('data ready', data);

      $('[data-demographic-group]').each(function(){
        let $demoGroup = $(this);
        const demoGroupName = $demoGroup.data('demographic-group');
        
        let map = $demoGroup.find('.us-map').replaceWith('<svg viewBox="0 0 540 360" focusable="true" tabindex="-1"><g><g tabindex="1" data-state="ak" data-state-full="Alaska" preserveAspectRatio="xMinYMin" transform="translate(0,0)" class=""><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">AK</text></g><g tabindex="2" data-state="me" data-state-full="Maine" preserveAspectRatio="xMinYMin" transform="translate(495,0)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">ME</text></g><g tabindex="3" data-state="vt" data-state-full="Vermont" preserveAspectRatio="xMinYMin" transform="translate(405,45)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">VT</text></g><g tabindex="4" data-state="nh" data-state-full="New Hampshire" preserveAspectRatio="xMinYMin" transform="translate(450,45)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NH</text></g><g tabindex="5" data-state="ma" data-state-full="Massachusetts" preserveAspectRatio="xMinYMin" transform="translate(495,45)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MA</text></g><g tabindex="6" data-state="wa" data-state-full="Washington" preserveAspectRatio="xMinYMin" transform="translate(45,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">WA</text></g><g tabindex="7" class="no-data" data-state="mt" data-state-full="Montana" preserveAspectRatio="xMinYMin" transform="translate(90,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MT</text></g><g tabindex="8" data-state="nd" data-state-full="North Dakota" preserveAspectRatio="xMinYMin" transform="translate(135,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">ND</text></g><g tabindex="9 data-state=" sd="" data-state-full="South Dakota" preserveAspectRatio="xMinYMin" transform="translate(180,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">SD</text></g><g tabindex="10" data-state="mn" data-state-full="Minnesota" preserveAspectRatio="xMinYMin" transform="translate(225,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MN</text></g><g tabindex="11" data-state="wi" data-state-full="Wisconsin" preserveAspectRatio="xMinYMin" transform="translate(270,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">WI</text></g><g tabindex="12" data-state="mi" data-state-full="Michigan" preserveAspectRatio="xMinYMin" transform="translate(315,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MI</text></g><g tabindex="13" class="" data-state="ny" data-state-full="New York" preserveAspectRatio="xMinYMin" transform="translate(405,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NY</text></g><g tabindex="14" data-state="ct" data-state-full="Connecticut" preserveAspectRatio="xMinYMin" transform="translate(450,90)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">CT</text></g><g tabindex="15" data-state="ri" data-state-full="Missouri" preserveAspectRatio="xMinYMin" transform="translate(495,90)" class="wordcloud-highlight"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">RI</text></g><g tabindex="16" data-state="or" data-state-full="Oregon" preserveAspectRatio="xMinYMin" transform="translate(45,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">OR</text></g><g tabindex="17" data-state="id" data-state-full="Idaho" preserveAspectRatio="xMinYMin" transform="translate(90,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">ID</text></g><g tabindex="18" class="no-data" data-state="wy" data-state-full="Wyoming" preserveAspectRatio="xMinYMin" transform="translate(135,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">WY</text></g><g tabindex="19" data-state="ne" data-state-full="Nebraska" preserveAspectRatio="xMinYMin" transform="translate(180,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NE</text></g><g tabindex="20" data-state="ia" data-state-full="Iowa" preserveAspectRatio="xMinYMin" transform="translate(225,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">IA</text></g><g tabindex="21" data-state="il" data-state-full="Illinois" preserveAspectRatio="xMinYMin" transform="translate(270,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">IL</text></g><g tabindex="22" data-state="in" data-state-full="Indiana" preserveAspectRatio="xMinYMin" transform="translate(315,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">IN</text></g><g tabindex="23" data-state="oh" data-state-full="Ohio" preserveAspectRatio="xMinYMin" transform="translate(360,135)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">OH</text></g><g tabindex="24" data-state="pa" data-state-full="Pennsylvania" preserveAspectRatio="xMinYMin" transform="translate(405,135)" class=""><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">PA</text></g><g tabindex="25" data-state="nj" data-state-full="New Jersey" preserveAspectRatio="xMinYMin" transform="translate(450,135)" class=""><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NJ</text></g><g tabindex="26" data-state="ca" data-state-full="California" preserveAspectRatio="xMinYMin" transform="translate(0,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">CA</text></g><g tabindex="27" data-state="nv" data-state-full="Nevada" preserveAspectRatio="xMinYMin" transform="translate(45,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NV</text></g><g tabindex="28" data-state="ut" data-state-full="Utah" preserveAspectRatio="xMinYMin" transform="translate(90,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">UT</text></g><g tabindex="29" data-state="co" data-state-full="Colorado" preserveAspectRatio="xMinYMin" transform="translate(135,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">CO</text></g><g tabindex="30" data-state="ks" data-state-full="Kansas" preserveAspectRatio="xMinYMin" transform="translate(180,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">KS</text></g><g tabindex="31" data-state="mo" data-state-full="Missouri" preserveAspectRatio="xMinYMin" transform="translate(225,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MO</text></g><g tabindex="32" data-state="ky" data-state-full="Kentucky" preserveAspectRatio="xMinYMin" transform="translate(270,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">KY</text></g><g tabindex="33" data-state="wv" data-state-full="West Virginia" preserveAspectRatio="xMinYMin" transform="translate(315,180)" class=""><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">WV</text></g><g tabindex="34" data-state="md" data-state-full="Maryland" preserveAspectRatio="xMinYMin" transform="translate(360,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MD</text></g><g tabindex="35" data-state="de" data-state-full="Delaware" preserveAspectRatio="xMinYMin" transform="translate(405,180)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">DE</text></g><g tabindex="36" data-state="az" data-state-full="Arizona" preserveAspectRatio="xMinYMin" transform="translate(90,225)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">AZ</text></g><g tabindex="37" data-state="nm" data-state-full="New Mexico" preserveAspectRatio="xMinYMin" transform="translate(135,225)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NM</text></g><g tabindex="38" data-state="ok" data-state-full="Oklahoma" preserveAspectRatio="xMinYMin" transform="translate(180,225)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">OK</text></g><g tabindex="39" class="no-data" data-state="ar" data-state-full="Arkansas" preserveAspectRatio="xMinYMin" transform="translate(225,225)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">AR</text></g><g tabindex="40" data-state="tn" data-state-full="Tennessee" preserveAspectRatio="xMinYMin" transform="translate(270,225)" class=""><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">TN</text></g><g tabindex="41" data-state="va" data-state-full="Virginia" preserveAspectRatio="xMinYMin" transform="translate(315,225)" class=""><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">VA</text></g><g tabindex="42" data-state="nc" data-state-full="North Carolina" preserveAspectRatio="xMinYMin" transform="translate(360,225)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">NC</text></g><g tabindex="43" data-state="tx" data-state-full="Texas" preserveAspectRatio="xMinYMin" transform="translate(135,270)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">TX</text></g><g tabindex="44" data-state="la" data-state-full="Louisiana" preserveAspectRatio="xMinYMin" transform="translate(180,270)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">LA</text></g><g tabindex="45" class="no-data" data-state="ms" data-state-full="Mississippi" preserveAspectRatio="xMinYMin" transform="translate(225,270)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">MS</text></g><g tabindex="46" data-state="al" data-state-full="Alabama" preserveAspectRatio="xMinYMin" transform="translate(270,270)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">AL</text></g><g tabindex="47" class="no-data" data-state="ga" data-state-full="Georgia" preserveAspectRatio="xMinYMin" transform="translate(315,270)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">GA</text></g><g tabindex="48" data-state="sc" data-state-full="South Carolina" preserveAspectRatio="xMinYMin" transform="translate(360,270)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">SC</text></g><g tabindex="49" data-state="hi" data-state-full="Hawaii" preserveAspectRatio="xMinYMin" transform="translate(0,315)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">HI</text></g><g tabindex="50" data-state="fl" data-state-full="Florida" preserveAspectRatio="xMinYMin" transform="translate(315,315)"><rect width="45" height="45" vector-effect="non-scaling-stroke" style="opacity: 0.5; stroke: rgb(170, 170, 170); fill: rgb(255, 255, 255);"></rect><text x="22.5" y="24.5" style="text-anchor: middle;">FL</text></g></g></svg> ');

        let winsTrump = 0, winsBiden = 0, bidenElectoralVotes = 0, trumpElectoralVotes = 0, winner = '';
        let color = '#dedede';

        $demoGroup.find('[data-state]').each(function(){
          try{
            const state = $(this).data('state');
            const stateData = data[demoGroupName.toString().toLowerCase()].data;
            let stateWinner;


            for (let i = 0, j = stateData.length; i < j; i++){
              // console.log('debug:', stateData[i]['State Abbr'])
              if (stateData[i]['State Abbr'] && stateData[i]['State Abbr'].toLowerCase() === state){
                bidenElectoralVotes += parseInt(stateData[i]['Biden Electoral Votes']);
                trumpElectoralVotes += parseInt(stateData[i]['Trump Electoral Votes']);
                stateWinner = stateData[i].Winner;

                switch (stateWinner){
                  case 'Biden':
                    winsBiden++;
                    color = colorBiden;
                    break;
                  case 'Trump':
                    winsTrump++;
                    color = colorTrump;
                    break;
                }

                $(this).find('rect').css({
                  stroke: color,
                  fill: color
                });
              }
            }

            // console.log('debug:', demoGroupName, state, stateWinner);

          } catch(err){
            /* noop */
          }
        });

      let $results = $demoGroup.find('.result');

      if (bidenElectoralVotes > trumpElectoralVotes){
        winner = 'Biden';
        color = colorBiden;
      } else {
        winner = 'Trump';
        color = colorTrump;
      }

      $results.html(`
        States: ${ winsBiden } vs ${ winsTrump }<br/>
        Electoral votes: ${ bidenElectoralVotes } vs ${ trumpElectoralVotes }<br/>
        Winner: <span style="color: ${ color }; font-weight: bold">${ winner }</span>
        `);
      });

    } );
  });