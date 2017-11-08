/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 * @see https://github.com/gtramontina/draggable.js 简化、重写
 */
var { setStyle, getStyle } = T.Util, currentElement, fairlyHighZIndex = 10
/**
 * 
 * @param {*} el 
 * @param {*} handle 
 */
export default (el, handle) => {
    handle = handle || el;
    var index = parseInt(getStyle(el, 'z-index'))
    fairlyHighZIndex = isNaN(index) ? 10 : index;
    el.style.position = 'absolute';
    handle.addEventListener('mousedown', function (event) {
        event.which === 1 && startDragging(event, el);//ie8- 要用event.button
    });
}
/**
 * 开始拖拽
 * @param {*} event 
 * @param {*} element 
 */
function startDragging(event, element) {
    currentElement && sendToBack(currentElement);
    currentElement = bringToFront(element);
    var initialPosition = getInitialPosition(currentElement);
    var css = 'position:absolute;margin-left:0;margin-top:0;left:' + inPixels(initialPosition.left) + ';top:' + inPixels(initialPosition.top) + ';'
    setStyle(currentElement, css);
    currentElement.lastXPosition = event.clientX;
    currentElement.lastYPosition = event.clientY;

    var okToGoOn = triggerEvent('start', { x: initialPosition.left, y: initialPosition.top, mouseEvent: event });
    if (!okToGoOn) return;

    addDocumentListeners();
}
/**
 * todo 事件派发
 * @param {*} type 
 * @param {*} args 
 */
function triggerEvent(type, args) {
    return true;
}
/**
 * 
 * @param {*} element 
 */
function sendToBack(element) {
    element.style.zIndex = fairlyHighZIndex - 1;
}
/**
 * 
 * @param {*} element 
 */
function bringToFront(element) {
    element.style.zIndex = fairlyHighZIndex;
    return element;
}
/**
 * 添加事件
 */
function addDocumentListeners() {
    document.addEventListener('selectstart', cancelDocumentSelection);
    document.addEventListener('mousemove', repositionElement);
    document.addEventListener('mouseup', removeDocumentListeners);
}
/**
 * 获取拖拽前的位置
 * @param {*} element 
 */
function getInitialPosition(element) {
    var rect = {};
    if (getStyle(element, 'position') == 'absolute') {
        rect = { top: element.offsetTop, left: element.offsetLeft };
    } else {
        rect = element.getBoundingClientRect();
    }
    return {
        top: rect.top,
        left: rect.left
    };
}
/**
 * 
 * @param {*} value 
 */
function inPixels(value) {
    return value + 'px';
}
/**
 * 
 * @param {*} event 
 */
function cancelDocumentSelection(event) {
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
    event.returnValue = false;
    return false;
}
/**
 * 
 * @param {*} event 
 */
function repositionElement(event) {
    event.preventDefault && event.preventDefault();
    event.returnValue = false;
    var style = currentElement.style;
    var elementXPosition = parseInt(style.left, 10);
    var elementYPosition = parseInt(style.top, 10);
    var offsetX = event.clientX - currentElement.lastXPosition;
    var offsetY = event.clientY - currentElement.lastYPosition;

    var elementNewXPosition = elementXPosition + (event.clientX - currentElement.lastXPosition);
    var elementNewYPosition = elementYPosition + (event.clientY - currentElement.lastYPosition);

    style.left = inPixels(elementNewXPosition);
    style.top = inPixels(elementNewYPosition);

    currentElement.lastXPosition = event.clientX;
    currentElement.lastYPosition = event.clientY;

    triggerEvent('drag', { x: elementNewXPosition, y: elementNewYPosition, mouseEvent: event, offsetX: offsetX, offsetY: offsetY });
}
/**
 * 移除监听
 * @param {*} event 
 */
function removeDocumentListeners(event) {
    document.removeEventListener('selectstart', cancelDocumentSelection);
    document.removeEventListener('mousemove', repositionElement);
    document.removeEventListener('mouseup', removeDocumentListeners);

    var left = parseInt(currentElement.style.left, 10);
    var top = parseInt(currentElement.style.top, 10);
    triggerEvent('stop', { x: left, y: top, mouseEvent: event });
}