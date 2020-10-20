const get_graph = 'get_svm_plot.py';
const get_optimized_graph = './get_optimized_svm_plot.py';
const { text } = require('express');
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const {PythonShell} = require('python-shell')
const router = express.Router();


router.post('/', (req, res) => {
    var x1_label = req.body.x_var;
    var x2_label = req.body.y_var;
    var degree = req.body.degree;
    var cost = req.body.cost;
    
    const options = {
        args:[x1_label, x2_label, degree, cost]
        //scriptPath: '/routes'
    };

    PythonShell.run(get_graph, options, (err, results)=>{
        if(err){
            console.log(err);
        }
        
        console.log(results);
    });
    
    /*
    var py_script = spawn('python', [get_graph, x1_label, x2_label, degree, cost]);
    */
    /*res.text = ('x_var:',req.body.x_var,'y_var:',req.body.y_var, 
        'degree:',req.body.degree, 'cost:',req.body.cost);*/
    /*res.json(req.body);*/

    /*
    py_script.on('error', (err) => {
        console.log(err);
    });
    py_script.stdout.on('data', function(data) {
        res.send(data.tostring());
    });
    */
    
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
