import React from "react";
import {connect} from "react-redux";
import moduleService from "../services/ModuleService"
import {Link} from "react-router-dom";

const ModuleListComponent = (
    {
        course={},
        module,
        modules=[],
        deleteModule,
        createModule,
        updateModule,
        edit,
        ok,
    }) =>
    <div className="col-md-3 wbdv-module-list text-center">
        <ul className="nav flex-column nav-pills module-list-pill">
            {
                modules.map(module =>
                        <li key={module._id}>
                            <div className=" nav-link wbdv-module-item-title mr-2 mb-4" href="#">
                            {
                                !module.editing &&
                                <span>
                                  <Link to={`/course/edit/${course._id}/modules/${module._id}`}
                                        onClick={()=>updateModule(module)}
                                  >

                                    {module.title}
                                  </Link>
                                    <button onClick={() => edit(module)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                </span>
                            }
                            {
                                module.editing &&
                                <span>
                                    <input
                                        onChange={(event) => updateModule({
                                            ...module,
                                            title: event.target.value
                                        })}
                                        value={module.title}/>

                                        <button onClick={() => ok(module)}>
                                            <i className="fa fa-check"></i>
                                        </button>
                                  </span>
                            }
                                {!module.editing &&
                                <button
                                    onClick={() => deleteModule(module)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                }
                            </div>
                        </li>
                )
            }
        </ul>
        <button
            onClick={() => createModule(course)}>
            <i className="fa fa-plus-square"></i>
        </button>
    </div>


// export default ModuleListComponent

const stateToPropertyMapper = (state) => ({
    modules: state.moduleReducer.modules,
    course: state.courseReducer.course,
    module: state.moduleReducer.module
})

const propertyToDispatchMapper = (dispatch) => ({
    ok: (module) =>
        moduleService.updateModule(module._id, {
            ...module, editing: false
        }).then(status => dispatch({
            type: "UPDATE_MODULE",
            module: {...module, editing: false}
        })),
    edit: (module) =>
        moduleService.updateModule(module._id, {
            ...module, editing: true
        }).then(status =>
            dispatch({
                type: "UPDATE_MODULE",
                module: {...module, editing: true}
            })),
    deleteModule: (module) =>
        moduleService.deleteModule(module._id)
            .then(status => dispatch({
                type: "DELETE_MODULE",
                module: module
            })),
    createModule: (course) =>
        moduleService.createModuleForCourse(course._id, {
            title: "New Module"
        }).then(actualModule => dispatch({
            type: "CREATE_MODULE",
            module: actualModule
        })),
    updateModule: (module) =>
        dispatch({
            type: "UPDATE_MODULE",
            module: module
        })
    // moduleService.updateModule(module._id, module)
    //   .then(status => dispatch({
    //     type: "UPDATE_MODULE",
    //     module: module
    //   }))
})

export default connect
( stateToPropertyMapper,
    propertyToDispatchMapper)
(ModuleListComponent)