const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticationToken } = require("./auth");

//Create-Task
router.post("/create-task", authenticationToken, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;
        const newTask = new Task({ title: title, desc: desc });
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
        return res.status(200).json({ message: "Task Created Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
});

//Get All Task 
router.get("/get-all-tasks", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ path: "tasks", options: { sort: { createdAt: -1 } } });
        return res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})

//Delete Tasks
router.delete("/delete-task/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

        return res.status(200).json({ message: "Task Deleted Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})

//Update Tasks
router.put("/update-task/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Task.findByIdAndUpdate(id, { title: title, desc: desc });

        return res.status(200).json({ message: "Task Updated Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})

//Update Important Tasks
router.put("/update-imp-task/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, { important: !ImpTask });
        return res.status(200).json({ message: "Task Updated Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})

//Update Completed Tasks
router.put("/update-complete-task/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
        return res.status(200).json({ message: "Task Updated Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})

//Get Important Task 
router.get("/get-imp-tasks", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { important: true }, options: { sort: { createdAt: -1 } } });
        const ImpTaskData = Data.tasks;
        return res.status(200).json({ data: ImpTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})


//Get Completed Task 
router.get("/get-complete-tasks", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: true }, options: { sort: { createdAt: -1 } } });
        const CompTaskData = Data.tasks;
        return res.status(200).json({ data: CompTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})


//Get InCompleted Task 
router.get("/get-incomplete-tasks", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: false }, options: { sort: { createdAt: -1 } } });
        const InCompTaskData = Data.tasks;
        return res.status(200).json({ data: InCompTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error!" });
    }
})
module.exports = router;