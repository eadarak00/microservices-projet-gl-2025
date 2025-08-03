package sn.uasz.m1.gl.ms_classe.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import sn.uasz.m1.gl.ms_classe.entities.Classe;

@Repository
public interface ClasseRepository extends MongoRepository<Classe, String> {
    List<Classe> findByLibelleContainingIgnoreCase(String libelle);

    Classe findByLibelle(String libelle);
}