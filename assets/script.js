document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".btn-group .btn");

    const API_URL = "http://localhost:5000/api/tasks";

    // Function to fetch and display tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const tasks = await response.json();
            displayTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Function to display tasks
    const displayTasks = (tasks) => {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "task-item");
    
            // Task Text Container (To allow editing)
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("d-flex", "flex-column", "flex-grow-1");
    
            // Task Text (Title)
            const taskText = document.createElement("span");
            taskText.textContent = task.title;
            taskText.classList.add("task-text");
            if (task.completed) taskText.classList.add("completed");
    
            // Task Timestamp (Added X minutes ago)
            const taskTime = document.createElement("small");
            taskTime.classList.add("text-muted");
            taskTime.textContent = formatTimeAgo(task.created_at); // Convert timestamp
    
            // Append text and time to container
            taskContainer.appendChild(taskText);
            taskContainer.appendChild(taskTime);
    
            let clickTimer = null;
    
            // Single Click (Toggle Completion)
            taskText.addEventListener("click", () => {
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                } else {
                    clickTimer = setTimeout(async () => {
                        await toggleTaskCompletion(task.id);
                        clickTimer = null;
                    }, 300);
                }
            });
    
            // Double Click (Edit Task)
            taskText.addEventListener("dblclick", () => {
                clearTimeout(clickTimer);
                clickTimer = null;
                editTask(task, taskText, taskTime); // Pass the time element for restoration
            });
    
            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
            deleteBtn.innerHTML = "✘";
            deleteBtn.addEventListener("click", async () => {
                await deleteTask(task.id);
            });
    
            // Append Elements
            taskItem.appendChild(taskContainer);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    };
    
    
    
    // Function to format time ago
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
    
        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };
    

    // Function to add a new task
    addTaskBtn.addEventListener("click", async () => {
        const title = taskInput.value.trim();
        if (!title) return alert("Task cannot be empty!");

        addTaskBtn.textContent = "Saving...";
        setTimeout(async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title })
                });

                if (response.ok) {
                    taskInput.value = "";
                    await fetchTasks();
                }
            } catch (error) {
                console.error("Error adding task:", error);
            } finally {
                addTaskBtn.textContent = "Add";
            }
        }, 1000); // Simulating 1s network delay
    });

    // Function to delete a task
    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            await fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Function to toggle task completion
    const toggleTaskCompletion = async (id) => {
        try {
            await fetch(`${API_URL}/${id}/toggle`, { method: "PUT" });
            await fetchTasks();
        } catch (error) {
            console.error("Error toggling completion:", error);
        }
    };

    // Function to edit a task inline
    const editTask = (task, taskText, taskTime) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.title;
        input.classList.add("form-control", "form-control-sm");
    
        // Find the parent task item
        const taskItem = taskText.closest(".task-item");
    
        // Find the delete button inside the task item
        const deleteBtn = taskItem.querySelector("button");
    
        // Hide the delete button while editing
        deleteBtn.style.display = "none";
        
        // Hide timestamp while editing
        taskTime.style.display = "none";
    
        // Function to save the edited task
        const saveEdit = async () => {
            const newTitle = input.value.trim();
            if (newTitle && newTitle !== task.title) {
                try {
                    await fetch(`${API_URL}/${task.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: newTitle })
                    });
                    await fetchTasks(); // Refresh the task list
                } catch (error) {
                    console.error("Error updating task:", error);
                }
            }
    
            // Show delete button again after saving
            deleteBtn.style.display = "block";
    
            // Show timestamp again
            taskTime.style.display = "block";
    
            input.replaceWith(taskText); // Restore original text after saving
        };
    
        // Save on blur (clicking outside)
        input.addEventListener("blur", saveEdit);
    
        // Save on Enter key
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                saveEdit();
            }
        });
    
        // Cancel edit on Escape key
        input.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                deleteBtn.style.display = "block"; // Show delete button again
                taskTime.style.display = "block"; // Restore timestamp
                input.replaceWith(taskText); // Restore original text
            }
        });
    
        taskText.replaceWith(input);
        input.focus();
    };
    
    
    // // Function to update a task
    // const updateTask = async (id, newTitle) => {
    //     if (!newTitle.trim()) return;
    //     try {
    //         await fetch(`${API_URL}/${id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ title: newTitle })
    //         });
    //         await fetchTasks();
    //     } catch (error) {
    //         console.error("Error updating task:", error);
    //     }
    // };

    // Function to filter tasks
    filterButtons.forEach(button => {
        button.addEventListener("click", async () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.id.replace("filter", "").toLowerCase();
            const response = await fetch(API_URL);
            let tasks = await response.json();

            if (filter === "completed") {
                tasks = tasks.filter(task => task.completed);
            } else if (filter === "incomplete") {
                tasks = tasks.filter(task => !task.completed);
            }

            displayTasks(tasks);
        });
    });

    const searchInput = document.getElementById("searchInput");

    let debounceTimer;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const query = searchInput.value.toLowerCase();
            const response = await fetch(API_URL);
            let tasks = await response.json();

            tasks = tasks.filter(task => task.title.toLowerCase().includes(query));
            displayTasks(tasks);
        }, 300); // Delay to prevent excessive API calls
    });


    // Initial Fetch
    fetchTasks();
});
