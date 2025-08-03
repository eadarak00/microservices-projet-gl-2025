package sn.uasz.m1.gl.ms_etudiant.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;
import sn.uasz.m1.gl.ms_etudiant.service.EtudiantService;

@Controller
public class EtudiantGraphqlController {

    @Autowired
    private EtudiantService service;

    @QueryMapping
    public List<Etudiant> etudiants() {
        return service.lister();
    }

    @QueryMapping
    public Etudiant rechercherEtudiant(@Argument String id) {
        return service.rechercher(id);
    }

    @QueryMapping
    public List<Etudiant> etudiantsParPrenom(@Argument String prenom) {
        return service.rechercherParPrenom(prenom);
    }
}