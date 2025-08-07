package sn.uasz.m1.gl.ms_etudiant.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
//import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "etudiants")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Etudiant {

    @Id
    private String id;
    private String matricule;
    private String nom;
    private String prenom;
    private String telephone;
    private String adresse;
    private String classeId;

}
