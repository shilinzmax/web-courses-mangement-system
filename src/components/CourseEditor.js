import React from "react";
import {withRouter} from 'react-router-dom'
import '../style/course-editor.templete.client.css'
import '../style/style.css'
import 'font-awesome/css/font-awesome.css';
import ModuleListComponent from "./ModuleListComponent";
import {findCourseById} from "../services/CourseService";
import {connect} from "react-redux";
import moduleService, {findModuleById, findModulesForCourse} from "../services/ModuleService";
import LessonTabComponent from "./LessonTabComponent";
import TopicPillsComponent from "./TopicPillsComponent"
import lessonService, {findLessonById} from "../services/LessonService"
import topicService from "../services/TopicService"
import WidgetComponent from "./WidgetComponent";
import widgetService from "../services/WidgetService";

class CourseEditor extends React.Component {
    componentDidMount() {
        const courseId = this.props.match.params.courseId
        const moduleId = this.props.match.params.moduleId
        const lessonId = this.props.match.params.lessonId
        const topicId = this.props.match.params.topicId
        console.log("ComponentDidMount topicId", topicId)
        this.props.findCourseById(courseId)
        this.props.findModuleById(moduleId)
        this.props.findLessonById(lessonId)
        this.props.findModulesForCourse(courseId)
        // this.props.findWidgetsForTopic(topicId)
        if(moduleId) {
            this.props.findLessonsForModule(moduleId)
        }
        if (lessonId) {
            this.props.findTopicsForLesson(lessonId)
        }

        if (topicId) {
            console.log("!topicId", topicId)
            this.props.findWidgetsForTopic(topicId)
        }

        // if (topicId) {
        //     this.props.findWidgetsForTopic(topicId)
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const moduleId = this.props.match.params.moduleId
        const lessonId = this.props.match.params.lessonId
        const topicId = this.props.match.params.topicId

        if(moduleId !== prevProps.match.params.moduleId) {
            this.props.findLessonsForModule(moduleId)
        }

        if(lessonId !== prevProps.match.params.lessonId) {
            this.props.findTopicsForLesson(lessonId)
        }

        if(topicId !== prevProps.match.params.topicId) {
            this.props.findWidgetsForTopic(topicId)
        }

        // if(topicId !== prevProps.match.params.topicId) {
        //     this.props.findWidgetsForTopic(topicId)
        // }
    }

    render() {
        if (this.props.course === null) {
            return null;
        }

        return(
            <div className='container'>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light wbdv-nav">
                    <span className="navbar-brand mx-auto mr-md-5 wbdv-course-title">
                            <a href="/" className="mr-3 wbdv-close1">
                                <i className="fa fa-times"></i>
                            </a>
                            {this.props.course.title}


                    </span>
                    {/*<LessonTabs*/}
                    {/*    course={this.props.course}*/}
                    {/*/>*/}
                    <LessonTabComponent/>

                </nav>


                <div className="container-fluid widget-container">
                    <div className="row">
                        <ModuleListComponent/>

                        <div className="col-md-9 topic-list">
                            <div className="row">

                            <TopicPillsComponent/>

                            {/*preview button and widgets here*/}
                            <WidgetComponent/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


const stateToPropertyMapper = (state) => ({
    course: state.courseReducer.course,
})

const propertyToDispatchMapper = (dispatch) => ({
    findLessonById: (lessonId) => findLessonById(lessonId)
        .then(actualLesson => dispatch({
            type: "SET_LESSON",
            lesson: actualLesson
        })),

    findModuleById: (moduleId) => findModuleById(moduleId)
        .then(actualModule => dispatch({
            type: "SET_MODULE",
            module: actualModule
        })),

    findCourseById: (courseId) => findCourseById(courseId)
        .then(actualCourse => dispatch({
            type: "SET_COURSES",
            course: actualCourse
        })),
    findModulesForCourse: (courseId) => moduleService.findModulesForCourse(courseId)
        .then(actualModules => dispatch({
            type: "FIND_MODULES_FOR_COURSE",
            modules: actualModules
        })),
    findLessonsForModule: (moduleId) =>
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons,
                moduleId
            })),

    findTopicsForLesson: (lessonId) =>
        topicService.findTopicsForLesson(lessonId)
            .then(topics => dispatch({
                type:"FIND_TOPICS_FOR_LESSON",
                topics,
                lessonId
            })),

    findWidgetsForTopic: (topicId) => {
        console.log("findWidgetsForTopic", topicId)
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => dispatch({
                type: "FIND_WIDGETS_FOR_TOPIC",
                widgets,
                topicId
            }))
    }

})

const connectBoth = connect(stateToPropertyMapper, propertyToDispatchMapper)(CourseEditor)

export default withRouter(connectBoth)

