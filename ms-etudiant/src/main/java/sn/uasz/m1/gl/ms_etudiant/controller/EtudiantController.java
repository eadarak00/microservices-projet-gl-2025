package sn.uasz.m1.gl.ms_etudiant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;
import sn.uasz.m1.gl.ms_etudiant.service.EtudiantService;


@RestController
public class EtudiantController {

    @Autowired
    private EtudiantService service;

  
    // Ajoute un étudiant
    @PostMapping("/")
    public ResponseEntity<Etudiant> ajouterEtudiant(@RequestBody Etudiant etudiant) {
        Etudiant etudiantCree = service.ajouter(etudiant);
        return new ResponseEntity<>(etudiantCree, HttpStatus.CREATED);
    }

    // Modifie un étudiant existant
    @PutMapping("/{id}")
    public ResponseEntity<Etudiant> modifierEtudiant(@PathVariable String id, @RequestBody Etudiant etudiant) {
        etudiant.setId(id);  // s'assurer que l'id est correct
        Etudiant etudiantModifie = service.modifier(id, etudiant);
        return new ResponseEntity<>(etudiantModifie, HttpStatus.OK);
    }

    // Supprime un étudiant
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerEtudiant(@PathVariable String id) {
        service.supprimer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
