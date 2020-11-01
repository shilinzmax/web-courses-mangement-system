import React from "react";
import {connect} from "react-redux";
import lessonService, {findLessonById} from "../services/LessonService";
import {Link} from "react-router-dom";

const LessonTabs = (
    {

        moduleId,
        course,
        lessons=[],
        createLessonForModule,
        deleteLesson,
        updateLesson
    }) =>
    <div className="row collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto wbdv-lst">
            {
                lessons.map(lesson =>
                        <li key={lesson._id} className="nav-item">
                            <div className="nav-link">
                                {
                                    !lesson.editing &&
                                    <span>
                                        <Link to={`/course/edit/${course._id}/modules/${moduleId}/lessons/${lesson._id}`}
                                        >
                                            {lesson.title}
                                        </Link>

                                        <button onClick={() =>
                                            updateLesson({...lesson, editing: true})
                                        }>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                      </span>
                                }
                                {   !lesson.editing &&
                                    <button onClick={() => deleteLesson(lesson._id)}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                }
                                {
                                    lesson.editing &&
                                    <span>
                                        <input onChange={(event) => updateLesson({
                                            ...lesson,
                                            title: event.target.value
                                        })}
                                               defaultValue={lesson.title}/>
                                               <button onClick={() =>
                                                   updateLesson({...lesson, editing: false})}>
                                                    <i className="fa fa-check"></i>
                                               </button>
                                      </span>
                                }
                            </div>
                        </li>
                )
            }
        </ul>
        { module !== null &&
            <button onClick={() => createLessonForModule(moduleId)}>
                <i className="fa fa-plus-square"></i>
            </button>
        }
    </div>


const stateToPropertyMapper = (state) => ({
    lessons: state.lessonReducer.lessons,
    moduleId: state.lessonReducer.moduleId,
    course:state.courseReducer.course,
    module: state.moduleReducer.module
})

const dispatchToPropertyMapper = (dispatch) => ({
    updateLesson: (newLesson) => {
        lessonService.updateLesson(newLesson).then(()=>findLessonById(newLesson._id)).then(actualLesson => {
            dispatch({
                type: "UPDATE_LESSON",
                lesson: actualLesson
            })})},

    findLessonById: (lessonId) => {
        return lessonService.findLessonById(lessonId)
    },

    deleteLesson: (lessonId) =>
        lessonService.deleteLesson(lessonId)
            .then(status => dispatch({
                type: "DELETE_LESSON",
                lessonId
            })),
    createLessonForModule: (moduleId) =>
        lessonService.createLessonForModule(
            moduleId, {
                title: "New Lesson"
            })
            .then(actualLesson => dispatch({
                type: "CREATE_LESSON_FOR_MODULE",
                lesson: actualLesson
            }))
})

export default connect
(stateToPropertyMapper,
    dispatchToPropertyMapper)
(LessonTabs)