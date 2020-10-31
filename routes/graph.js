const express = require('express');
const path = require('path');
const {PythonShell} = require('python-shell')
var router = express.Router();


var model_accuracy = '0'
router.post("/", (req, res, next)=>{
  const get_graph = 'get_svm_plot.py';
  var x1_label = req.body.x_var;
  var x2_label = req.body.y_var;
  var degree = req.body.degree;
  var cost = req.body.cost;
    
  const options = {
      args:[x1_label, x2_label, degree, cost],
      scriptPath: './svm_scripts'
  };

  PythonShell.run(get_graph, options, (err, results)=>{
      if(err){
          console.log(err);
      }
      console.log(results);
      model_accuracy = results[0]
      res.sendFile(__dirname + '/graph/graph.png', options, (err) =>{
        if(err)
          console.log(err);
      });
      
  });
});

router.get("/accuracy", (req, res)=>{ 
    res.json({accuracy: model_accuracy});
});

module.exports = router;
 /*   
app.get('/', (req, res) => {

    const { spawn } = require('child_process');
    const py_script = spawn('python', [get_graph, x1_label, x2_label, degree, cost]);
    
    py_script.stdout.on('data', function(data) {

        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
    
});
*/
