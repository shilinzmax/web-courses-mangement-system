const WIDGET_URL = "http://localhost:8080/api/widgets"
const TOPIC_URL = "http://localhost:8080/api/topics"

export const findWidgetsForTopic = (tid) =>
    fetch(`https://pacific-wildwood-86093.herokuapp.com/api/topics/${tid}/widgets/`)
        .then(response => response.json());

export const updateWidget = (widget) =>
    fetch(`https://pacific-wildwood-86093.herokuapp.com/api/widgets/${widget.id}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json());

export const findAllWidgets = () =>
    fetch("https://pacific-wildwood-86093.herokuapp.com/api/widgets")
        .then(response => response.json());

export const deleteWidget = (widget) =>
    fetch(`https://pacific-wildwood-86093.herokuapp.com/api/widgets/${widget.id}`, {
        method: "DELETE"
    }).then(response => response.json());

export const findWidgetById = widgetId =>
    fetch(`https://pacific-wildwood-86093.herokuapp.com/api/widgets/${widgetId}`)
        .then(response => response.json())

export const createWidgetForTopic = async (tid, widget) => {
    console.log("createWidgetForTopic tid", tid);
    const response = await fetch(`https://pacific-wildwood-86093.herokuapp.com/api/topics/${tid}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    });
    const response2 = await response.json();
    console.log(response2)
    return response2
}


export default {
    createWidgetForTopic,
    deleteWidget,
    findAllWidgets,
    updateWidget,
    findWidgetsForTopic,
    findWidgetById
}