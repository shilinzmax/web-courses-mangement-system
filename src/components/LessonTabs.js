import React from "react";
import '../style/course-editor.templete.client.css'
import '../style/style.css'
import 'font-awesome/css/font-awesome.css';

class LessonTabs extends React.Component {
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

        return(
            <div className="row collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto wbdv-lst">
                    <li className="nav-item mr-5"></li>
                    {this.state.course.lessons.map(lesson => {
                        this.state.key++;
                        return <div>
                            <li className="nav-item mr-4">
                                <a className="nav-link" href="#" key={this.state.key}>{lesson.title}</a>
                            </li>
                        </div>

                    })}
                </ul>

                <span className="navbar-brand mx-auto mr-md-5">
                    <a href="#" className="mr-3 wbdv-close2">
                        <i className="fa fa-plus"></i>
                    </a>
                </span>


            </div>
        )
    }
}

export default LessonTabs