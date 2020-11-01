const lessonUrl = "https://wbdv-generic-server.herokuapp.com/api/shilinzmax/lessons"
const TopicUrl = "https://wbdv-generic-server.herokuapp.com/api/shilinzmax/topcis"


export const findTopicsForLesson = (lessonId) =>
    fetch(`${lessonUrl}/${lessonId}/topics`)
        .then(response => response.json())

export const createTopicForLesson = (lessonId, topic) =>
    fetch(`${lessonUrl}/${lessonId}/topics`, {
        method: "POST",
        body: JSON.stringify(topic),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

export const deleteTopic = topicId =>
    fetch(`${TopicUrl}/${topicId}`,{
        method: "DELETE"
    }).then(response => response.json())

export const findTopicById = topicId =>
    fetch(`${TopicUrl}/${topicId}`)
        .then(response => response.json())


export const updateTopic = (topic) =>
{
    return fetch(`${TopicUrl}/${topic._id}`, {
        method: "PUT",
        body: JSON.stringify(topic),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())}


export default {
    findTopicsForLesson,
    createTopicForLesson,
    deleteTopic,
    updateTopic,
    findTopicById
}