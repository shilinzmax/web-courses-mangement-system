import React from "react";
import {findAllCourses, updateCourse, deleteCourse, createCourse, findCourseById} from "../services/CourseService";
import 'bootstrap/dist/css/bootstrap.css'
import CourseTable from "./CourseTable";
import CourseGrid from "./CourseGrid";
import 'font-awesome/css/font-awesome.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import '../style/style.css'
import '../style/course-editor.templete.client.css'



import './CourseManager.css'
import CourseRow from "./CourseRow";
import CourseEditor from "./CourseEditor";

class CourseManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            title: '',
            rowGrid: false,
            selectedCourse: '',
            selectedId: '',

    }
        this.updateForm = this.updateForm.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.updateCourses = this.updateCourses.bind(this);
        this.tableGrid = this.tableGrid.bind(this);
        this.renderTableGrid = this.renderTableGrid.bind(this)
        this.selectCourse = this.selectCourse.bind(this)
        this.selectCourseById = this.selectCourseById.bind(this)
    }

    updateForm = event =>
        this.setState({
            title: event.target.value.trim()
        })

    updateCourses() {
        findAllCourses()
            .then(courses => {
                this.setState({
                    courses: courses
                })
            })
    }

    componentDidMount() {
        this.updateCourses();
    }

    deleteCourse = async (course) => {
        await deleteCourse(course._id).then(async status => await this.setState(prevState => ({
                courses: prevState.courses.filter(c => c._id !== course._id)
            })
        )).catch(error => {

        })
    }

    addCourse() {
        const newCourse = {
            title: this.state.title,
            topics:[{'title':'topic 1'},{'title':'topic 2'},{'title':'topic 3'},{'title':'topic 4'}],
            modules: ['Module 1: HTML/CSS', 'Module 2: jQuery', 'Module 3: React'
             , 'Module 4: Redux', 'Module 5: Angular', 'Module 6: Node', 'Module 7: Mongo'],
            lessons:[],
            owner: "me",
            modified: (new Date()).toDateString(),
        }


        createCourse(newCourse)
            .then(actualCourse => this.setState(prevState => ({
                courses: [
                    ...prevState.courses, actualCourse
                ]
            })))
    }


    tableGrid() {
        if (this.state.rowGrid === true) {
            this.setState({rowGrid: false}
            );
        } else {
            this.setState({rowGrid: true});

        }
    }



    renderTableGrid() {
        if (this.state.rowGrid === true) {
            return <CourseGrid
                deleteCourse={this.deleteCourse}
                courses={this.state.courses}
                course={this.selectedCourse}
                selectCourse={this.selectCourse}
                selectCourseById={this.selectCourseById}
                updateCourses={this.updateCourses}/>
        } else if (this.state.rowGrid === false) {
            return <CourseTable
                deleteCourse={this.deleteCourse}
                courses={this.state.courses}
                course={this.selectedCourse}
                selectCourseById={this.selectCourseById}
                selectCourse={this.selectCourse}
                updateCourses={this.updateCourses}/>
        }

    }

    selectCourse = course =>
        this.setState({selectedCourse: course})

    selectCourseById(courseId) {
        return findCourseById(courseId).then(course => {
            this.setState({
                course: course
            })
        })

    }

    render() {
        return (
            <Router>

            <Switch>
                <Route exact
                    path="/course/edit/:courseId"
                    render={() =>
                        <CourseEditor course={this.selectedCourse}/>}
                    />
                <Route exact
                    path="/course/edit/:courseId/modules/:moduleId"
                    render={() =>
                        <CourseEditor course={this.selectedCourse}/>}
                />

                <Route exact
                       path="/course/edit/:courseId/modules/:moduleId/lessons/:lessonId"
                       render={() =>
                           <CourseEditor course={this.selectedCourse}/>}
                />

                <Route exact
                       path="/course/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId"
                       render={() =>
                           <CourseEditor course={this.selectedCourse}/>}
                />



                <Route path="/">
                    <div>
                        <nav className="navbar fixed-top navbar-light custom-navbar">
                            <button className="navbar-toggler mr-2 wbdv-field wbdv-hamburger"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarNavDropdown">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="navbar-brand d-none d-sm-block wbdv-label wbdv-course-manager" href="#">
                                Course Manager
                            </a>
                            <form className="form-inline mr-auto wbdv-new-course"
                                  action="../course-editor/course-editor.templete.client.html">
                                <input className="form-control mr-sm-2"
                                       type="text"
                                       id="navBarSearchForm"
                                       onChange={this.updateForm}
                                       placeholder="New Course Title"/>

                                <a href="#">
                                    <i
                                        onClick={this.addCourse}
                                        className="fa fa-plus-circle fa-3x addCourse wbdv-button wbdv-add-course">
                                    </i>
                                </a>
                            </form>
                        </nav>
                        {/*start*/}
                        <div className="course-header d-none d-md-block">
                            <div className="row">
                                <div className="col-md-1   wbdv-title">
                                    Title
                                </div>
                                <div className="col-md-2 btn-group wbdv-owner">
                                    <a className="dropdown-toggle" href="#"
                                       id="dropdownMenuLink" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        Owned By
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#">Owned by me </a>
                                        <a className="dropdown-item" href="#">Owned by other</a>
                                        <a className="dropdown-item" href="#">Owned by professor</a>
                                    </div>
                                </div>
                                <div className="col-md-3 wbdv-last-modified">
                                    Last modified by me
                                </div>

                                <div className="col-md-3">
                                    <button className="grid-view-link wbdv-grid-layout"
                                            onClick={this.tableGrid}>

                                        <i className="fa fa-th-large"></i>
                                    </button>
                                </div>


                                <div className="col-md-1">
                                    <a className="dropdown-toggle" href="#"
                                       id="dropdownMenuSortLink" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-font"></i>
                                    </a>
                                    <div className="dropdown-menu wbdv-sort" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#">Sorted by A-Z </a>
                                        <a className="dropdown-item" href="#">Sorted by Z-A</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {this.renderTableGrid()}
                    </div>

                </Route>
            </Switch>


        </Router>)
    }
}

export default CourseManager