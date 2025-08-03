package sn.uasz.m1.gl.ms_classe.controller;

import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import sn.uasz.m1.gl.ms_classe.entities.Classe;
import sn.uasz.m1.gl.ms_classe.services.ClasseService;

@Controller
@RequiredArgsConstructor
public class ClasseGraphqlController {

   private final ClasseService classeService;

    @QueryMapping
    public List<Classe> classes() {
        return classeService.getAll();
    }

    @QueryMapping
    public List<Classe> rechercheClasse(@Argument String libelle) {
        return classeService.searchByLibelle(libelle);
    }
}
