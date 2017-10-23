/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
/**
 * 
 */
export default class DatePicker extends Component {
    /**
     * 渲染
     */
    render() {
        //
        let head = (
            <thead>
                <tr>
                    <th colspan="7" className="datepicker-title"></th>
                </tr>
                <tr>
                    <th className="prev">  &#x00AB; </th> {/* 箭头 */}
                    <th colspan="5" className="datepicker-switch"></th>
                    <th className="next">  &#x00BB;  </th> {/* 箭头 */}
                </tr>
            </thead>
        )
        //
        let content = (
            <tbody>
                <tr>
                    <td colspan="7">
                    </td>
                </tr>
            </tbody>
        )
        //
        let foot = (
            <tfoot>
                <tr>
                    <th colspan="7" className="today"></th>
                </tr>
                <tr>
                    <th colspan="7" className="clear"></th>
                </tr>
            </tfoot>
        )
        //
        let picker = (
            <div className="datepicker">
                <div className="datepicker-days">
                    <table className="table-condensed">
                        {head}
                        <tbody></tbody>
                        {foot}
                    </table>
                </div>
                <div className="datepicker-months">
                    <table className="table-condensed">
                        {head}
                        {content}
                        {foot}
                    </table>
                </div>
                <div className="datepicker-years">
                    <table className="table-condensed">
                        {head}
                        {content}
                        {foot}
                    </table>
                </div>
                <div className="datepicker-decades">
                    <table className="table-condensed">
                        {head}
                        {content}
                        {foot}
                    </table>
                </div>
                <div className="datepicker-centuries">
                    <table className="table-condensed">
                        {head}
                        {content}
                        {foot}
                    </table>
                </div>
            </div>
        )
    }
}
