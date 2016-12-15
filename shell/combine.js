const child_process = require('child_process');
const spawn = child_process.spawn;
const env = process.env 
var tasks = env.tasks.split(',')

for (var i = 0, l = tasks.length, task, watch; i < l; i++) {
    task = tasks[i];
    watch = spawn('cmd', ['/c','npm','run', task]);
    // 捕获输出
    watch.stdout.on('data', data => {
        console.log('standard output:\n' + data);
    });
    // 捕获标准错误输出
    watch.stderr.on('data', data  => {
        console.log('standard error output:\n' + data);
    });
    // 注册子进程关闭事件 
    watch.on('exit', (code, signal) => {
        console.log('child process eixt ,exit:' + code);
    });
}