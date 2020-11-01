import React from "react";
import '../style/course-editor.templete.client.css'
import '../style/style.css'

class PreviewBtn extends React.Component {
    render() {
        return (
            <div className="col-md-12 text-right">
                <button className="btn btn-info mr-3">Save</button>
                <label className="switch"/>
                    Preview
                    <input type="checkbox"/>
                        <span className="slider round"></span>
            </div>

        )
    }
}

export default PreviewBtn