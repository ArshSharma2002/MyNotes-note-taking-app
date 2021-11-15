const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1 : Get All Notes using GET "/api/notes/fetchAllNotes" . Login required .
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    // req.user is fetched from fetchUser middleware .
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);

  } catch (error) {
    console.error(error.message);
    res.status(400).send("Some Error Occured.");
  }
});

//Route 2 : Add Notes using POST "/api/notes/addnotes" . Login required .
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charcters.")
      .isString()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    // destructuring 
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        
      notes = await Notes.create({
          title: title,      // we can also write it as req.body.title but here we are using destructuring .
          description: description,
          tag: tag,
          // req.user.id will provide the id of the user who is logged in (using middleware)
          user : req.user.id
        });
        
        res.json(notes);

    //   const note = new Notes({
    //     title ,
    //     description , 
    //     tag , 
    //     user : req.user.id
    //   });

    //   const savedNote = await note.save();

    //   res.json(savedNote);

    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some Error Occured.");
    }
  }
);

//Route 3 : Update an existing Note using POST/PUT "/api/notes/updatenotes/:id (id of the existing note)" . Login required .
router.put(
  "/updatenotes/:id",
  fetchUser,
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // creating a newNote object .
        const newNote = {}
        // we are changing the title of the newNote with the title we have recieved in req.body by the logged in user .
        // this can also be written as "req.body.title" .
        if(title){ newNote.title = title };
        if(description){ newNote.description = description };
        if(tag){ newNote.tag = tag };
     
        // req.params.id is the id we have provided in the url (i.e) "/api/notes/updatenotes/:id" .
        let note = await Notes.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not Found!");
        }

        // req.user.id is the id of the user which is logged in .
        if(note.user.toString() !== req.user.id){
          return res.status(401).send("Access Denied !");
        }

        // req.params.id is the id of the existing note which we have to update .
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote} , {new:true} );

        res.json({note});

    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some Error Occured.");
    }
  }
);

//Route 4 : Delete an existing Note using DELETE "/api/notes/deletenotes/:id" . Login required .
router.delete(
  "/deletenotes/:id",
  fetchUser,
  async (req, res) => {
    // const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
     
        // req.params.id is the id we have provided in the url (i.e) "/api/notes/deletenotes/:id" .
        let note = await Notes.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not Found!");
        }

        // req.user.id is the id of the user which is logged in .
        if(note.user.toString() !== req.user.id){
          return res.status(401).send("Access Denied !");
        }

        // req.params.id is the id of the existing note which we have to update .
        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({"Success": "Note has been deleted" , note});

    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some Error Occured.");
    }
  }
);

module.exports = router;
