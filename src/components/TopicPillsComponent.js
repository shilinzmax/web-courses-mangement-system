import React from "react";
import {connect} from "react-redux";
import lessonService, {findLessonById} from "../services/LessonService";
import TopicService, {findTopicById} from "../services/TopicService";
import {Link} from "react-router-dom";


const TopicPills = (
    {
        lessonId,
        topics=[],
        course,
        moduleId,
        createTopicForLesson,
        deleteTopic,
        updateTopic,
    }) =>
    <div className="col-md-12">
        <ul className="nav nav-pills wbdv-topic-pill-list">
            <li className="nav-item mr-4 mb-4 wbdv-topic-pill"></li>
            <li className="nav-item mr-4 mb-4 wbdv-topic-pill"></li>
            {
                topics.map(topic =>
                    <li key={topic._id} className="nav-item mr-4 mb-4 wbdv-topic-pill">
                        {!topic.editing &&
                            <span>
                                <Link to={`/course/edit/${course._id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                >
                                {topic.title}
                                </Link>
                                <button onClick={() =>
                                    updateTopic({...topic, editing: true})}>
                                <i className="fa fa-pencil"></i>
                                </button>
                            </span>
                        }
                        {!topic.editing &&
                            <button onClick={() => deleteTopic(topic._id)}>
                                <i className="fa fa-times"></i>
                            </button>
                        }
                        {topic.editing &&
                            <span>
                                <input onChange={(event) => updateTopic({
                                    ...topic,
                                    title: event.target.value
                                })}
                                       defaultValue={topic.title}/>
                                <button onClick={() =>
                                    updateTopic({...topic, editing: false})}>
                                    <i className="fa fa-check"></i>
                                </button>
                            </span>
                        }
                    </li>
                )}
            <button onClick={() => createTopicForLesson(lessonId)}>
                <i className="fa fa-plus-square"></i>
            </button>

        </ul>
    </div>

const stateToPropertyMapper = (state) => ({
    lessonId: state.topicReducer.lessonId,
    course:state.courseReducer.course,
    topics: state.topicReducer.topics,
    moduleId: state.lessonReducer.moduleId
})

const dispatchToPropertyMapper = (dispatch) => ({
    updateTopic: (newTopic) => {
        TopicService.updateTopic(newTopic).then(()=>findTopicById(newTopic._id)).then(actualTopic => {
            dispatch({
                type: "UPDATE_TOPIC",
                topic: actualTopic
            })})},

    findTopicById: (topicId) => {
        return TopicService.findTopicById(topicId)
    },

    createTopicForLesson: (lessonId) =>
        TopicService.createTopicForLesson(
            lessonId, {
                title: "New Topic"
            })
            .then(actualTopic => dispatch({
                type: "CREATE_TOPIC_FOR_LESSON",
                topic: actualTopic
            })),

    deleteTopic: (topicId) =>
        TopicService.deleteTopic(topicId)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topicId
            })),
})

export default connect
(stateToPropertyMapper,
    dispatchToPropertyMapper)
(TopicPills)