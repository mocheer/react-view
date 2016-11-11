const package = require('./package.json')
var version = {
    name:package.name,
    description:package.description,
    version:package.version + ' ' +package.author,
    license:package.license,
    toString:function(){
        var str =''
        for (var k in this) {
            if (this.hasOwnProperty(k) && k!=='toString') {
                if(str !== ''){
                    str += '\n';
                }
                this[k] && (str += k + ':' + this[k])
            }
        }
        return str
    }
}
module.exports = version.toString()