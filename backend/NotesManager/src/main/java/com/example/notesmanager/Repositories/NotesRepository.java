package com.example.notesmanager.Repositories;

import com.example.notesmanager.Entity.Notes;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

}

