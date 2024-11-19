import { useState } from 'react';

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectState] = useState({ //This state controls which component is displayed.
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks] 
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    })
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData, //Spread the object data, title, description & dueDate into this new object, newProject
        id: projectId //The id will be important for selecting a project
      };

      return {
        ...prevState, //idg this, I think this will just return the previous state that isn't changing e.g the task for instance is not updated and we don't want it to go back to its initial state when it reloads.
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }


  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId //Note that this is prevState not projectState cause we can't use projectState again when we're updating it.
        ),
      };
    });
  }


  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected
      onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;


/**
 * <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
 * 
 *  selectedProjectId: undefined,  //its undefined is used above if we are not adding any new 
 * project or we did not select any project but it should change to null if we want to add a new project 
 * 
 * const newProject = { //New project will now be newProject = {title:..., description:..., dueDate:... }
 * 
 * 
 * return {
        ...prevState, // Spread all properties from the previous state to the new state object
        
 * 
 * CODE LOGIC
 projectsState = {
    selectedProjectId: 2, // The user has selected the project with id 2
    projects: [
        { id: 1, title: "Project One", description: "First project", dueDate: "2024-12-01" },
        { id: 2, title: "Project Two", description: "Second project", dueDate: "2024-12-10" },
        { id: 3, title: "Project Three", description: "Third project", dueDate: "2024-12-15" }
    ]
}
 */