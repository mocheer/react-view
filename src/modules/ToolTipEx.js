/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.4.18
 */
import ToolTip from '../components/ToolTip'

export default class ToolTipEx extends ToolTip {
    constructor(props) {
        super(props);
        T && T.on('tooltip', data => {
            if (data && data.hide == true) {
                data.target = data.style = null
                delete data.hide;
            }
            this.setState(data)
        })
    }
}