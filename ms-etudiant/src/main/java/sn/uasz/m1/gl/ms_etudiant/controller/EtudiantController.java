package sn.uasz.m1.gl.ms_etudiant.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;
import sn.uasz.m1.gl.ms_etudiant.service.EtudiantService;

@RestController  
 
public class EtudiantController {

    @Autowired
    private EtudiantService service;

    // @GetMapping
    // public ResponseEntity<List<Etudiant>> listerEtudiant(){
    //     List<Etudiant> EtudiantList = service.lister();
    //     return new ResponseEntity<>(EtudiantList, HttpStatus.OK);
    // }

    @PostMapping("/")
    public ResponseEntity<Etudiant> ajouterEtudiant(@RequestBody Etudiant p){
        service.ajouter(p);
        return new ResponseEntity<>(p, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerEtudiant(@PathVariable String id){
        service.supprimer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
         

}

