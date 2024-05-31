package com.example.notesmanager.Services;

import com.example.notesmanager.Entity.Notes;
import com.example.notesmanager.Repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NotesRepository notesRepository;

    public Notes save(Notes note) {
        notesRepository.save(note);
        return note;
    }

    public List<Notes> find() {
        return notesRepository.findAll();
    }

    public Optional<Notes> findById(Long id) {
        return Optional.ofNullable(
                notesRepository.findById(id).orElseThrow(
                        () -> new RuntimeException("Note not found in Get by id method")
                )
        );
    }

    public Notes update(Notes newNote, Long id) throws Exception {
        notesRepository.findById(id)
                .map(note -> {
                    note.setNoteName(newNote.getNoteName());
                    note.setDate(newNote.getDate());
                    note.setDescription(newNote.getDescription());
                    return notesRepository.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found in PUT method"));
        return newNote;
    }

    public void deleteById(Long id) {
        Optional<Notes> note = notesRepository.findById(id);
        if(note.isEmpty()) {
            throw new RuntimeException("Note not found");
        }
        else{
            notesRepository.deleteById(id);
        }
    }
}
