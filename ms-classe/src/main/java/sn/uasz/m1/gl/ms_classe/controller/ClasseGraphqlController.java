package sn.uasz.m1.gl.ms_classe.controller;

import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import sn.uasz.m1.gl.ms_classe.client.EtudiantGrpcClient;
import sn.uasz.m1.gl.ms_classe.entities.Classe;
import sn.uasz.m1.gl.ms_classe.services.ClasseService;
import sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant;

@Controller
@RequiredArgsConstructor
public class ClasseGraphqlController {

   private final ClasseService classeService;

    private final EtudiantGrpcClient etudiantGrpcClient;


    @QueryMapping
    public List<Classe> classes() {
        return classeService.getAll();
    }

    @QueryMapping
    public Classe recherche(@Argument String id) {
        return classeService.getById(id);
    }

    @QueryMapping
    public List<Classe> rechercheClasse(@Argument String libelle) {
        return classeService.searchByLibelle(libelle);
    }

    @QueryMapping
    public List<Etudiant> etudiantsByClasseId(@Argument String classeId) {
        System.out.println("📨 Requête gRPC envoyée avec classeId = " + classeId);
        return etudiantGrpcClient.getEtudiantsByClasseId(classeId).getEtudiantsList();
    }

    @QueryMapping
    public List<Etudiant> etudiantsByClasseLibelle(@Argument String libelle) {
        // Trouver la classe dans MongoDB
        Classe classe = classeService.findByLibelle(libelle);

        if (classe == null) {
            return List.of(); // ou tu peux lever une exception
        }

        // Appel gRPC pour obtenir les étudiants liés à cette classe
        return etudiantGrpcClient
                .getEtudiantsByClasseId(classe.getId())
                .getEtudiantsList();
    }


}
