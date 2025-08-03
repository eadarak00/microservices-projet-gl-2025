package sn.uasz.m1.gl.ms_etudiant.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;
@Repository

public interface EtudiantRepository extends MongoRepository<Etudiant, String>  {


    List<Etudiant> findByPrenomStartingWithIgnoreCase(String prenom);

    // List<sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant> findByClasseId(String classeId);
    List<Etudiant> findByClasseId(String classeId);

}