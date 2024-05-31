package com.example.notesmanager.Controllers;

import com.example.notesmanager.Entity.Notes;
import com.example.notesmanager.Services.NoteService;
import org.apache.coyote.Response;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/notes")
public class NotesController {

    @Autowired
    private NoteService noteService;

    private final Logger logger = LoggerFactory.getLogger(NotesController.class);

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Notes>> get(){
        List<Notes> notes = this.noteService.find();
        return new ResponseEntity<List<Notes>>(notes, HttpStatus.OK);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Notes>> getById(@PathVariable Long id){
        try {
            Optional<Notes> note = this.noteService.findById(id);
            return new ResponseEntity<Optional<Notes>>(note, HttpStatus.OK);
        }catch (RuntimeException ex){
            logger.info(ex.getMessage());
            return new ResponseEntity<Optional<Notes>>(Optional.of(new Notes()), HttpStatus.NOT_FOUND);
        }
    }

    //CREATE
    @PostMapping
    public ResponseEntity<Notes> post(@RequestBody Notes newNote){
        Notes note = noteService.save(newNote);
        logger.info("posted successfully");
        return new ResponseEntity<Notes>(note, HttpStatus.CREATED);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Notes> update(@PathVariable Long id, @RequestBody Notes note) {
        try {
            noteService.update(note, id);
        }catch (RuntimeException ex){
            logger.info(ex.getMessage());
            return new ResponseEntity<Notes>((Notes) null, HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            logger.info(ex.getMessage());
            return new ResponseEntity<Notes>((Notes) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Notes>(note, HttpStatus.CREATED);
    }

    // DELETE BY ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        try {
            noteService.deleteById(id);
        }catch (RuntimeException ex){
            logger.info(ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found");
        }catch (Exception ex){
            logger.info(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
        }
        return ResponseEntity.ok("Successfully deleted");
    }
}
