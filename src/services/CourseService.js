const url = "https://wbdv-generic-server.herokuapp.com/api/shilinzmax/courses"

export const findAllCourses = () =>
    fetch(url).then(response => response.json())

export const createCourse = (newCourse) =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(newCourse),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
//`${url}/${courseId}`
export const deleteCourse = (courseId) =>
    fetch(url + '/' + courseId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())


export const updateCourse = (courseId, newCourse) => {
    return fetch(`${url}/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(newCourse),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const findCourseById = (courseId) => {
    return fetch(`${url}/${courseId}`).then(response => response.json());
}