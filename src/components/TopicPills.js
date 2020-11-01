import React from "react";
import 'font-awesome/css/font-awesome.css';
import '../style/course-editor.templete.client.css'
import '../style/style.css'


class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course:this.props.course,
            key:0
        }
    }

    render() {
        if (this.state.course === null) {
            return null;
        }
        return (
            <div className="col-md-12">
                <ul className="nav nav-pills wbdv-topic-pill-list">
                    <li className="nav-item mr-4 mb-4 wbdv-topic-pill"></li>
                    <li className="nav-item mr-4 mb-4 wbdv-topic-pill"></li>
                    {this.state.course.topics.map(topic => {
                        this.state.key++;
                        return <div>
                            <li className="nav-item mr-4 mb-4 wbdv-topic-pill">
                                <a className="nav-link" href="#" key={this.state.key}>{topic.title}
                                </a>
                            </li>
                        </div>

                    })}
                    <li className="nav-item mr-4 mb-4 wbdv-topic-pill wbdv-topic-add-btn">
                        <a className="nav-link" href="#"><i className="fa fa-plus"></i></a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default TopicPills