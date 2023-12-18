import util from 'util';
import path from 'path';
import express from 'express';
import compression from 'compression';
import hbs from 'hbs';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';

import indexRoute from './routes/index.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// app.use('/js', express.static(__dirname + '/src/js'));
// app.use('/projects', express.static(__dirname + '/project'));
// app.use(express.static(__dirname + '/public'));

app.use(compression());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers:{
    // TODO: Save these in separate modules.
    // Function to do basic mathematical operation in handlebar
    // https://stackoverflow.com/questions/33059203/error-missing-helper-in-handlebars-js/46317662#46317662
    math: (lvalue, operator, rvalue) => {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    },
    times: (n, block) => {
      let accum = '';
      for(let i = 0; i < n; ++i){
        accum += block.fn(i);
      }
      return accum;
    }
  }  
}));



app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', indexRoute)


// app.get('/js/scripts.js', function (req, res) {
//   res.sendFile(path.join(__dirname + '/src/js/helpers/general.js'));
// });

export default app;
