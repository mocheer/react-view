/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
var mirror,
    measure = input => {
        let { value } = input;
        if (value == '') return '';
        if (!mirror) {
            mirror = T.create('span', '', document.body);
            T.setStyle(mirror, 'position:absolute; top:-999px; left:0; white-space:pre;')
        }
        let style = getComputedStyle(input);
        ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent'].forEach(key => {
            mirror.style[key] = style[key]
        })
        mirror.innerText = value;
        return getComputedStyle(mirror).getPropertyValue('width')
    }
export default measure;